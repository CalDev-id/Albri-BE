<?php

namespace App\Http\Controllers\Admin;

use App\Models\PaketPrivate;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaketPrivateController extends Controller
{
    public function index()
    {
        $paketPrivates = PaketPrivate::all();
        return Inertia::render('Admin/Laporan/Private/Paket/Index', [
            'paketPrivates' => $paketPrivates
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Laporan/Private/Paket/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_paket' => 'required|string|max:255',
            'harga' => 'required|integer'
        ]);

        PaketPrivate::create($request->all());

        return redirect()->route('paketprivate.index');
    }

    public function edit(PaketPrivate $paketPrivate)
    {
        return Inertia::render('Admin/Laporan/Private/Paket/edit', [
            'paketPrivate' => $paketPrivate
        ]);
    }

    public function update(Request $request, PaketPrivate $paketPrivate)
    {
        $request->validate([
            'nama_paket' => 'required|string|max:255',
            'harga' => 'required|integer'
        ]);

        $paketPrivate->update($request->all());

        return redirect()->route('paketprivate.index');
    }

    public function destroy(PaketPrivate $paketPrivate)
    {
        $paketPrivate->delete();
        return redirect()->route('paketprivate.index');
    }
}
