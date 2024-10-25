<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Contracts\View\View;




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
        


        return Inertia::render('Admin/Dashboard', [
            'mitraData' => $mitraData,
            'userData' => $userData,
        ]);
    }

    public function showuser()
    {
        $datauser = User::whereHas('roles', function ($query) {
            $query->where('name', 'User');
        })
        ->latest()
        ->paginate(5);
    
        // Debugging: check what is actually being sent
    
        return Inertia::render('Admin/Dashboard', [
            'data' => $datauser,
        ]);
    }
    
}
