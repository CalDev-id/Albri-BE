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


        return Inertia::render('Admin/Dashboard', [
            'mitraData' => $mitraData,
            'userData' => $userData,
            'guruData' => $guruData,
            'cabangs' => $cabangs,
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

        return Redirect::route('admin.settings');
    }



 

    // Laporan Controller Cabang
    
        public function cabanglaporan(): Response
    {
        $laporanCabangFull = LapPemasukanCabang::with('cabang')->get(); // Mengambil semua data laporan pemasukan cabang
        $laporanCabang = LapPemasukanCabang::with('cabang')
        ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        ->paginate(2, ['*'], 'laporanCabangPage');  // Menggunakan paginasi

        $laporanPengeluaranCabang = LapPengeluaranCabang::with('cabang', 'user')
        ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        ->paginate(2, ['*'], 'laporanCabangPagePengeluaran');  // Menggunakan paginasi
        $laporanPengeluaranCabangFull = LapPengeluaranCabang::with('cabang', 'user')->get(); // Mengambil semua data laporan pengeluaran cabang

        return Inertia::render('Admin/Laporan/Cabang/Index', [

            'laporanCabang' => $laporanCabang,
            'laporanCabangFull' => $laporanCabangFull,
            'laporanPengeluaranCabang' => $laporanPengeluaranCabang,
            'laporanPengeluaranCabangFull' => $laporanPengeluaranCabangFull,

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

        // Redirect kembali ke halaman laporan cabang dengan pesan sukses
        return Redirect::route('admin.laporan.cabang')->with('success', 'Laporan pemasukan cabang berhasil ditambahkan.');
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


    // Laporan Pengeluaran Cabang Admin
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

    public function editpengeluarancabang($id): Response{

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





    // Laporan Controller Mitra
    public function mitralaporan(): Response
    {

        $laporanMitraFull = LapPemasukanMitra::all(); // Mengambil semua data laporan pemasukan mitra
        $laporanMitra = LapPemasukanMitra::orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        ->paginate(2, ['*'], 'laporanMitraPage');  // Menggunakan paginasi

        $laporanPengeluaranMitra = LapPengeluaranMitra::with('user')
        ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        ->paginate(2, ['*'], 'laporanMitraPagePengeluaran');  // Menggunakan paginasi
        $laporanPengeluaranMitraFull = LapPengeluaranMitra::with('user')->get(); // Mengambil semua data laporan pengeluaran mitra


        return Inertia::render('Admin/Laporan/Mitra/Index',
            [
                'laporanMitra' => $laporanMitra,
                'laporanMitraFull' => $laporanMitraFull,
                'laporanPengeluaranMitra' => $laporanPengeluaranMitra,
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

        return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil ditambahkan.');
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

        return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil diupdate.');
    }

    public function destroylaporanmitra($id)
    {
        LapPemasukanMitra::find($id)->delete();
        return redirect()->route('admin.laporan.mitra');
    }

    // Laporan Pengeluaran Mitra Admin
    public function createpengeluaranmitralaporan(): Response
    {
        $users =  User::role('Guru')->get(); // Mengambil semua data user dengan role Admin

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

        return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil ditambahkan.');
    }

    public function editpengeluaranmitra($id): Response
    {
        $laporanMitra = LapPengeluaranMitra::with('user')->findOrFail($id);  // Mengambil semua data laporan pengeluaran mitra
        $users =  User::role('Guru')->get(); // Mengambil semua data user dengan role Admin

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
        return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil diupdate.');
    }

    public function destroypengeluaranmitra($id)
    {
        LapPengeluaranMitra::find($id)->delete();
        return redirect()->route('admin.laporan.mitra');
    }

    // Laporan Controller Private

    public function privatelaporan(): Response
    {

        $laporanPrivateFull = LapPemasukanPrivate::all(); // Mengambil semua data laporan pemasukan private
        $laporanPrivate = LapPemasukanPrivate::orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        ->paginate(2, ['*'], 'laporanPrivatePage');  // Menggunakan paginasi

        $laporanPengeluaranPrivate = LapPengeluaranPrivate::with('user')
        ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        ->paginate(2, ['*'], 'laporanPrivatePagePengeluaran');  // Menggunakan paginasi
        $laporanPengeluaranPrivateFull = LapPengeluaranPrivate::with('user')->get(); // Mengambil semua data laporan pengeluaran private




        return Inertia::render('Admin/Laporan/Private/Index',
            [
                'laporanPrivate' => $laporanPrivate,
                'laporanPrivateFull' => $laporanPrivateFull,
                'laporanPengeluaranPrivate' => $laporanPengeluaranPrivate,
                'laporanPengeluaranPrivateFull' => $laporanPengeluaranPrivateFull,
            ]);
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

        return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil ditambahkan.');

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

        return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil diupdate.');
    }

    public function destroylaporanprivate($id)
    {
        LapPemasukanPrivate::find($id)->delete();
        return redirect()->route('admin.laporan.private');
    }


    // Laporan Pengeluaran Private Admin
    public function createpengeluaranprivatelaporan(): Response
    {
        $users =  User::role('Guru')->get(); // Mengambil semua data user dengan role Admin

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
        return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil ditambahkan.');
    }

    public function editpengeluaranprivate($id): Response
    {
        $pengeluaranprivate=LapPengeluaranPrivate::findOrFail($id);
        $users =  User::role('Guru')->get(); // Mengambil semua data user dengan role Admin


        
        return Inertia::render('Admin/Laporan/Private/Pengeluaran/EditPengeluaran', ['pengeluaranprivate' => $pengeluaranprivate, 'users'=> $users]);
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
        return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil diupdate.');
    }

    public function destroypengeluaranprivate($id)
    {
        LapPengeluaranPrivate::find($id)->delete();
        return redirect()->route('admin.laporan.private');
    }

    

}