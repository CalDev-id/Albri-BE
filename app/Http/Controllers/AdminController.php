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
        ->with(['roles' => function ($query) {
            $query->where('name', 'Guru');
        }])
        ->latest()
        ->paginate(5, ['*'], 'guruPage');

        


        return Inertia::render('Admin/Dashboard', [
            'mitraData' => $mitraData,
            'userData' => $userData,
            'guruData' => $guruData,
        ]);
    }

    public function mitra()
    {
        $mitraData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Mitra');
        })->with(['roles' => function ($query) {
            $query->where('name', 'Mitra');
        }])
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
        })->with(['roles' => function ($query) {
            $query->where('name', 'Private');
        }])
        ->latest()
        ->paginate(5, ['*'], 'privatePage'); // pagination untuk private
        return Inertia::render('Admin/Privat', [
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

        return Redirect::route('admin.settings');
    }
}
