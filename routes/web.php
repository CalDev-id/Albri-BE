<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CabangController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MitraController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\AdminController;


use App\Http\Controllers\Auth\AuthenticatedSessionController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware('guest');
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth','web')->name('logout');



// Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
//     ->middleware('auth')
//     ->name('auth.login');



// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
//     Route::resource('users', UserController::class);
// });


// Route untuk Admin
Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'role:Admin'])->name('admin.dashboard');

 Route::get('/admin/dashboard', [AdminController::class, 'index'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.dashboard');

// Route::get('/admin/user', [AdminController::class, 'showuser'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.user');

// Route::get('/admin/dashboard', [MitraController::class, 'showadmin'])
//     ->middleware(['auth', 'role:Admin']) // Pastikan hanya admin yang bisa mengakses
//     ->name('admin.dashboard');








// Route untuk Guru
Route::get('/guru/dashboard', function () {
    return Inertia::render('Guru/Dashboard');
})->middleware(['auth', 'role:Guru'])->name('guru.dashboard');

Route::get('guru/dashboard', [GuruController::class, 'index'])
    ->middleware(['auth', 'role:Guru'])
    ->name('guru.dashboard');

// Route untuk Private
Route::get('/private/dashboard', function () {
    return Inertia::render('Private/Dashboard');
})->middleware(['auth', 'role:Private'])->name('Private.Dashboard');

// Route untuk Mitra
Route::get('/mitra/dashboard', [MitraController::class, 'index'])
    ->middleware(['auth', 'role:Mitra'])
    ->name('Mitra.Dashboard');

Route::get('/mitra/create', [MitraController::class, 'create'])
    ->middleware(['auth',  'role:Admin|Mitra'])
    ->name('Mitra.Create');

Route::post('/mitras', [MitraController::class, 'store'])
    ->middleware(['auth', 'role:Admin|Mitra'])
    ->name('Mitra.Store');

    Route::delete('/mitras/{id}', [MitraController::class, 'destroy'])
    ->middleware(['auth', 'role:Mitra|Admin'])
    ->name('mitra.destroy');

Route::get('/mitra/{id}/edit', [MitraController::class, 'edit'])
    ->middleware(['auth', 'role:Mitra|Admin'])
    ->name('Mitra.Edit');

    Route::put('/mitra/{id}', [MitraController::class, 'update'])
    ->middleware(['auth', 'role:Mitra|Admin'])
    ->name('mitra.update'); // Ubah jadi lowercase










Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::resource('cabangs', CabangController::class);

    // Route::get('/users', function(){
    //     return Inertia::render('Users/UsersPage');
    // });
    Route::get('/laporan', function () {
        return Inertia::render('Laporan/LaporanPage');
    });
});





// Route::get('/users', function () {

Route::group(['middleware' => ['auth']], function () {
    Route::resource('roles', RoleController::class)->middleware('role:Admin');

    // Route for displaying the list of users
    Route::get('users', [App\Http\Controllers\UserController::class, 'index'])
        ->name('users.index')
        ->middleware('auth', 'verified',);

    // Route for displaying the form to create a new user
    Route::get('users/create', [App\Http\Controllers\UserController::class, 'create'])
        ->name('users.create')
        ->middleware('auth', 'verified', 'role:Admin');

    // Route for storing a newly created user
    Route::post('users', [App\Http\Controllers\UserController::class, 'store'])
        ->name('users.store')
        ->middleware('auth', 'verified', 'role:Admin');

    // Route for displaying a specific user
    Route::get('users/{id}', [App\Http\Controllers\UserController::class, 'show'])
        ->name('users.show')
        ->middleware('auth', 'verified', 'role:Admin');

    // Route for displaying the form to edit an existing user
    Route::get('users/{id}/edit', [App\Http\Controllers\UserController::class, 'edit'])
        ->name('users.edit')
        ->middleware('auth', 'verified', 'role:Admin');

    // Route for updating an existing user
    Route::put('users/{id}', [App\Http\Controllers\UserController::class, 'update'])
        ->name('users.update')
        ->middleware('auth', 'verified', 'role:Admin');

    // Route for deleting a user
    Route::delete('users/{id}', [App\Http\Controllers\UserController::class, 'destroy'])
        ->name('users.destroy')
        ->middleware('auth', 'verified', 'role:Admin');
});
Route::get('/home', function () {
    return Inertia::render('Home');
});

// Route::resource('cabangs', CabangController::class);


require __DIR__ . '/auth.php';
