<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Models\LapPemasukanPrivate;
use App\Models\LapPengeluaranPrivate;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;


class PrivateController extends Controller
{
    public function index(Request $request): Response
    {
        $weekOffset = (int) $request->input('weekOffset', 0);

        // Hitung tanggal awal dan akhir dari minggu yang diinginkan
        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);

        // Get authenticated user
        $userId = Auth::id();

        // Filter data berdasarkan tanggal dalam minggu yang diinginkan DAN user yang login
        $laporanPrivate = LapPemasukanPrivate::whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->where('user_id', $userId) // Filter berdasarkan user yang login
            ->with('user')
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPrivatePage');

        $laporanPengeluaranPrivate = LapPengeluaranPrivate::with('user')
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->where('user_id', $userId) // Filter berdasarkan user yang login
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranPrivatePage');

        // Full data juga harus difilter berdasarkan user
        $laporanPrivateFull = LapPemasukanPrivate::where('user_id', $userId)->get();
        $laporanPengeluaranPrivateFull = LapPengeluaranPrivate::with('user')
            ->where('user_id', $userId)
            ->get();

        return Inertia::render(
            'Private/Index',
            [
                'laporanPrivate' => $laporanPrivate,
                'startOfWeek' => $startOfWeek->format('Y-m-d'),
                'endOfWeek' => $endOfWeek->format('Y-m-d'),
                'nextWeekOffset' => $weekOffset + 1,
                'prevWeekOffset' => $weekOffset - 1,
                'laporanPengeluaranPrivate' => $laporanPengeluaranPrivate,
                'laporanPrivateFull' => $laporanPrivateFull,
                'laporanPengeluaranPrivateFull' => $laporanPengeluaranPrivateFull,
            ]
        );
    }

}