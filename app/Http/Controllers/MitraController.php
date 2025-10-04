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
        
        // Get authenticated user
        $userId = Auth::id();
        
        // Filter data berdasarkan tanggal dalam minggu yang diinginkan DAN user yang login
        $laporanMitra = LapPemasukanMitra::whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->where('user_id', $userId) // Filter berdasarkan user yang login
            ->with('user')
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanMitraPage');
            
        $laporanPengeluaranMitra = LapPengeluaranMitra::with('user')
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->where('user_id', $userId) // Filter berdasarkan user yang login
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranMitraPage');
            
        // Full data juga harus difilter berdasarkan user
        $laporanMitraFull = LapPemasukanMitra::where('user_id', $userId)->get();
        $laporanPengeluaranMitraFull = LapPengeluaranMitra::with('user')
            ->where('user_id', $userId)
            ->get();
            
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
