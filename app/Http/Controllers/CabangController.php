<?php

namespace App\Http\Controllers;

use App\Models\Cabangalbri;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;


class CabangController extends Controller
{
    public function index()
    {
        $cabangs = Cabangalbri::all();
        return Inertia::render('Admin/Cabang/index', [
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
        Cabangalbri::find($id)->delete();
        return redirect()->route('admin.cabangs');
    }
}
