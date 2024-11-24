<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Contracts\View\View;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use App\Models\Cabangalbri;
use App\Models\LapPemasukanCabang;
use App\Models\LapPengeluaranCabang;
use App\Models\LapPemasukanMitra;
use App\Models\LapPengeluaranMitra;
use App\Models\LapPemasukanPrivate;
use App\Models\LapPengeluaranPrivate;






class AdminController extends Controller
{
    public function index(Request $request)
    {
        $mitraData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Mitra');
        })
            ->latest()
            ->paginate(5, ['*'], 'mitraPage'); // pagination untuk mitra

        $userData = User::with('roles') // Mengambil data roles juga
            ->latest()
            ->paginate(5, ['*'], 'userPage');

        $guruData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Guru');
        })
            ->with(['roles' => function ($query) {
                $query->where('name', 'Guru');
            }])
            ->latest()
            ->paginate(5, ['*'], 'guruPage');

        $cabangs = Cabangalbri::all();



        $bulan = $request->input('bulan', date('m'));
        $tahun = $request->input('tahun', date('Y'));

        // Filter data berdasarkan bulan dan tahun
        $laporanCabang = LapPemasukanCabang::with('cabang')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanCabangPage'); // Sesuaikan jumlah per halaman

            $laporanPengeluaranCabang = LapPengeluaranCabang::with('cabang', 'user')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanCabangPage');

            $laporanMitra = LapPemasukanMitra::whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanMitraPage'); // Sesuaikan jumlah per halaman
        $laporanPengeluaranMitra = LapPengeluaranMitra::with('user')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanMitraPage');
            $laporanPrivate = LapPemasukanPrivate::whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanPrivatePage'); // Sesuaikan jumlah per halaman
            $laporanPengeluaranPrivate = LapPengeluaranPrivate::with('user')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanPrivatePage');

        return Inertia::render('Admin/Dashboard', [
            'mitraData' => $mitraData,
            'userData' => $userData,
            'guruData' => $guruData,
            'cabangs' => $cabangs,

            'laporanCabang' => $laporanCabang,
            'laporanPengeluaranCabang' => $laporanPengeluaranCabang,
            'laporanMitra' => $laporanMitra,
            'laporanPengeluaranMitra' => $laporanPengeluaranMitra,

            'laporanPrivate' => $laporanPrivate,
            'laporanPengeluaranPrivate' => $laporanPengeluaranPrivate,


        ]);
    }

    public function mitra()
    {
        $mitraData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Mitra');
        })->with(['roles' => function ($query) {
            $query->where('name', 'Mitra');
        }])
            ->latest()
            ->paginate(5, ['*'], 'mitraPage'); // pagination untuk mitra

        return Inertia::render('Admin/Mitra', [
            'mitraData' => $mitraData,
        ]);
    }

    public function private()
    {
        $privateData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Private');
        })->with(['roles' => function ($query) {
            $query->where('name', 'Private');
        }])
            ->latest()
            ->paginate(5, ['*'], 'privatePage'); // pagination untuk private
        return Inertia::render('Admin/Privat', [
            'privateData' => $privateData,
        ]);
    }

    public function guru()
    {
        $privateData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Guru');
        })->with(['roles' => function ($query) {
            $query->where('name', 'Guru');
        }])
            ->latest()
            ->paginate(5, ['*'], 'privatePage'); // pagination untuk private
        return Inertia::render('Admin/Guru', [
            'privateData' => $privateData,
        ]);
    }


    public function settings(Request $request): Response
    {
        return Inertia::render('Admin/settings', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        if ($request->user()->hasRole('Private')) {
            return Redirect::route('private.settings')->with('success', 'Profil berhasil diperbarui.');
        } else if ($request->user()->hasRole('Admin')) {
            return Redirect::route('admin.settings')->with('success', 'Profil berhasil diperbarui.');
        } else if ($request->user()->hasRole('Guru')) {
            return Redirect::route('guru.settings')->with('success', 'Profil berhasil diperbarui.');
        } else if ($request->user()->hasRole('Mitra')) {
            return Redirect::route('mitra.settings')->with('success', 'Profil berhasil diperbarui.');
        }

        return Redirect::route('admin.settings');
    }




    /* -----------------------------------------
            Laporan Controller Cabang
    -------------------------------------------- */

    public function cabanglaporan(Request $request): Response
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
        $laporanCabang = LapPemasukanCabang::with('cabang')
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanCabangPage');

        $laporanPengeluaranCabang = LapPengeluaranCabang::with('user')
            ->with('cabang')
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranCabangPage');



        return Inertia::render('Admin/Laporan/Cabang/Index', [

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

    public function createcabanglaporan(): Response
    {
        $cabangs = CabangAlbri::all(); // Mengambil semua data cabang

        return Inertia::render('Admin/Laporan/Cabang/create', ['cabangs' => $cabangs]);
    }

    public function storelaporancabang(Request $request)
    {


        // Validasi data input
        $validatedData = $request->validate([
            'cabang_id' => 'required|exists:cabangalbris,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'biaya_5000' => 'required|integer',
            'biaya_10000' => 'required|integer',
            'biaya_12000' => 'required|integer',
            'daftar' => 'required|integer',
            'modul' => 'required|integer',
            'kaos' => 'required|integer',
            'kas' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);
        // Hitung total biaya berdasarkan input biaya
        $totalbiaya = ($validatedData['biaya_5000'] * 5000) +
            ($validatedData['biaya_10000'] * 10000) +
            ($validatedData['biaya_12000'] * 12000);
        // Hitung total pemasukan berdasarkan total biaya dan input lainnya
        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];

        // Buat laporan pemasukan cabang baru
        LapPemasukanCabang::create([
            'cabang_id' => $validatedData['cabang_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'biaya_5000' => $validatedData['biaya_5000'],
            'biaya_10000' => $validatedData['biaya_10000'],
            'biaya_12000' => $validatedData['biaya_12000'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'created_by' => Auth::user()->id, // Assuming you are using Laravel's Auth

        ]);



        if (User::where('id', Auth::user()->id)->first()->hasRole('Guru')) {
            return Redirect::route('guru.dashboard')->with('success', 'Laporan pemasukan mitra berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.cabang')->with('success', 'Laporan pemasukan cabang berhasil ditambahkan.');
        }
    }




    public function editlaporancabang($id): Response
    {
        $laporanCabang = LapPemasukanCabang::with('cabang')->findOrFail($id); // Mengambil data laporan pemasukan cabang berdasarkan id
        $cabangs = CabangAlbri::all(); // Mengambil semua data cabang

        return Inertia::render('Admin/Laporan/Cabang/edit', [
            'laporanCabang' => $laporanCabang,
            'cabangs' => $cabangs,
        ]);
    }

    public function updatelaporancabang(Request $request, $id): RedirectResponse
    {
        // Validasi data input
        $validatedData = $request->validate([
            'cabang_id' => 'required|exists:cabangalbris,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'biaya_5000' => 'required|integer',
            'biaya_10000' => 'required|integer',
            'biaya_12000' => 'required|integer',
            'daftar' => 'required|integer',
            'modul' => 'required|integer',
            'kaos' => 'required|integer',
            'kas' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        // Hitung total biaya berdasarkan input biaya
        $totalbiaya = ($validatedData['biaya_5000'] * 5000) +
            ($validatedData['biaya_10000'] * 10000) +
            ($validatedData['biaya_12000'] * 12000);

        // Hitung total pemasukan berdasarkan total biaya dan input lainnya
        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];
        // Update laporan pemasukan cabang
        $laporanCabang = LapPemasukanCabang::findOrFail($id);
        $laporanCabang->update([
            'cabang_id' => $validatedData['cabang_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'biaya_5000' => $validatedData['biaya_5000'],
            'biaya_10000' => $validatedData['biaya_10000'],
            'biaya_12000' => $validatedData['biaya_12000'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'updated_by' => Auth::user()->id, // Assuming you are using Laravel's Auth
        ]);
        return Redirect::route('admin.laporan.cabang')->with('success', 'Laporan pemasukan cabang berhasil ditambahkan.');
    }

    public function destroylaporancabang($id)
    {
        LapPemasukanCabang::find($id)->delete();
        return redirect()->route('admin.laporan.cabang');
    }



    /* -----------------------------------------
            Laporan Pengeluaran Cabang Admin
    -------------------------------------------- */

    public function createcabanpengeluaranlaporan(): Response
    {
        $cabangs = CabangAlbri::all(); // Mengambil semua data cabang
        $users =  User::role('Guru')->get(); // Mengambil semua data user dengan role Admin

        return Inertia::render('Admin/Laporan/Cabang/Pengeluaran/CreatePengeluaran', [
            'cabangs' => $cabangs,
            'users' => $users,

        ]);
    }

    public function storelaporanpengeluaran(Request $request)
    {



        $validatedData = $request->validate([
            'cabang_id' => 'required|exists:cabangalbris,id',
            'guru_id' => 'required|exists:users,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gaji' => 'required|integer',
            'atk' => 'required|integer',
            'sewa' => 'required|integer',
            'intensif' => 'required|integer',
            'lisensi' => 'required|integer',
            'thr' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        $totalpengeluaran = $validatedData['gaji'] +
            $validatedData['atk'] +
            $validatedData['sewa'] +
            $validatedData['intensif'] +
            $validatedData['lisensi'] +
            $validatedData['thr'] +
            $validatedData['lainlain'];

        LapPengeluaranCabang::create([
            'cabang_id' => $validatedData['cabang_id'],
            'guru_id' => $validatedData['guru_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'gaji' => $validatedData['gaji'],
            'atk' => $validatedData['atk'],
            'sewa' => $validatedData['sewa'],
            'intensif' => $validatedData['intensif'],
            'lisensi' => $validatedData['lisensi'],
            'thr' => $validatedData['thr'],
            'lainlain' => $validatedData['lainlain'],
            'totalpengeluaran' => $totalpengeluaran,
            'created_by' => Auth::user()->id, // Assuming you are using Laravel's Auth

        ]);

        return Redirect::route('admin.laporan.cabang')->with('success', 'Laporan pemasukan cabang berhasil ditambahkan.');
    }

    public function editpengeluarancabang($id): Response
    {

        $laporanCabang = LapPengeluaranCabang::with('cabang', 'user')->findOrFail($id);  // Mengambil semua data laporan pengeluaran cabang
        $cabangs = CabangAlbri::all(); // Mengambil semua data cabang
        $users =  User::role('Guru')->get(); // Mengambil semua data user dengan role Admin

        return Inertia::render('Admin/Laporan/Cabang/Pengeluaran/EditPengeluaran', [
            'laporanCabang' => $laporanCabang,
            'cabangs' => $cabangs,
            'users' => $users,
        ]);
    }

    public function updatepengeluarancabang(Request $request, $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'cabang_id' => 'required|exists:cabangalbris,id',
            'guru_id' => 'required|exists:users,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gaji' => 'required|integer',
            'atk' => 'required|integer',
            'sewa' => 'required|integer',
            'intensif' => 'required|integer',
            'lisensi' => 'required|integer',
            'thr' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        $totalpengeluaran = $validatedData['gaji'] +
            $validatedData['atk'] +
            $validatedData['sewa'] +
            $validatedData['intensif'] +
            $validatedData['lisensi'] +
            $validatedData['thr'] +
            $validatedData['lainlain'];

        $laporanCabang = LapPengeluaranCabang::findOrFail($id);
        $laporanCabang->update([
            'cabang_id' => $validatedData['cabang_id'],
            'guru_id' => $validatedData['guru_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'gaji' => $validatedData['gaji'],
            'atk' => $validatedData['atk'],
            'sewa' => $validatedData['sewa'],
            'intensif' => $validatedData['intensif'],
            'lisensi' => $validatedData['lisensi'],
            'thr' => $validatedData['thr'],
            'lainlain' => $validatedData['lainlain'],
            'totalpengeluaran' => $totalpengeluaran,
            'updated_by' => Auth::user()->id, // Assuming you are using Laravel's Auth
        ]);
        return Redirect::route('admin.laporan.cabang')->with('success', 'Laporan pengeluaran cabang berhasil diupdate.');
    }

    public function destroypengeluarancabang($id)
    {
        LapPengeluaranCabang::find($id)->delete();
        return redirect()->route('admin.laporan.cabang');
    }



    /* -----------------------------------------
            Laporan Mitra
        -------------------------------------------- */

    public function mitralaporan(Request $request): Response
    {
        // Ambil parameter `weekOffset` dari request, default ke 0 (minggu ini), dan pastikan tipe datanya integer
        $weekOffset = (int) $request->input('weekOffset', 0);
        // Hitung tanggal awal dan akhir dari minggu yang diinginkan
        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);
        // Filter data berdasarkan tanggal dalam minggu yang diinginkan
        $laporanMitra = LapPemasukanMitra::whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanMitraPage');
        $laporanPengeluaranMitra = LapPengeluaranMitra::with('user')
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranMitraPage');
        $laporanMitraFull = LapPemasukanMitra::all();
        $laporanPengeluaranMitraFull = LapPengeluaranMitra::with('user')->get();
        return Inertia::render('Admin/Laporan/Mitra/Index', [
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
    public function createmitralaporan(): Response
    {
        return Inertia::render('Admin/Laporan/Mitra/Create');
    }

    public function storelaporanmitra(Request $request)
    {
        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'biaya_5000' => 'required|integer',
            'biaya_8000' => 'required|integer',
            'biaya_10000' => 'required|integer',
            'biaya_15000' => 'required|integer',
            'daftar' => 'required|integer',
            'modul' => 'required|integer',
            'kaos' => 'required|integer',
            'kas' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);
        $totalbiaya = ($validatedData['biaya_5000'] * 7000) +
            ($validatedData['biaya_8000'] * 8000) +
            ($validatedData['biaya_10000'] * 10000) +
            ($validatedData['biaya_15000'] * 15000);
        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];
        LapPemasukanMitra::create([
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'biaya_5000' => $validatedData['biaya_5000'],
            'biaya_8000' => $validatedData['biaya_8000'],
            'biaya_10000' => $validatedData['biaya_10000'],
            'biaya_15000' => $validatedData['biaya_15000'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'created_by' => Auth::user()->id, // Assuming you are using Laravel's Auth
        ]);

        if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan mitra berhasil ditambahkan.');
        } else {
            return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil ditambahkan.');
        }
    }

    public function editlaporanmitra($id): Response
    {
        $laporanMitra = LapPemasukanMitra::findOrFail($id); // Mengambil data laporan pemasukan mitra berdasarkan id
        return Inertia::render('Admin/Laporan/Mitra/edit', ['laporanMitra' => $laporanMitra]);
    }

    public function updatelaporanmitra(Request $request, $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'biaya_5000' => 'required|integer',
            'biaya_8000' => 'required|integer',
            'biaya_10000' => 'required|integer',
            'biaya_15000' => 'required|integer',
            'daftar' => 'required|integer',
            'modul' => 'required|integer',
            'kaos' => 'required|integer',
            'kas' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);
        $totalbiaya = ($validatedData['biaya_5000'] * 7000) +
            ($validatedData['biaya_8000'] * 8000) +
            ($validatedData['biaya_10000'] * 10000) +
            ($validatedData['biaya_15000'] * 15000);
        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];
        $laporanMitra = LapPemasukanMitra::findOrFail($id);
        $laporanMitra->update([
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'biaya_5000' => $validatedData['biaya_5000'],
            'biaya_8000' => $validatedData['biaya_8000'],
            'biaya_10000' => $validatedData['biaya_10000'],
            'biaya_15000' => $validatedData['biaya_15000'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'updated_by' => Auth::user()->id, // Assuming you are using
        ]);
        if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan mitra berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil diupdate.');
        }
    }

    public function destroylaporanmitra($id)
    {
        LapPemasukanMitra::find($id)->delete();
        return redirect()->route('admin.laporan.mitra');
    }

    // Laporan Pengeluaran Mitra Admin
    public function createpengeluaranmitralaporan(): Response
    {
        $users =  User::role('Mitra')->get(); // Mengambil semua data user dengan role Admin

        return Inertia::render('Admin/Laporan/Mitra/Pengeluaran/CreatePengeluaran', [
            'users' => $users,

        ]);
    }

    public function storelaporanpengeluaranmitra(Request $request)
    {


        $validatedData = $request->validate([
            'guru_id' => 'required|exists:users,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gaji' => 'required|integer',
            'atk' => 'required|integer',
            'intensif' => 'required|integer',
            'lisensi' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        $totalpengeluaran = $validatedData['gaji'] +
            $validatedData['atk'] +
            $validatedData['intensif'] +
            $validatedData['lisensi'] +
            $validatedData['lainlain'];

        LapPengeluaranMitra::create([
            'guru_id' => $validatedData['guru_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'gaji' => $validatedData['gaji'],
            'atk' => $validatedData['atk'],
            'intensif' => $validatedData['intensif'],
            'lisensi' => $validatedData['lisensi'],
            'lainlain' => $validatedData['lainlain'],
            'totalpengeluaran' => $totalpengeluaran,
            'created_by' => Auth::user()->id, // Assuming you are using Laravel's Auth

        ]);
        if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan mitra berhasil ditambahkan.');
        } else {


        return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil ditambahkan.');
        }
    }

    public function editpengeluaranmitra($id): Response
    {
        $laporanMitra = LapPengeluaranMitra::with('user')->findOrFail($id);  // Mengambil semua data laporan pengeluaran mitra
        $users =  User::role('Mitra')->get(); // Mengambil semua data user dengan role Admin

        return Inertia::render('Admin/Laporan/Mitra/Pengeluaran/EditPengeluaran', [
            'laporanMitra' => $laporanMitra,
            'users' => $users,
        ]);
    }

    public function updatepengeluaranmitra(Request $request, $id): RedirectResponse
    {

        $validatedData = $request->validate([
            'guru_id' => 'required|exists:users,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gaji' => 'required|integer',
            'atk' => 'required|integer',
            'intensif' => 'required|integer',
            'lisensi' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        $totalpengeluaran = $validatedData['gaji'] +
            $validatedData['atk'] +
            $validatedData['intensif'] +
            $validatedData['lisensi'] +
            $validatedData['lainlain'];

        $laporanMitra = LapPengeluaranMitra::findOrFail($id);
        $laporanMitra->update([
            'guru_id' => $validatedData['guru_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'gaji' => $validatedData['gaji'],
            'atk' => $validatedData['atk'],
            'intensif' => $validatedData['intensif'],
            'lisensi' => $validatedData['lisensi'],
            'lainlain' => $validatedData['lainlain'],
            'totalpengeluaran' => $totalpengeluaran,
            'updated_by' => Auth::user()->id, // Assuming you are using Laravel's Auth
        ]);
        if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan mitra berhasil ditambahkan.');
        } else {

        return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil diupdate.');
        }
    }

    public function destroypengeluaranmitra($id)
    {
        LapPengeluaranMitra::find($id)->delete();
        return redirect()->route('admin.laporan.mitra');
    }

    // Laporan Controller Private

    public function privatelaporan(Request $request): Response
    {
        $weekOffset = (int) $request->input('weekOffset', 0);

        // Hitung tanggal awal dan akhir dari minggu yang diinginkan
        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);

        // Filter data berdasarkan tanggal dalam minggu yang diinginkan
        $laporanPrivate = LapPemasukanPrivate::whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPrivatePage');

        $laporanPengeluaranPrivate = LapPengeluaranPrivate::with('user')
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
            'Admin/Laporan/Private/Index',
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


    public function createprivate(): Response
    {
        return Inertia::render('Admin/Laporan/Private/Create');
    }

    public function storelaporanprivate(Request $request)
    {

        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'biaya_30' => 'required|integer',
            'biaya_35' => 'required|integer',
            'biaya_40' => 'required|integer',
            'biaya_45' => 'required|integer',
            'daftar' => 'required|integer',
            'modul' => 'required|integer',
            'kaos' => 'required|integer',
            'kas' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);
        $totalbiaya = ($validatedData['biaya_30'] * 30000) +
            ($validatedData['biaya_35'] * 35000) +
            ($validatedData['biaya_40'] * 40000) +
            ($validatedData['biaya_45'] * 45000);
        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];
        LapPemasukanPrivate::create([
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'biaya_30' => $validatedData['biaya_30'],
            'biaya_35' => $validatedData['biaya_35'],
            'biaya_40' => $validatedData['biaya_40'],
            'biaya_45' => $validatedData['biaya_45'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'created_by' => Auth::user()->id, // Assuming you are using Laravel's Auth

        ]);

        if (User::where('id', Auth::user()->id)->first()->hasRole('Private')) {
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan private berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil ditambahkan.');
        }
    }


    public function editlaporanprivate($id): Response
    {
        $laporanprivate = LapPemasukanPrivate::findOrFail($id); // Mengambil data laporan pemasukan private berdasarkan id

        return Inertia::render('Admin/Laporan/Private/edit', ['laporanprivate' => $laporanprivate]);
    }

    public function updatelaporanprivate(Request $request, $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'biaya_30' => 'required|integer',
            'biaya_35' => 'required|integer',
            'biaya_40' => 'required|integer',
            'biaya_45' => 'required|integer',
            'daftar' => 'required|integer',
            'modul' => 'required|integer',
            'kaos' => 'required|integer',
            'kas' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);
        $totalbiaya = ($validatedData['biaya_30'] * 30000) +
            ($validatedData['biaya_35'] * 35000) +
            ($validatedData['biaya_40'] * 40000) +
            ($validatedData['biaya_45'] * 45000);
        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];
        $laporanPrivate = LapPemasukanPrivate::findOrFail($id);
        $laporanPrivate->update([
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'biaya_30' => $validatedData['biaya_30'],
            'biaya_35' => $validatedData['biaya_35'],
            'biaya_40' => $validatedData['biaya_40'],
            'biaya_45' => $validatedData['biaya_45'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'updated_by' => Auth::user()->id, // Assuming you are using Laravel's Auth
        ]);

        if (User::where('id', Auth::user()->id)->first()->hasRole('Private')) {
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan private berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil diupdate.');
        }
    }

    public function destroylaporanprivate($id)
    {
        LapPemasukanPrivate::find($id)->delete();
        return redirect()->route('admin.laporan.private');
    }


    // Laporan Pengeluaran Private Admin
    public function createpengeluaranprivatelaporan(): Response
    {
        $users =  User::role('Private')->get(); // Mengambil semua data user dengan role Admin

        return Inertia::render('Admin/Laporan/Private/Pengeluaran/CreatePengeluaran', [
            'users' => $users,

        ]);
    }

    public function storelaporanpengeluaranprivate(Request $request)
    {

        $validatedData = $request->validate([
            'guru_id' => 'required|exists:users,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gaji' => 'required|integer',
            'atk' => 'required|integer',
            'sewa' => 'required|integer',
            'intensif' => 'required|integer',
            'lisensi' => 'required|integer',
            'thr' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        $totalpengeluaran = $validatedData['gaji'] +
            $validatedData['atk'] +
            $validatedData['sewa'] +
            $validatedData['intensif'] +
            $validatedData['lisensi'] +
            $validatedData['thr'] +
            $validatedData['lainlain'];

        LapPengeluaranPrivate::create([
            'guru_id' => $validatedData['guru_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'gaji' => $validatedData['gaji'],
            'atk' => $validatedData['atk'],
            'sewa' => $validatedData['sewa'],
            'intensif' => $validatedData['intensif'],
            'lisensi' => $validatedData['lisensi'],
            'thr' => $validatedData['thr'],
            'lainlain' => $validatedData['lainlain'],
            'totalpengeluaran' => $totalpengeluaran,
            'created_by' => Auth::user()->id, // Assuming you are using Laravel's Auth

        ]);

        if (User::where('id', Auth::user()->id)->first()->hasRole('Private')) {
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan private berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil ditambahkan.');
        }
    }

    public function editpengeluaranprivate($id): Response
    {
        $pengeluaranprivate = LapPengeluaranPrivate::findOrFail($id);
        $users =  User::role('Private')->get(); // Mengambil semua data user dengan role Admin



        return Inertia::render('Admin/Laporan/Private/Pengeluaran/EditPengeluaran', ['pengeluaranprivate' => $pengeluaranprivate, 'users' => $users]);
    }

    public function updatepengeluaranprivate(Request $request, $id): RedirectResponse
    {

        $validatedData = $request->validate([
            'guru_id' => 'required|exists:users,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gaji' => 'required|integer',
            'atk' => 'required|integer',
            'sewa' => 'required|integer',
            'intensif' => 'required|integer',
            'lisensi' => 'required|integer',
            'thr' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        $totalpengeluaran = $validatedData['gaji'] +
            $validatedData['atk'] +
            $validatedData['sewa'] +
            $validatedData['intensif'] +
            $validatedData['lisensi'] +
            $validatedData['thr'] +
            $validatedData['lainlain'];

        $laporanPrivate = LapPengeluaranPrivate::findOrFail($id);
        $laporanPrivate->update([
            'guru_id' => $validatedData['guru_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'gaji' => $validatedData['gaji'],
            'atk' => $validatedData['atk'],
            'sewa' => $validatedData['sewa'],
            'intensif' => $validatedData['intensif'],
            'lisensi' => $validatedData['lisensi'],
            'thr' => $validatedData['thr'],
            'lainlain' => $validatedData['lainlain'],
            'totalpengeluaran' => $totalpengeluaran,
            'updated_by' => Auth::user()->id, // Assuming you are using Laravel's Auth
        ]);
        if (User::where('id', Auth::user()->id)->first()->hasRole('Private')) {
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan private berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil diupdate.');
        }
    }

    public function destroypengeluaranprivate($id)
    {
        LapPengeluaranPrivate::find($id)->delete();
        return redirect()->route('admin.laporan.private');
    }



    /* -----------------------------------------
            Rekap Bulanan Cabang
        --------------------------------------- */

    public function rekapcabang(Request $request): Response
    {
        // Ambil bulan dan tahun dari request, atau gunakan bulan dan tahun saat ini sebagai default
        $bulan = $request->input('bulan', date('m'));
        $tahun = $request->input('tahun', date('Y'));

        // Filter data berdasarkan bulan dan tahun
        $laporanCabang = LapPemasukanCabang::with('cabang')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanCabangPage'); // Sesuaikan jumlah per halaman

            $laporanPengeluaranCabang = LapPengeluaranCabang::with('cabang', 'user')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanCabangPage');
        // Kirim data dan info bulan/tahun saat ini ke frontend
        return Inertia::render('Admin/Laporan/Cabang/RekapBulanan/index', [
            'laporanCabang' => $laporanCabang,
            'laporanPengeluaranCabang' => $laporanPengeluaranCabang,
            'bulan' => $bulan,
            'tahun' => $tahun,
            'nextMonth' => $bulan < 12 ? $bulan + 1 : 1,
            'nextYear' => $bulan < 12 ? $tahun : $tahun + 1,
            'prevMonth' => $bulan > 1 ? $bulan - 1 : 12,
            'prevYear' => $bulan > 1 ? $tahun : $tahun - 1,
        ]);
    }
    /* -----------------------------------------
            Rekap Bulanan Mitra
        -------------------------------------------- */
    public function rekapmitra(Request $request): Response
    {
        // Ambil bulan dan tahun dari request, atau gunakan bulan dan tahun saat ini sebagai default
        $bulan = $request->input('bulan', date('m'));
        $tahun = $request->input('tahun', date('Y'));

        // Filter data berdasarkan bulan dan tahun
        $laporanMitra = LapPemasukanMitra::whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanMitraPage'); // Sesuaikan jumlah per halaman
        $laporanPengeluaranMitra = LapPengeluaranMitra::with('user')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanMitraPage');

        // Kirim data dan info bulan/tahun saat ini ke frontend
        return Inertia::render('Admin/Laporan/Mitra/RekapBulanan/index', [
            'laporanMitra' => $laporanMitra,
            'laporanPengeluaranMitra' => $laporanPengeluaranMitra,
            'bulan' => $bulan,
            'tahun' => $tahun,
            'nextMonth' => $bulan < 12 ? $bulan + 1 : 1,
            'nextYear' => $bulan < 12 ? $tahun : $tahun + 1,
            'prevMonth' => $bulan > 1 ? $bulan - 1 : 12,
            'prevYear' => $bulan > 1 ? $tahun : $tahun - 1,
        ]);
    }

    /* -----------------------------------------
        Rekap Bulanan Private
    -------------------------------------------- */
    public function rekapprivate(Request $request): Response
    {
        // Ambil bulan dan tahun dari request, atau gunakan bulan dan tahun saat ini sebagai default
        $bulan = $request->input('bulan', date('m'));
        $tahun = $request->input('tahun', date('Y'));

        // Filter data berdasarkan bulan dan tahun
        $laporanPrivate = LapPemasukanPrivate::whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanPrivatePage'); // Sesuaikan jumlah per halaman
            $laporanPengeluaranPrivate = LapPengeluaranPrivate::with('user')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(10, ['*'], 'laporanPrivatePage');
        // Kirim data dan info bulan/tahun saat ini ke frontend
        return Inertia::render('Admin/Laporan/Private/RekapBulanan/index', [
            'laporanPrivate' => $laporanPrivate,
            'laporanPengeluaranPrivate' => $laporanPengeluaranPrivate,
            'bulan' => $bulan,
            'tahun' => $tahun,
            'nextMonth' => $bulan < 12 ? $bulan + 1 : 1,
            'nextYear' => $bulan < 12 ? $tahun : $tahun + 1,
            'prevMonth' => $bulan > 1 ? $bulan - 1 : 12,
            'prevYear' => $bulan > 1 ? $tahun : $tahun - 1,
        ]);
    }
}
