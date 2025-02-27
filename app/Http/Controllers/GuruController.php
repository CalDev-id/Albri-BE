<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Guru;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\LapPemasukanCabang;
use App\Models\LapPengeluaranCabang;
use Inertia\Response;





class GuruController extends Controller
{
    public function index(Request $request): Response
    {
        // $laporanCabangFull = LapPemasukanCabang::with('cabang')->get(); // Mengambil semua data laporan pemasukan cabang
        // $laporanCabang = LapPemasukanCabang::with('cabang')
        // ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        // ->paginate(2, ['*'], 'laporanCabangPage');  // Menggunakan paginasi

        // $laporanPengeluaranCabang = LapPengeluaranCabang::with('cabang', 'user')
        // ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        // ->paginate(2, ['*'], 'laporanCabangPagePengeluaran');  // Menggunakan paginasi
        // $laporanPengeluaranCabangFull = LapPengeluaranCabang::with('cabang', 'user')->get(); // Mengambil semua data laporan pengeluaran cabang

        $weekOffset = (int) $request->input('weekOffset', 0);

        // Hitung tanggal awal dan akhir dari minggu yang diinginkan
        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);

        // Filter data berdasarkan tanggal dalam minggu yang diinginkan
        $laporanCabang = LapPemasukanCabang::with('cabang', 'user')
        ->where('created_by', auth()->id()) // Pastikan menggunakan field user_id atau yang sesuai
        ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
        ->orderBy('tanggal', 'desc')
        ->paginate(50, ['*'], 'laporanCabangPage');
    

        $laporanPengeluaranCabang = LapPengeluaranCabang::with('user')
        ->where('created_by', auth()->id()) // Pastikan menggunakan field user_id atau yang sesuai

            ->with('cabang')
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranCabangPage');



        return Inertia::render('Guru/Index', [

            // 'laporanCabang' => $laporanCabang,
            // 'laporanCabangFull' => $laporanCabangFull,
            // 'laporanPengeluaranCabang' => $laporanPengeluaranCabang,
            // 'laporanPengeluaranCabangFull' => $laporanPengeluaranCabangFull,

            'laporanCabang' => $laporanCabang,
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'endOfWeek' => $endOfWeek->format('Y-m-d'),
            'nextWeekOffset' => $weekOffset + 1,
            'prevWeekOffset' => $weekOffset - 1,
            'laporanPengeluaranCabang' => $laporanPengeluaranCabang,

        ]);
    }
}
