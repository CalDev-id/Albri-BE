<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        try {
            $request->authenticate();

            $request->session()->regenerate();

            $user = Auth::user();

            Log::info('User logged in successfully: ' . $user->email);

            // Cek role user dan arahkan ke dashboard yang sesuai
            if ($user->hasRole('Admin')) {
                return redirect()->route('admin.dashboard');
            } elseif ($user->hasRole('Guru')) {
                return redirect()->route('guru.dashboard');
            } elseif ($user->hasRole('Private')) {
                return redirect()->route('private.dashboard');
            } elseif ($user->hasRole('Mitra')) {
                return redirect()->route('mitra.dashboard');
            }

            // Jika user tidak punya role khusus, arahkan ke dashboard umum
            return redirect()->route('dashboard');

        } catch (ValidationException $e) {
            Log::warning('Login attempt failed: ' . $request->email);
            
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->onlyInput('email');
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        Log::info('User logged out and session invalidated.');

        
        return redirect('login')->with('success', 'You have been logged out.');    
    
    }
}
