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
use App\Models\Paket;
class GuruController extends Controller
{

    public function index(Request $request): Response
    {
        $weekOffset = (int) $request->input('weekOffset', 0);

        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);

        $laporanCabang = LapPemasukanCabang::with([
            'cabang',
            'user',
            'pakets:id,nama_paket,harga',
        ])
            ->where('created_by', Auth::id()) // 🔒 hanya data user login
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanCabangPage');

        $laporanPengeluaranCabang = LapPengeluaranCabang::with('user', 'cabang', 'gurus')
            ->where('created_by', Auth::id()) // 🔒 hanya data user login
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranCabangPage');

        $pakets = Paket::select('id', 'nama_paket', 'harga')->orderBy('nama_paket')->get();

        return Inertia::render('Guru/Index', [
            'laporanCabang' => $laporanCabang,
            'laporanPengeluaranCabang' => $laporanPengeluaranCabang,
            'pakets' => $pakets,
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'endOfWeek' => $endOfWeek->format('Y-m-d'),
            'nextWeekOffset' => $weekOffset + 1,
            'prevWeekOffset' => $weekOffset - 1,
        ]);
    }
}
