<?php

namespace App\Http\Controllers;

use App\Models\Cabang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CabangController extends Controller
{
    public function index()
    {
        $cabangs = Cabang::all();
        return Inertia::render('Branch', [
            'cabangs' => $cabangs
        ]);
    }

    public function create()
    {
        return Inertia::render('CreateCabang');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'pengeluaran' => 'required|numeric',
            'pendapatan' => 'required|numeric',
            'jumlah_murid' => 'required|integer',
        ]);

        Cabang::create($request->all());

        return redirect()->route('cabangs.index')->with('success', 'Cabang created successfully.');
    }

    public function edit(Cabang $cabang)
    {
        return Inertia::render('EditCabang', [
            'cabang' => $cabang
        ]);
    }

    public function update(Request $request, Cabang $cabang)
    {
        $request->validate([
            'nama' => 'required',
            'pengeluaran' => 'required|numeric',
            'pendapatan' => 'required|numeric',
            'jumlah_murid' => 'required|integer',
        ]);

        $cabang->update($request->all());

        return redirect()->route('cabangs.index')->with('success', 'Cabang updated successfully.');
    }

    public function destroy(Cabang $cabang)
    {
        $cabang->delete();
        return redirect()->route('cabangs.index')->with('success', 'Cabang deleted successfully.');
    }
}
