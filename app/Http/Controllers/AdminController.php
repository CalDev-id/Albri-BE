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

    // public function cabanglaporan(): Response
    // {
    //     // $laporanCabang = LapPemasukanCabang::with('cabang')->get(); // Mengambil semua data laporan pemasukan cabang
    //     $laporanCabang = LapPemasukanCabang::with('cabang')
    //     ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
    //     ->paginate(5, ['*'], 'laporanCabangPage');  // Menggunakan paginasi

    //     $laporanPengeluaranCabang = LapPengeluaranCabang::with('cabang', 'user')
    //     ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
    //     ->paginate(5, ['*'], 'laporanCabangPagePengeluaran');  // Menggunakan paginasi
    //     // $laporanPengeluaranCabang = LapPengeluaranCabang::with('cabang', 'user')->get(); // Mengambil semua data laporan pengeluaran cabang

    //     return Inertia::render('Admin/Laporan/Cabang/Index', [

    //         'laporanCabang' => $laporanCabang,
    //         'laporanPengeluaranCabang' => $laporanPengeluaranCabang,

    //     ]);
    // }
    public function cabanglaporan(): Response
{
    // Mengambil data laporan cabang dengan paginasi dan pengurutan berdasarkan tanggal terbaru
    $laporanCabang = LapPemasukanCabang::with('cabang')
        ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        ->paginate(5, ['*'], 'laporanCabangPage');  // Menggunakan paginasi

    // Mengambil data laporan pengeluaran cabang dengan paginasi dan pengurutan berdasarkan tanggal terbaru
    $laporanPengeluaranCabang = LapPengeluaranCabang::with('cabang', 'user')
        ->orderBy('tanggal', 'desc')  // Urutkan berdasarkan kolom 'tanggal' (dari terbaru)
        ->paginate(5, ['*'], 'laporanCabangPagePengeluaran');  // Menggunakan paginasi

    // Mengirimkan data ke view Inertia
    return Inertia::render('Admin/Laporan/Cabang/Index', [
        'laporanCabang' => $laporanCabang,
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
        return Inertia::render('Admin/Laporan/Mitra/Index');
    }

    public function createmitralaporan(): Response
    {
        return Inertia::render('Admin/Laporan/Mitra/Create');
    }

    // Laporan Controller Private

    public function privatelaporan(): Response
    {
        return Inertia::render('Admin/Laporan/Private/Index');
    }
    public function createprivate(): Response
    {
        return Inertia::render('Admin/Laporan/Private/Create');
    }
}
