<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\LapPemasukanPrivate;
use App\Models\LapPengeluaranPrivate;
use App\Models\PaketPrivate;
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
            ->with('user')
             ->where('created_by', Auth::id()) // 🔒 hanya data user login
            ->orderBy('tanggal', 'desc')
            ->paginate(500, ['*'], 'laporanPrivatePage');

        $laporanPengeluaranPrivate = LapPengeluaranPrivate::with('user')
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->where('created_by', Auth::id()) // 🔒 hanya data user login
            ->orderBy('tanggal', 'desc')
            ->paginate(500, ['*'], 'laporanPengeluaranPrivatePage');

        $laporanPrivateFull = LapPemasukanPrivate::all();
        $laporanPengeluaranPrivateFull = LapPengeluaranPrivate::with('user')->get();

        // Ambil data paket private untuk header tabel
        $paketPrivate = PaketPrivate::orderBy('nama_paket')->get();

        return Inertia::render(
            'Private/Index',
            [
                'laporanPrivate' => $laporanPrivate,
                'startOfWeek' => $startOfWeek->format('Y-m-d'),
                'endOfWeek' => $endOfWeek->format('Y-m-d'),
                'nextWeekOffset' => $weekOffset + 1,
                'prevWeekOffset' => $weekOffset - 1,
                'laporanPengeluaranPrivate' => $laporanPengeluaranPrivate,
                'paketPrivate' => $paketPrivate,
            ]
        );
    }

}
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
