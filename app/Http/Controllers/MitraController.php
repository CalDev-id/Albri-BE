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
        $user = Auth::user(); // user login

        // ambil parameter weekOffset (default 0)
        $weekOffset = (int) $request->input('weekOffset', 0);

        // hitung tanggal awal dan akhir minggu
        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);

        // 🔒 ambil data pemasukan milik user login
        $laporanMitra = LapPemasukanMitra::with('user')
            ->where('created_by', $user->id)
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanMitraPage');

        // 🔒 ambil data pengeluaran milik user login
        $laporanPengeluaranMitra = LapPengeluaranMitra::with('user')
            ->where('created_by', $user->id)
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranMitraPage');

        // 🔒 ambil data mitra milik user login (kalau ada relasi user_id)
        $mitra = Mitra::where('user_id', $user->id)->first();

        return Inertia::render('Mitra/Index', [
            'mitra' => $mitra,
            'laporanMitra' => $laporanMitra,
            'laporanPengeluaranMitra' => $laporanPengeluaranMitra,
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'endOfWeek' => $endOfWeek->format('Y-m-d'),
            'nextWeekOffset' => $weekOffset + 1,
            'prevWeekOffset' => $weekOffset - 1,
        ]);
    }
}
