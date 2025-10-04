<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Mitra;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\LapPemasukanMitra;
use App\Models\LapPengeluaranMitra;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MitraController extends Controller
{
    public function index(Request $request): Response
    {
        // Ambil parameter `weekOffset` dari request, default ke 0 (minggu ini), dan pastikan tipe datanya integer
        $weekOffset = (int) $request->input('weekOffset', 0);
        // Hitung tanggal awal dan akhir dari minggu yang diinginkan
        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);
        // Filter data berdasarkan tanggal dalam minggu yang diinginkan
        $laporanMitra = LapPemasukanMitra::whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->with('user')
             ->where('created_by', Auth::id()) // 🔒 hanya data user login
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanMitraPage');
        $laporanPengeluaranMitra = LapPengeluaranMitra::with('user')
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->where('created_by', Auth::id()) // 🔒 hanya data user login
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranMitraPage');
        $laporanMitraFull = LapPemasukanMitra::all();
        $laporanPengeluaranMitraFull = LapPengeluaranMitra::with('user')->get();
        return Inertia::render('Mitra/Index', [
            'laporanMitra' => $laporanMitra,
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'endOfWeek' => $endOfWeek->format('Y-m-d'),
            'nextWeekOffset' => $weekOffset + 1,
            'prevWeekOffset' => $weekOffset - 1,
            'laporanPengeluaranMitra' => $laporanPengeluaranMitra,
            'laporanMitraFull' => $laporanMitraFull,
            'laporanPengeluaranMitraFull' => $laporanPengeluaranMitraFull,
        ]);
    }


}
