<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Mitra;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MitraController extends Controller
{
    public function index()
    {
        // Ambil semua data mitra dari database
        $mitras = Mitra::all();
        

        
        // Kirim data mitra ke tampilan Inertia
        return Inertia::render('Mitra/Dashboard', [
            'mitras' => $mitras
        ]);
    }
    public function showadmin()
    {
        $mitras = Mitra::all();

        return Inertia::render('Admin/Dashboard', [
            'mitras' => $mitras
        ]);
    }


    public function create()
    {

        
        return Inertia::render('Mitra/Create');
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:mitra',
            'phone' => 'required',
            'company' => 'required',
        ]);

        Mitra::create($request->all());

        if (Auth::user()->hasRole('Admin')) {
            return redirect()->route('admin.dashboard')->with('success', 'Mitra berhasil ditambahkan');
        }
        return redirect()->route('Mitra.Dashboard')->with('success', 'Mitra berhasil ditambahkan');
    }

    public function edit($id)
    {
        $mitra = Mitra::findOrFail($id);
        return Inertia::render('Mitra/Edit', ['mitra' => $mitra]);
    }

    public function update(Request $request, $id)
    {
        $mitra = Mitra::findOrFail($id);
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:mitra,email,' . $id,
            'phone' => 'required',
            'company' => 'required',
        ]);

        $mitra->update($request->all());

        if (Auth::user()->hasRole('Admin')) {
            return redirect()->route('admin.dashboard')->with('success', 'Mitra berhasil diperbarui');
        }
         // Pastikan redirect ke route yang benar
    return redirect()->route('Mitra.Dashboard')->with('success', 'Mitra berhasil diperbarui');
}

    public function destroy($id)
    {
        $mitra = Mitra::findOrFail($id);
        $mitra->delete();

        if (Auth::user()->hasRole('Admin')) {
            return redirect()->route('admin.dashboard')->with('success', 'Mitra berhasil dihapus');
        }
        return redirect()->route('mitra.Dashboard')->with('success', 'Mitra berhasil dihapus');
    }
}
