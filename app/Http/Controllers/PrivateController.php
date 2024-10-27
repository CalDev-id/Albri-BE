<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class PrivateController extends Controller
{
    public function index()
    {
        $privateData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Private');
        })->with(['roles' => function ($query) {
            $query->where('name', 'Private');
        }])->latest()
            ->paginate(5, ['*'], 'privatePage');

        // Kirim data guru ke tampilan Inertia
        return Inertia::render('Private/Dashboard', [
            'privateData' => $privateData
        ]);
    }
}
