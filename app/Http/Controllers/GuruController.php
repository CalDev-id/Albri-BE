<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Guru;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GuruController extends Controller
{
    public function index()
    {
        // Ambil semua data guru dari database
        $gurus = Guru::all();
        

        
        // Kirim data guru ke tampilan Inertia
        return Inertia::render('Guru/Dashboard', [
            'gurus' => $gurus
        ]);
    }
    public function showadmin()
    {
        $gurus = Guru::all();

        return Inertia::render('Admin/Dashboard', [
            'gurus' => $gurus
        ]);
    }

    public function create()
    {
        return Inertia::render('Guru/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'email' => 'required|email|unique:gurus,email',
        ]);
    
        Guru::create([
            'name' => $request->name,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
        ]);
    
        return redirect()->route('guru.dashboard')->with('success', 'Guru berhasil ditambahkan');
    }
    

    public function edit($id)
    {
        // Ambil data guru berdasarkan ID
        $guru = Guru::find($id);

        // Kirim data guru ke tampilan Inertia
        return Inertia::render('Guru/Edit', [
            'guru' => $guru
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validasi data yang dikirim
        $request->validate([
            'nama' => 'required',
            'alamat' => 'required',
            'no_hp' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        // Ambil data guru berdasarkan ID
        $guru = Guru::find($id);

        // Update data guru ke database
        $guru->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_hp' => $request->no_hp,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Redirect ke halaman daftar guru
        return redirect()->route('guru.dashboard');

    }

    public function destroy($id)
    {
        // Hapus data guru dari database
        Guru::destroy($id);

        // Redirect ke halaman daftar guru
        return redirect()->route('guru.dashboard');
    }

    
}
