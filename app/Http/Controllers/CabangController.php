<?php

namespace App\Http\Controllers;

use App\Models\Cabangalbri;
use App\Models\LapPemasukanCabang;
use App\Models\LapPengeluaranCabang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;


class CabangController extends Controller
{
    public function index()
    {
        $cabangs = Cabangalbri::all();
        return Inertia::render('Admin/Cabang/Index', [
            'cabangs' => $cabangs
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Cabang/create');
    }



    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
           
        ]);

        Cabangalbri::create($request->all());   

        return redirect()->route('admin.cabangs');
    }

    public function edit($id)
    {
        $cabang = Cabangalbri::find($id);
        return Inertia::render('Admin/Cabang/edit', [
            'cabang' => $cabang
        ]);
    }


    public function update(Request $request,$id): RedirectResponse
    {
        $request->validate([
            'nama' => 'required',
           
        ]);

        $cabang = Cabangalbri::find($id);
        $cabang->update($request->all());

        return redirect()->route('admin.cabangs');
    }
 

    public function destroy($id)
    {
        try {
            $cabang = Cabangalbri::find($id);
            
            if (!$cabang) {
                return redirect()->route('admin.cabangs')->with('error', 'Cabang tidak ditemukan.');
            }
            
            // Cek apakah ada laporan pemasukan yang terkait
            $laporanPemasukan = LapPemasukanCabang::where('cabang_id', $id)->count();
            
            // Cek apakah ada laporan pengeluaran yang terkait
            $laporanPengeluaran = LapPengeluaranCabang::where('cabang_id', $id)->count();
            
            if ($laporanPemasukan > 0 || $laporanPengeluaran > 0) {
                // Ada data laporan terkait, berikan peringatan
                $totalLaporan = $laporanPemasukan + $laporanPengeluaran;
                return redirect()->route('admin.cabangs')
                    ->with('warning', "Cabang '{$cabang->nama}' memiliki {$totalLaporan} laporan terkait. Setelah dihapus, laporan-laporan tersebut akan tetap ada tetapi tidak lagi terhubung dengan cabang ini. Apakah Anda yakin ingin melanjutkan?")
                    ->with('confirm_delete_id', $id);
            }
            
            // Tidak ada data terkait, bisa langsung dihapus
            $nama = $cabang->nama;
            $cabang->delete();
            
            return redirect()->route('admin.cabangs')
                ->with('success', "Cabang '{$nama}' berhasil dihapus.");
                
        } catch (\Exception $e) {
            return redirect()->route('admin.cabangs')
                ->with('error', 'Terjadi kesalahan saat menghapus cabang: ' . $e->getMessage());
        }
    }
    
    public function forceDestroy($id)
    {
        try {
            $cabang = Cabangalbri::find($id);
            
            if (!$cabang) {
                return redirect()->route('admin.cabangs')->with('error', 'Cabang tidak ditemukan.');
            }
            
            $nama = $cabang->nama;
            
            // Force delete - foreign key sudah diatur SET NULL jadi laporan tetap ada
            $cabang->delete();
            
            return redirect()->route('admin.cabangs')
                ->with('success', "Cabang '{$nama}' berhasil dihapus. Data laporan terkait tetap tersimpan.");
                
        } catch (\Exception $e) {
            return redirect()->route('admin.cabangs')
                ->with('error', 'Terjadi kesalahan saat menghapus cabang: ' . $e->getMessage());
        }
    }
}
