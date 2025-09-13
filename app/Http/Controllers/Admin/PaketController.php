<?php

namespace App\Http\Controllers\Admin;
use App\Models\Paket;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaketController extends Controller
{
     public function index()
    {
        $pakets = Paket::all();
        return Inertia::render('Admin/Laporan/Cabang/Paket/Index', [
            'pakets' => $pakets
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Laporan/Cabang/Paket/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_paket' => 'required|string|max:255',
            'harga' => 'required|integer'
        ]);

        Paket::create($request->all());

        return redirect()->route('paket.index');
    }

    public function edit(Paket $paket)
    {
        return Inertia::render('Admin/Laporan/Cabang/Paket/edit', [
            'paket' => $paket
        ]);
    }

    public function update(Request $request, Paket $paket)
    {
        $request->validate([
            'nama_paket' => 'required|string|max:255',
            'harga' => 'required|integer'
        ]);

        $paket->update($request->all());

        return redirect()->route('paket.index');
    }

    public function destroy(Paket $paket)
    {
        $paket->delete();
        return redirect()->route('paket.index');
    }
}
