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
use App\Models\CabangAlbri;
use App\Models\LapPemasukanCabang;
use App\Models\LapPengeluaranCabang;
use App\Models\LaporanPengeluaranGuru;
use App\Models\LapPemasukanMitra;
use App\Models\LapPengeluaranMitra;
use App\Models\LaporanPengeluaranMitraDet;
use App\Models\Mitra;
use App\Models\LapPemasukanPrivate;
use App\Models\LapPengeluaranPrivate;
use App\Models\Paket;
use App\Models\PaketMitra;
use App\Models\PaketPrivate;
use Illuminate\Support\Facades\DB;

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
            ->with([
                'roles' => function ($query) {
                    $query->where('name', 'Guru');
                }
            ])
            ->latest()
            ->paginate(5, ['*'], 'guruPage');

        $cabangs = CabangAlbri::all();



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
        })->with([
                    'roles' => function ($query) {
                        $query->where('name', 'Mitra');
                    }
                ])
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
        })->with([
                    'roles' => function ($query) {
                        $query->where('name', 'Private');
                    }
                ])
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
        })->with([
                    'roles' => function ($query) {
                        $query->where('name', 'Guru');
                    }
                ])
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
        $weekOffset = (int) $request->input('weekOffset', 0);
        $cabangId = $request->input('cabang_id'); // Get selected cabang filter

        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);

        // Get all cabang for filter dropdown
        $allCabang = CabangAlbri::select('id', 'nama')
            ->orderBy('nama')
            ->get();

        // Build query for pemasukan with optional cabang filter
        $laporanCabangQuery = LapPemasukanCabang::with([
            'cabang',
            'user',
            'pakets:id,nama_paket,harga',
        ])
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek]);
        
        // Apply cabang filter if selected
        if ($cabangId) {
            $laporanCabangQuery->where('cabang_id', $cabangId);
        }
        
        $laporanCabang = $laporanCabangQuery
            ->orderBy('tanggal', 'desc')
            ->paginate(5000, ['*'], 'laporanCabangPage');

        // Build query for pengeluaran with optional cabang filter
        $laporanPengeluaranCabangQuery = LapPengeluaranCabang::with([
            'user',
            'cabang',
            'gurus'
        ])
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek]);
        
        // Apply cabang filter if selected
        if ($cabangId) {
            $laporanPengeluaranCabangQuery->where('cabang_id', $cabangId);
        }
        
        $laporanPengeluaranCabang = $laporanPengeluaranCabangQuery
            ->orderBy('tanggal', 'desc')
            ->paginate(5000, ['*'], 'laporanPengeluaranCabangPage');

        // daftar paket untuk header kolom dinamis
        $pakets = Paket::select('id', 'nama_paket', 'harga')->orderBy('nama_paket')->get();

        return Inertia::render('Admin/Laporan/Cabang/Index', [
            'laporanCabang' => $laporanCabang,
            'laporanPengeluaranCabang' => $laporanPengeluaranCabang,
            'pakets' => $pakets,
            'allCabang' => $allCabang,
            'selectedCabangId' => $cabangId,
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'endOfWeek' => $endOfWeek->format('Y-m-d'),
            'nextWeekOffset' => $weekOffset + 1,
            'prevWeekOffset' => $weekOffset - 1,
        ]);
    }

    public function createcabanglaporan(): Response
    {
        $cabangs = CabangAlbri::all();
        $pakets = Paket::all();

        return Inertia::render('Admin/Laporan/Cabang/create', ['cabangs' => $cabangs, 'pakets' => $pakets]);
    }

    public function storelaporancabang(Request $request)
    {

        $validatedData = $request->validate([
            'cabang_id' => 'required|exists:cabangalbris,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'pakets' => 'nullable|array', // contoh: [1 => 5, 2 => 3]
            'pakets.*' => 'integer|min:0',
            'daftar' => 'required|integer|min:0',
            'modul' => 'required|integer|min:0',
            'kaos' => 'required|integer|min:0',
            'kas' => 'required|integer|min:0',
            'lainlain' => 'required|integer|min:0',
        ]);

        // Pastikan pakets array tidak null
        $validatedData['pakets'] = $validatedData['pakets'] ?? [];

        // ambil data paket yang dipilih
        $pakets = count($validatedData['pakets']) > 0
            ? Paket::whereIn('id', array_keys($validatedData['pakets']))->get()
            : collect();

        // hitung total biaya dari pivot
        $totalbiaya = 0;
        foreach ($pakets as $paket) {
            $jumlah = $validatedData['pakets'][$paket->id] ?? 0;
            $totalbiaya += $paket->harga * $jumlah;
        }

        // total pemasukan = totalbiaya + tambahan manual
        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];

        // simpan laporan cabang
        $laporan = LapPemasukanCabang::create([
            'cabang_id' => $validatedData['cabang_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'created_by' => Auth::id(),
        ]);

        // simpan ke pivot laporan_paket
        foreach ($validatedData['pakets'] as $paketId => $jumlah) {
            if ($jumlah > 0) {
                $laporan->pakets()->attach($paketId, ['jumlah' => $jumlah]);
            }
        }

        if (User::where('id', Auth::user()->id)->first()->hasRole('Guru')) {
            return Redirect::route('guru.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else if (User::where('id', Auth::user()->id)->first()->hasRole('Private')) {
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.cabang')->with('success', 'Laporan pemasukan cabang berhasil ditambahkan.');
        }
    }




    public function editlaporancabang($id): Response
    {
        $laporanCabang = LapPemasukanCabang::with('cabang')->findOrFail($id); // Mengambil data laporan pemasukan cabang berdasarkan id
        $cabangs = CabangAlbri::all(); // Mengambil semua data cabang

        return Inertia::render('Admin/Laporan/Cabang/edit', [
            'laporanCabang' => $laporanCabang->load('pakets'),
            'cabangs' => $cabangs,
            'pakets' => Paket::select('id', 'nama_paket', 'harga')->get(),
        ]);
    }

    public function updatelaporancabang(Request $request, $id): RedirectResponse
    {

        // Validasi data input
        $validatedData = $request->validate([
            'cabang_id' => 'required|exists:cabangalbris,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'pakets' => 'required|array', // contoh: [1 => 5, 2 => 3]
            'pakets.*' => 'integer|min:0',
            'daftar' => 'required|integer',
            'modul' => 'required|integer',
            'kaos' => 'required|integer',
            'kas' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        $laporan = LapPemasukanCabang::findOrFail($id);

        // Hitung ulang total biaya berdasarkan input paket
        $totalbiaya = 0;
        foreach ($validatedData['pakets'] as $paketId => $jumlah) {
            $paket = Paket::find($paketId);
            if ($paket) {
                $totalbiaya += $paket->harga * $jumlah;
            }
        }

        $totalpemasukan = $totalbiaya
            + $validatedData['daftar']
            + $validatedData['modul']
            + $validatedData['kaos']
            + $validatedData['kas']
            + $validatedData['lainlain'];

        // Update laporan
        $laporan->update([
            'cabang_id' => $validatedData['cabang_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'updated_by' => Auth::id(),
        ]);

        // Sinkronisasi paket (pivot)
        $syncData = [];
        foreach ($validatedData['pakets'] as $paketId => $jumlah) {
            if ($jumlah > 0) {
                $syncData[$paketId] = ['jumlah' => $jumlah];
            }
        }
        $laporan->pakets()->sync($syncData);

        if (User::where('id', Auth::user()->id)->first()->hasRole('Guru')) {
            return Redirect::route('guru.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else if (User::where('id', Auth::user()->id)->first()->hasRole('Private')) {
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.cabang')->with('success', 'Laporan pemasukan cabang berhasil ditambahkan.');
        }
    }


    public function destroylaporancabang($id)
    {
        LapPemasukanCabang::find($id)->delete();
        return redirect()->route('admin.laporan.cabang');
    }

    public function bulkDestroyCabang(Request $request)
    {
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return back()->with('error', 'Tidak ada item yang dipilih');
        }

        LapPemasukanCabang::whereIn('id', $ids)->delete();

        return back()->with('success', count($ids) . ' item berhasil dihapus');
    }



    /* -----------------------------------------
            Laporan Pengeluaran Cabang Admin
    -------------------------------------------- */

    public function createcabanpengeluaranlaporan(): Response
    {
        $cabangs = CabangAlbri::all(); // Mengambil semua data cabang
        $users = User::role('Guru')->get(); // Mengambil semua data user dengan role Admin

        return Inertia::render('Admin/Laporan/Cabang/Pengeluaran/CreatePengeluaran', [
            'cabangs' => $cabangs,
            'users' => $users,

        ]);
    }

    public function storelaporanpengeluaran(Request $request)
    {

        $id_guru_yang_bertanggung_jawab = auth()->user()->id; // Contoh

        $validatedData = $request->validate([

            'cabang_id' => 'required|exists:cabangalbris,id',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gurus' => 'nullable|array', // contoh: [ [guru_id => 1, gaji => 500000], ... ]
            // 'gurus.*.guru_id' => 'required|exists:users,id',
            'gurus.*.guru_id' => 'required|string',
            'gurus.*.gaji' => 'required|integer|min:0',
            'atk' => 'required|integer|min:0',
            'sewa' => 'required|integer|min:0',
            'intensif' => 'required|integer|min:0',
            'lisensi' => 'required|integer|min:0',
            'thr' => 'required|integer|min:0',
            'lainlain' => 'required|integer|min:0',
        ]);

        // Pastikan gurus array tidak null
        $validatedData['gurus'] = $validatedData['gurus'] ?? [];

        // hitung total gaji semua guru
        $totalGaji = collect($validatedData['gurus'])->sum('gaji');

        $totalpengeluaran = $totalGaji
            + $validatedData['atk']
            + $validatedData['sewa']
            + $validatedData['intensif']
            + $validatedData['lisensi']
            + $validatedData['thr']
            + $validatedData['lainlain'];

        $laporan = LapPengeluaranCabang::create([
            'cabang_id' => $validatedData['cabang_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'atk' => $validatedData['atk'],
            'sewa' => $validatedData['sewa'],
            'intensif' => $validatedData['intensif'],
            'lisensi' => $validatedData['lisensi'],
            'thr' => $validatedData['thr'],
            'lainlain' => $validatedData['lainlain'],
            'totalpengeluaran' => $totalpengeluaran,
            'created_by' => Auth::id(),
            'guru_id' => $id_guru_yang_bertanggung_jawab,

        ]);

        // simpan pivot guru + gaji
        $syncData = [];
        // foreach ($validatedData['gurus'] as $guru) {
        //     $syncData[$guru['guru_id']] = ['gaji' => $guru['gaji']];
        // }

        foreach ($validatedData['gurus'] as $guru) {
            $laporan->gurus()->create([
                'guru_nama' => $guru['guru_id'], // sebenarnya isinya nama
                'gaji' => $guru['gaji'],
            ]);
        }




        // $laporan->gurus()->sync($syncData);
        if (User::where('id', Auth::user()->id)->first()->hasRole('Guru')) {
            return Redirect::route('guru.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else if (User::where('id', Auth::user()->id)->first()->hasRole('Private')) {
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.cabang')->with('success', 'Laporan pemasukan cabang berhasil ditambahkan.');
        }
    }


    public function editpengeluarancabang($id): Response
    {

        $laporanCabang = LapPengeluaranCabang::with(['cabang', 'user', 'gurus'])->findOrFail($id);  // Mengambil semua data laporan pengeluaran cabang
        $cabangs = CabangAlbri::all(); // Mengambil semua data cabang
        $users = User::role('Guru')->get(); // Mengambil semua data user dengan role Admin

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
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gurus' => 'required|array', // contoh: [ [guru_id => 1, gaji => 500000], ... ]
            'gurus.*.guru_id' => 'required|string',
            'gurus.*.gaji' => 'required|numeric|min:0',
            'atk' => 'required|numeric|min:0',
            'sewa' => 'required|numeric|min:0',
            'intensif' => 'required|numeric|min:0',
            'lisensi' => 'required|numeric|min:0',
            'thr' => 'required|numeric|min:0',
            'lainlain' => 'required|numeric|min:0',
        ]);

        // hitung total gaji semua guru
        $totalGaji = collect($validatedData['gurus'])->sum('gaji');

        $totalpengeluaran = $totalGaji
            + $validatedData['atk']
            + $validatedData['sewa']
            + $validatedData['intensif']
            + $validatedData['lisensi']
            + $validatedData['thr']
            + $validatedData['lainlain'];

        $laporanCabang = LapPengeluaranCabang::findOrFail($id);
        $laporanCabang->update([
            'cabang_id' => $validatedData['cabang_id'],
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'atk' => (int) $validatedData['atk'],
            'sewa' => (int) $validatedData['sewa'],
            'intensif' => (int) $validatedData['intensif'],
            'lisensi' => (int) $validatedData['lisensi'],
            'thr' => (int) $validatedData['thr'],
            'lainlain' => (int) $validatedData['lainlain'],
            'totalpengeluaran' => (int) $totalpengeluaran,
        ]);

        // Hapus data guru lama
        $laporanCabang->gurus()->delete();

        // Simpan data guru baru
        foreach ($validatedData['gurus'] as $guru) {
            $laporanCabang->gurus()->create([
                'guru_nama' => $guru['guru_id'], // sebenarnya isinya nama
                'gaji' => (int) $guru['gaji'],
            ]);
        }

        if (User::where('id', Auth::user()->id)->first()->hasRole('Guru')) {
            return Redirect::route('guru.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else if (User::where('id', Auth::user()->id)->first()->hasRole('Private')) {
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.cabang')->with('success', 'Laporan pemasukan cabang berhasil ditambahkan.');
        }
    }

    public function destroypengeluarancabang($id)
    {
        LapPengeluaranCabang::find($id)->delete();
        return redirect()->route('admin.laporan.cabang');
    }

    public function bulkDestroyPengeluaranCabang(Request $request)
    {
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return back()->with('error', 'Tidak ada item yang dipilih');
        }

        LapPengeluaranCabang::whereIn('id', $ids)->delete();

        return back()->with('success', count($ids) . ' item berhasil dihapus');
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
            ->with(['user', 'pakets'])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanMitraPage');
        $laporanPengeluaranMitra = LapPengeluaranMitra::with('mitras', 'user')
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranMitraPage');
        $laporanMitraFull = LapPemasukanMitra::all();
        $laporanPengeluaranMitraFull = LapPengeluaranMitra::with('mitras')->get();

        // Ambil data paket mitra untuk header tabel
        $paketMitra = PaketMitra::orderBy('nama_paket')->get();

        return Inertia::render('Admin/Laporan/Mitra/Index', [
            'laporanMitra' => $laporanMitra,
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'endOfWeek' => $endOfWeek->format('Y-m-d'),
            'nextWeekOffset' => $weekOffset + 1,
            'prevWeekOffset' => $weekOffset - 1,
            'laporanPengeluaranMitra' => $laporanPengeluaranMitra,
            'laporanMitraFull' => $laporanMitraFull,
            'laporanPengeluaranMitraFull' => $laporanPengeluaranMitraFull,
            'paketMitra' => $paketMitra,
        ]);
    }
    public function createmitralaporan(): Response
    {
        $paketMitra = PaketMitra::all();

        return Inertia::render('Admin/Laporan/Mitra/Create', [
            'paketMitra' => $paketMitra
        ]);
    }

    public function storelaporanmitra(Request $request)
    {
        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'pakets' => 'nullable|array', // contoh: [1 => 5, 2 => 3]
            'pakets.*' => 'integer|min:0',
            'daftar' => 'required|integer|min:0',
            'modul' => 'required|integer|min:0',
            'kaos' => 'required|integer|min:0',
            'kas' => 'required|integer|min:0',
            'lainlain' => 'required|integer|min:0',
        ]);

        // Pastikan pakets array tidak null
        $validatedData['pakets'] = $validatedData['pakets'] ?? [];

        // ambil data paket yang dipilih
        $pakets = count($validatedData['pakets']) > 0
            ? PaketMitra::whereIn('id', array_keys($validatedData['pakets']))->get()
            : collect();

        // hitung total biaya dari pivot
        $totalbiaya = 0;
        foreach ($pakets as $paket) {
            $jumlah = $validatedData['pakets'][$paket->id] ?? 0;
            $totalbiaya += $paket->harga * $jumlah;
        }

        // total pemasukan = totalbiaya + tambahan manual
        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];

        // simpan laporan mitra
        $laporan = LapPemasukanMitra::create([
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'created_by' => Auth::id(),
        ]);

        // simpan ke pivot laporan_paket_mitra
        foreach ($validatedData['pakets'] as $paketId => $jumlah) {
            if ($jumlah > 0) {
                $laporan->pakets()->attach($paketId, ['jumlah' => $jumlah]);
            }
        }

        if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan mitra berhasil ditambahkan.');
        } else {
            return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pemasukan mitra berhasil ditambahkan.');
        }
    }

    public function editlaporanmitra($id): Response
    {
        $laporanMitra = LapPemasukanMitra::with('pakets')->findOrFail($id); // Mengambil data laporan pemasukan mitra berdasarkan id
        $paketMitra = PaketMitra::all();

        return Inertia::render('Admin/Laporan/Mitra/edit', [
            'laporanMitra' => $laporanMitra,
            'paketMitra' => $paketMitra
        ]);
    }

    public function updatelaporanmitra(Request $request, $id): RedirectResponse
    {

        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'pakets' => 'required|array', // contoh: [1 => 5, 2 => 3]
            'pakets.*' => 'integer|min:0',
            'daftar' => 'required|integer',
            'modul' => 'required|integer',
            'kaos' => 'required|integer',
            'kas' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        // ambil data paket yang dipilih
        $pakets = PaketMitra::whereIn('id', array_keys($validatedData['pakets']))->get();

        // hitung total biaya dari pivot
        $totalbiaya = 0;
        foreach ($pakets as $paket) {
            $jumlah = $validatedData['pakets'][$paket->id] ?? 0;
            $totalbiaya += $paket->harga * $jumlah;
        }

        // total pemasukan = totalbiaya + tambahan manual
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
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
        ]);

        // sync paket data (menghapus lama dan tambah baru)
        $laporanMitra->pakets()->detach(); // hapus semua
        foreach ($validatedData['pakets'] as $paketId => $jumlah) {
            if ($jumlah > 0) {
                $laporanMitra->pakets()->attach($paketId, ['jumlah' => $jumlah]);
            }
        }

        if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pemasukan mitra berhasil diperbarui.');
        } else {
            return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pemasukan mitra berhasil diperbarui.');
        }
    }

    public function destroylaporanmitra($id)
    {
        LapPemasukanMitra::find($id)->delete();
        return redirect()->route('admin.laporan.mitra');
    }

    public function bulkDestroyMitra(Request $request)
    {
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return back()->with('error', 'Tidak ada item yang dipilih');
        }

        LapPemasukanMitra::whereIn('id', $ids)->delete();

        return back()->with('success', count($ids) . ' item berhasil dihapus');
    }

    // Laporan Pengeluaran Mitra Admin
    public function createpengeluaranmitralaporan(): Response
    {
        $users = User::role('Mitra')->get(); // Mengambil semua data user dengan role Admin

        return Inertia::render('Admin/Laporan/Mitra/Pengeluaran/CreatePengeluaran', [
            'users' => $users,

        ]);
    }

    public function storelaporanpengeluaranmitra(Request $request)
    {
        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'mitras' => 'nullable|array', // contoh: [ [mitra_id => nama, gaji => 500000], ... ]
            'mitras.*.mitra_id' => 'required|string',
            'mitras.*.gaji' => 'required|integer|min:0',
            'atk' => 'required|integer|min:0',
            'intensif' => 'required|integer|min:0',
            'lisensi' => 'required|integer|min:0',
            'lainlain' => 'required|integer|min:0',
        ]);

        // Pastikan mitras array tidak null
        $validatedData['mitras'] = $validatedData['mitras'] ?? [];

        // hitung total gaji semua mitra
        $totalGaji = collect($validatedData['mitras'])->sum('gaji');

        $totalpengeluaran = $totalGaji
            + $validatedData['atk']
            + $validatedData['intensif']
            + $validatedData['lisensi']
            + $validatedData['lainlain'];

        $laporan = LapPengeluaranMitra::create([
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'atk' => $validatedData['atk'],
            'intensif' => $validatedData['intensif'],
            'lisensi' => $validatedData['lisensi'],
            'lainlain' => $validatedData['lainlain'],
            'totalpengeluaran' => $totalpengeluaran,
            'created_by' => Auth::id(),
        ]);

        // simpan mitra + gaji ke table detail pengeluaran
        foreach ($validatedData['mitras'] as $mitra) {
            $laporan->mitras()->create([
                'mitra_nama' => $mitra['mitra_id'], // nama mitra
                'gaji' => $mitra['gaji'],
            ]);
        }

        if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pengeluaran mitra berhasil ditambahkan.');
        } else {
            return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil ditambahkan.');
        }
    }

    public function editpengeluaranmitra($id): Response
    {
        $laporanMitra = LapPengeluaranMitra::with('mitras')->findOrFail($id);

        return Inertia::render('Admin/Laporan/Mitra/Pengeluaran/EditPengeluaran', [
            'laporanMitra' => $laporanMitra,
        ]);
    }

    public function updatepengeluaranmitra(Request $request, $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'mitras' => 'required|array|min:1',
            'mitras.*.mitra_id' => 'required|string',
            'mitras.*.gaji' => 'required|integer|min:0',
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'atk' => 'required|integer|min:0',
            'intensif' => 'required|integer|min:0',
            'lisensi' => 'required|integer|min:0',
            'lainlain' => 'required|integer|min:0',
        ]);

        // Calculate total gaji from all mitras
        $totalGaji = array_sum(array_column($validatedData['mitras'], 'gaji'));

        $totalpengeluaran = $totalGaji +
            $validatedData['atk'] +
            $validatedData['intensif'] +
            $validatedData['lisensi'] +
            $validatedData['lainlain'];

        $laporanMitra = LapPengeluaranMitra::findOrFail($id);

        // Update main laporan data
        $laporanMitra->update([
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'atk' => $validatedData['atk'],
            'intensif' => $validatedData['intensif'],
            'lisensi' => $validatedData['lisensi'],
            'lainlain' => $validatedData['lainlain'],
            'totalpengeluaran' => $totalpengeluaran,
            'updated_by' => Auth::user()->id,
        ]);

        // Delete existing mitra details and recreate
        $laporanMitra->mitras()->delete();

        // Create new mitra details
        foreach ($validatedData['mitras'] as $mitraData) {
            LaporanPengeluaranMitraDet::create([
                'lap_pengeluaran_mitra_id' => $laporanMitra->id,
                'mitra_nama' => $mitraData['mitra_id'], // mitra_id contains the name
                'gaji' => $mitraData['gaji'],
            ]);
        }

        if (User::where('id', Auth::user()->id)->first()->hasRole('Mitra')) {
            return Redirect::route('mitra.dashboard')->with('success', 'Laporan pengeluaran mitra berhasil diupdate.');
        } else {
            return Redirect::route('admin.laporan.mitra')->with('success', 'Laporan pengeluaran mitra berhasil diupdate.');
        }
    }

    public function destroypengeluaranmitra($id)
    {
        LapPengeluaranMitra::find($id)->delete();
        return redirect()->route('admin.laporan.mitra');
    }

    public function bulkDestroyPengeluaranMitra(Request $request)
    {
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return back()->with('error', 'Tidak ada item yang dipilih');
        }

        LapPengeluaranMitra::whereIn('id', $ids)->delete();

        return back()->with('success', count($ids) . ' item berhasil dihapus');
    }

    /* -----------------------------------------
            Setting Harga Paket Mitra
        -------------------------------------------- */

    public function settingHargaMitra(): Response
    {
        $paketMitra = PaketMitra::orderBy('nama_paket')->get();

        return Inertia::render('Admin/Laporan/Mitra/SettingHarga/Index', [
            'paketMitra' => $paketMitra,
        ]);
    }

    public function createPaketMitra(): Response
    {
        return Inertia::render('Admin/Laporan/Mitra/SettingHarga/Create');
    }

    public function storePaketMitra(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'nama_paket' => 'required|string|max:255',
            'harga' => 'required|integer|min:0',
        ]);

        PaketMitra::create($validatedData);

        return Redirect::route('admin.laporan.mitra.setting-harga')->with('success', 'Paket mitra berhasil ditambahkan.');
    }

    public function editPaketMitra($id): Response
    {
        $paket = PaketMitra::findOrFail($id);

        return Inertia::render('Admin/Laporan/Mitra/SettingHarga/Edit', [
            'paket' => $paket,
        ]);
    }

    public function updatePaketMitra(Request $request, $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'nama_paket' => 'required|string|max:255',
            'harga' => 'required|integer|min:0',
        ]);

        $paket = PaketMitra::findOrFail($id);
        $paket->update($validatedData);

        return Redirect::route('admin.laporan.mitra.setting-harga')->with('success', 'Paket mitra berhasil diupdate.');
    }

    public function destroyPaketMitra($id): RedirectResponse
    {
        $paket = PaketMitra::findOrFail($id);
        $paket->delete();

        return Redirect::route('admin.laporan.mitra.setting-harga')->with('success', 'Paket mitra berhasil dihapus.');
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
            ->with('user')
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPrivatePage');

        $laporanPengeluaranPrivate = LapPengeluaranPrivate::with(['user', 'privateBimbles',])
            ->whereBetween('tanggal', [$startOfWeek, $endOfWeek])
            ->orderBy('tanggal', 'desc')
            ->paginate(50, ['*'], 'laporanPengeluaranPrivatePage');

        $laporanPrivateFull = LapPemasukanPrivate::all();
        $laporanPengeluaranPrivateFull = LapPengeluaranPrivate::with(['user', 'privateBimbles'])->get();

        // Ambil data paket private untuk header tabel
        $paketPrivate = PaketPrivate::orderBy('nama_paket')->get();

        return Inertia::render(
            'Admin/Laporan/Private/Index',
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


    public function createprivate(): Response
    {
        $paketPrivates = PaketPrivate::all();
        return Inertia::render('Admin/Laporan/Private/Create', ['paketPrivates' => $paketPrivates]);
    }

    public function storelaporanprivate(Request $request)
    {
        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'pakets' => 'nullable|array', // Dynamic paket data
            'pakets.*' => 'integer|min:0', // Each paket value must be integer >= 0
            'daftar' => 'required|integer|min:0',
            'modul' => 'required|integer|min:0',
            'kaos' => 'required|integer|min:0',
            'kas' => 'required|integer|min:0',
            'lainlain' => 'required|integer|min:0',
        ]);

        // Pastikan pakets array tidak null
        $validatedData['pakets'] = $validatedData['pakets'] ?? [];

        // Calculate total biaya using dynamic pakets
        $totalbiaya = 0;
        $paketPrivates = PaketPrivate::all()->keyBy('id');

        foreach ($validatedData['pakets'] as $paketId => $jumlah) {
            if ($jumlah > 0 && $paketPrivates->has($paketId)) {
                $totalbiaya += $jumlah * $paketPrivates[$paketId]->harga;
            }
        }

        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];

        // Calculate traditional fields for backward compatibility
        $paketMapping = [
            'Paket 30K' => 'biaya_30',
            'Paket 35K' => 'biaya_35',
            'Paket 40K' => 'biaya_40',
            'Paket 45K' => 'biaya_45',
        ];

        $traditionalValues = [
            'biaya_30' => 0,
            'biaya_35' => 0,
            'biaya_40' => 0,
            'biaya_45' => 0,
        ];

        foreach ($validatedData['pakets'] as $paketId => $jumlah) {
            if ($jumlah > 0 && $paketPrivates->has($paketId)) {
                $paket = $paketPrivates[$paketId];
                if (isset($paketMapping[$paket->nama_paket])) {
                    $traditionalValues[$paketMapping[$paket->nama_paket]] = $jumlah;
                }
            }
        }

        LapPemasukanPrivate::create([
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'pakets' => $validatedData['pakets'], // Store dynamic paket data as JSON
            'biaya_30' => $traditionalValues['biaya_30'], // For backward compatibility
            'biaya_35' => $traditionalValues['biaya_35'],
            'biaya_40' => $traditionalValues['biaya_40'],
            'biaya_45' => $traditionalValues['biaya_45'],
            'totalbiaya' => $totalbiaya,
            'daftar' => $validatedData['daftar'],
            'modul' => $validatedData['modul'],
            'kaos' => $validatedData['kaos'],
            'kas' => $validatedData['kas'],
            'lainlain' => $validatedData['lainlain'],
            'totalpemasukan' => $totalpemasukan,
            'created_by' => Auth::user()->id,
        ]);

        if (User::where('id', Auth::user()->id)->first()->hasRole('Private')) {
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan private berhasil ditambahkan.');
        } else {
            return Redirect::route('admin.laporan.private')->with('success', 'Laporan pemasukan private berhasil ditambahkan.');
        }
    }


    public function editlaporanprivate($id): Response
    {
        $laporanprivate = LapPemasukanPrivate::findOrFail($id); // Mengambil data laporan pemasukan private berdasarkan id
        $paketPrivates = PaketPrivate::all(); // Get all dynamic pakets for form

        return Inertia::render('Admin/Laporan/Private/edit', [
            'laporanprivate' => $laporanprivate,
            'paketPrivates' => $paketPrivates
        ]);
    }

    public function updatelaporanprivate(Request $request, $id): RedirectResponse
    {

        
        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'pakets' => 'required|array', // Dynamic paket data
            'pakets.*' => 'integer|min:0', // Each paket value must be integer >= 0
            'daftar' => 'required|integer',
            'modul' => 'required|integer',
            'kaos' => 'required|integer',
            'kas' => 'required|integer',
            'lainlain' => 'required|integer',
        ]);

        // Calculate total biaya using dynamic pakets
        $totalbiaya = 0;
        $paketPrivates = PaketPrivate::all()->keyBy('id');

        foreach ($validatedData['pakets'] as $paketId => $jumlah) {
            if ($jumlah > 0 && $paketPrivates->has($paketId)) {
                $totalbiaya += $jumlah * $paketPrivates[$paketId]->harga;
            }
        }

        $totalpemasukan = $totalbiaya +
            $validatedData['daftar'] +
            $validatedData['modul'] +
            $validatedData['kaos'] +
            $validatedData['kas'] +
            $validatedData['lainlain'];

        // Calculate traditional fields for backward compatibility
        $paketMapping = [
            'Paket 30K' => 'biaya_30',
            'Paket 35K' => 'biaya_35',
            'Paket 40K' => 'biaya_40',
            'Paket 45K' => 'biaya_45',
        ];

        $traditionalValues = [
            'biaya_30' => 0,
            'biaya_35' => 0,
            'biaya_40' => 0,
            'biaya_45' => 0,
        ];

        foreach ($validatedData['pakets'] as $paketId => $jumlah) {
            if ($jumlah > 0 && $paketPrivates->has($paketId)) {
                $paket = $paketPrivates[$paketId];
                if (isset($paketMapping[$paket->nama_paket])) {
                    $traditionalValues[$paketMapping[$paket->nama_paket]] = $jumlah;
                }
            }
        }

        $laporanPrivate = LapPemasukanPrivate::findOrFail($id);
        $laporanPrivate->update([
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'pakets' => $validatedData['pakets'], // Store dynamic paket data as JSON
            'biaya_30' => $traditionalValues['biaya_30'], // For backward compatibility
            'biaya_35' => $traditionalValues['biaya_35'],
            'biaya_40' => $traditionalValues['biaya_40'],
            'biaya_45' => $traditionalValues['biaya_45'],
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
            return Redirect::route('private.dashboard')->with('success', 'Laporan pemasukan private berhasil diupdate.');
        } else {
            return Redirect::route('admin.laporan.private')->with('success', 'Laporan pemasukan private berhasil diupdate.');
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
        $users = User::role('Private')->get(); // Mengambil semua data user dengan role Admin

        return Inertia::render('Admin/Laporan/Private/Pengeluaran/CreatePengeluaran', [
            'users' => $users,

        ]);
    }

    public function storelaporanpengeluaranprivate(Request $request)
    {

        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gurus' => 'nullable|array', // Dynamic gurus array
            'gurus.*.guru_id' => 'required|string', // Can be user ID or name
            'gurus.*.gaji' => 'required|integer|min:0',
            'atk' => 'required|integer|min:0',
            'sewa' => 'required|integer|min:0',
            'intensif' => 'required|integer|min:0',
            'lisensi' => 'required|integer|min:0',
            'thr' => 'required|integer|min:0',
            'lainlain' => 'required|integer|min:0',
        ]);

        // Pastikan gurus array tidak null
        $validatedData['gurus'] = $validatedData['gurus'] ?? [];

        // Calculate total gaji from all gurus
        $totalGaji = collect($validatedData['gurus'])->sum('gaji');

        $totalpengeluaran = $totalGaji +
            $validatedData['atk'] +
            $validatedData['sewa'] +
            $validatedData['intensif'] +
            $validatedData['lisensi'] +
            $validatedData['thr'] +
            $validatedData['lainlain'];

        // For backward compatibility, use first guru as main guru_id and gaji
        $firstGuru = $validatedData['gurus'][0] ?? null;
        $mainGuruId = $firstGuru ? $firstGuru['guru_id'] : null;
        $mainGaji = $firstGuru ? $firstGuru['gaji'] : 0;

        // Convert guru_id to actual user ID if it's a valid user ID
        if ($mainGuruId && is_numeric($mainGuruId)) {
            $user = User::find($mainGuruId);
            if (!$user) {
                $mainGuruId = null; // Invalid user ID, set to null
            }
        } else {
            $mainGuruId = null; // Not a valid user ID
        }

        LapPengeluaranPrivate::create([
            'guru_id' => Auth::user()->id, // Use authenticated user ID like cabang system
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'gurus' => $validatedData['gurus'], // Store dynamic gurus as JSON
            'gaji' => $totalGaji, // Total gaji instead of single gaji
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
            return Redirect::route('private.dashboard')->with('success', 'Laporan pengeluaran private berhasil ditambahkan.');
        } else {

            return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil ditambahkan.');
        }
    }

    public function editpengeluaranprivate($id): Response
    {
        $pengeluaranprivate = LapPengeluaranPrivate::findOrFail($id);
        $users = User::role('Private')->get(); // Mengambil semua data user dengan role Admin



        return Inertia::render('Admin/Laporan/Private/Pengeluaran/EditPengeluaran', ['pengeluaranprivate' => $pengeluaranprivate, 'users' => $users]);
    }

    public function updatepengeluaranprivate(Request $request, $id): RedirectResponse
    {

        $validatedData = $request->validate([
            'hari' => 'required|string',
            'tanggal' => 'required|date',
            'gurus' => 'required|array', // Dynamic gurus array
            'gurus.*.guru_id' => 'required|string', // Can be user ID or name
            'gurus.*.gaji' => 'required|integer|min:0',
            'atk' => 'required|integer|min:0',
            'sewa' => 'required|integer|min:0',
            'intensif' => 'required|integer|min:0',
            'lisensi' => 'required|integer|min:0',
            'thr' => 'required|integer|min:0',
            'lainlain' => 'required|integer|min:0',
        ]);

        // Calculate total gaji from all gurus
        $totalGaji = collect($validatedData['gurus'])->sum('gaji');

        $totalpengeluaran = $totalGaji +
            $validatedData['atk'] +
            $validatedData['sewa'] +
            $validatedData['intensif'] +
            $validatedData['lisensi'] +
            $validatedData['thr'] +
            $validatedData['lainlain'];

        // For backward compatibility, use first guru as main guru_id and gaji
        $firstGuru = $validatedData['gurus'][0] ?? null;
        $mainGuruId = $firstGuru ? $firstGuru['guru_id'] : null;
        $mainGaji = $firstGuru ? $firstGuru['gaji'] : 0;

        // Convert guru_id to actual user ID if it's a valid user ID
        if ($mainGuruId && is_numeric($mainGuruId)) {
            $user = User::find($mainGuruId);
            if (!$user) {
                $mainGuruId = null; // Invalid user ID, set to null
            }
        } else {
            $mainGuruId = null; // Not a valid user ID
        }

        $laporanPrivate = LapPengeluaranPrivate::findOrFail($id);
        $laporanPrivate->update([
            'guru_id' => Auth::user()->id, // Use authenticated user ID like cabang system
            'hari' => $validatedData['hari'],
            'tanggal' => $validatedData['tanggal'],
            'gurus' => $validatedData['gurus'], // Store dynamic gurus as JSON
            'gaji' => $totalGaji, // Total gaji instead of single gaji
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
            return Redirect::route('private.dashboard')->with('success', 'Laporan pengeluaran private berhasil diupdate.');
        } else {

            return Redirect::route('admin.laporan.private')->with('success', 'Laporan pengeluaran private berhasil diupdate.');
        }
    }

    public function destroypengeluaranprivate($id)
    {
        LapPengeluaranPrivate::find($id)->delete();
        return redirect()->route('admin.laporan.private');
    }

    public function bulkDestroyPrivate(Request $request)
    {
        $request->validate([
            'ids' => 'nullable|array',
            'ids.*' => 'exists:lap_pemasukan_private,id'
        ]);

        LapPemasukanPrivate::whereIn('id', $request->ids)->delete();
        return back()->with('success', 'Data berhasil dihapus');
    }

    public function bulkDestroyPengeluaranPrivate(Request $request)
    {
        $request->validate([
            'ids' => 'nullable|array',
            'ids.*' => 'exists:lap_pengeluaran_private,id'
        ]);

        LapPengeluaranPrivate::whereIn('id', $request->ids)->delete();
        return back()->with('success', 'Data berhasil dihapus');
    }



    /* -----------------------------------------
            Rekap Bulanan Cabang
        --------------------------------------- */

    public function rekapcabang(Request $request): Response
    {
        // Ambil bulan dan tahun dari request, atau gunakan bulan dan tahun saat ini sebagai default
        $bulan = $request->input('bulan', date('m'));
        $tahun = $request->input('tahun', date('Y'));

        try {
            // Filter data berdasarkan bulan dan tahun
            $laporanCabang = LapPemasukanCabang::with([
                'cabang',
                'user',
                'pakets:id,nama_paket,harga',
            ])
                ->whereMonth('tanggal', $bulan)
                ->whereYear('tanggal', $tahun)
                ->orderBy('tanggal', 'desc')
                ->paginate(1000);

            $laporanPengeluaranCabang = LapPengeluaranCabang::with([
                'cabang',
                'user',
                'gurus'
            ])
                ->whereMonth('tanggal', $bulan)
                ->whereYear('tanggal', $tahun)
                ->orderBy('tanggal', 'desc')
                ->paginate(1000);

        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Rekap Cabang Error: ' . $e->getMessage());

            // Return empty pagination for both if there's an error
            $laporanCabang = new \Illuminate\Pagination\LengthAwarePaginator([], 0, 10);
            $laporanPengeluaranCabang = new \Illuminate\Pagination\LengthAwarePaginator([], 0, 10);
        }

        // daftar paket untuk header kolom dinamis
        $pakets = Paket::select('id', 'nama_paket', 'harga')->orderBy('nama_paket')->get();

        // Kirim data dan info bulan/tahun saat ini ke frontend
        return Inertia::render('Admin/Laporan/Cabang/RekapBulanan/index', [
            'laporanCabang' => $laporanCabang,
            'laporanPengeluaranCabang' => $laporanPengeluaranCabang,
            'pakets' => $pakets,
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
        $laporanMitra = LapPemasukanMitra::with([
            'user',
            'pakets:id,nama_paket,harga',
        ])
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(1000, ['*'], 'laporanMitraPage'); // Sesuaikan jumlah per halaman
        $laporanPengeluaranMitra = LapPengeluaranMitra::with(['user', 'mitras'])
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(1000, ['*'], 'laporanMitraPage');

        // Ambil data paket mitra untuk header tabel
        $paketMitra = PaketMitra::orderBy('nama_paket')->get();

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
            'paketMitra' => $paketMitra,
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

        // Filter data berdasarkan bulan dan tahun - ADD user relationship here
        $laporanPrivate = LapPemasukanPrivate::with('user') // Added user relationship
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->paginate(1000, ['*'], 'laporanPrivatePage'); // Sesuaikan jumlah per halaman

        $laporanPengeluaranPrivate = LapPengeluaranPrivate::with(['user'])
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->orderBy('tanggal', 'desc')
            ->get()
            ->map(function ($pengeluaran) {
                // Pastikan field gurus ter-cast dengan benar (sudah diatur di model)
                $gurus = $pengeluaran->gurus;

                // Jika gurus kosong atau null, coba buat dari data legacy
                if (empty($gurus) && $pengeluaran->guru_id && $pengeluaran->gaji) {
                    // Cari nama user berdasarkan guru_id jika itu adalah ID
                    $guruName = $pengeluaran->guru_id;
                    if (is_numeric($pengeluaran->guru_id)) {
                        $user = \App\Models\User::find($pengeluaran->guru_id);
                        if ($user) {
                            $guruName = $user->name;
                        }
                    }

                    $pengeluaran->gurus = [
                        [
                            'guru_id' => $guruName,
                            'gaji' => $pengeluaran->gaji
                        ]
                    ];
                }

                return $pengeluaran;
            })
            ->groupBy(function ($item) {
                return $item->tanggal;
            })
            ->map(function ($items) {
                return $items->values();
            });

        // Convert back to paginated format for frontend compatibility
        $laporanPengeluaranPrivateFlat = $laporanPengeluaranPrivate->flatten();
        $currentPage = 1;
        $perPage = 1000; // Show more items per page for better Excel generation
        $currentItems = $laporanPengeluaranPrivateFlat->slice(($currentPage - 1) * $perPage, $perPage);
        $laporanPengeluaranPrivate = new \Illuminate\Pagination\LengthAwarePaginator(
            $currentItems,
            $laporanPengeluaranPrivateFlat->count(),
            $perPage,
            $currentPage,
            ['path' => request()->url(), 'pageName' => 'laporanPrivatePage']
        );
        // Ambil data paket private untuk header tabel
        $paketPrivate = PaketPrivate::orderBy('nama_paket')->get();

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
            'paketPrivate' => $paketPrivate,
        ]);
    }
}
