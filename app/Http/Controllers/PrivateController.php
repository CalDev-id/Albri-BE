<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Models\LapPemasukanPrivate;
use App\Models\LapPengeluaranPrivate;
use Inertia\Response;


class PrivateController extends Controller
{
    public function index(Request $request): Response
    {
        $weekOffset = (int) $request->input('weekOffset', 0);

        // Hitung tanggal awal dan akhir dari minggu yang diinginkan
        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);

        // Filter data berdasarkan tanggal dalam minggu yang diinginkan
        $laporanPrivate = LapPemasukanPrivate::whereBetween('tanggal', [$startOfWeek, $endOfWeek])
        ->where('created_by', auth()->id()) // Pastikan menggunakan field user_id atau yang sesuai

            ->with('user')
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPrivatePage');

        $laporanPengeluaranPrivate = LapPengeluaranPrivate::with('user')
        ->where('created_by', auth()->id()) // Pastikan menggunakan field user_id atau yang sesuai

            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranPrivatePage');

        $laporanPrivateFull = LapPemasukanPrivate::all();
        $laporanPengeluaranPrivateFull = LapPengeluaranPrivate::with('user')->get();



        // $laporanPrivateFull = LapPemasukanPrivate::all(); // Mengambil semua data laporan pemasukan private
        // $laporanPrivate = LapPemasukanPrivate::orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        // ->paginate(2, ['*'], 'laporanPrivatePage');  // Menggunakan paginasi

        // $laporanPengeluaranPrivate = LapPengeluaranPrivate::with('user')
        // ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        // ->paginate(2, ['*'], 'laporanPrivatePagePengeluaran');  // Menggunakan paginasi
        // $laporanPengeluaranPrivateFull = LapPengeluaranPrivate::with('user')->get(); // Mengambil semua data laporan pengeluaran private




        return Inertia::render(
            'Private/Index',
            [
                // 'laporanPrivate' => $laporanPrivate,
                // 'laporanPrivateFull' => $laporanPrivateFull,
                // 'laporanPengeluaranPrivate' => $laporanPengeluaranPrivate,
                // 'laporanPengeluaranPrivateFull' => $laporanPengeluaranPrivateFull,

                'laporanPrivate' => $laporanPrivate,
                'startOfWeek' => $startOfWeek->format('Y-m-d'),
                'endOfWeek' => $endOfWeek->format('Y-m-d'),
                'nextWeekOffset' => $weekOffset + 1,
                'prevWeekOffset' => $weekOffset - 1,
                'laporanPengeluaranPrivate' => $laporanPengeluaranPrivate,
            ]
        );
    }

}
