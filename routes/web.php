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

Route::get('/login', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware('guest');
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth', 'web')->name('logout');




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

// Admin Controll Users
Route::get('/admin/users', [UserController::class, 'index'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.users');

Route::get('/admin/users/create', [UserController::class, 'create'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.users.create');

Route::post('/admin/users', [UserController::class, 'store'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.users.store');

Route::get('/admin/users/{id}', [UserController::class, 'show'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.users.show');

Route::get('/admin/users/{id}/edit', [UserController::class, 'edit'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.users.edit');

Route::put('/admin/users/{id}', [UserController::class, 'update'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.users.update');

Route::delete('/admin/users/{id}', [UserController::class, 'destroy'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.users.destroy');


// Admin Controll Cabanggit
Route::get('/admin/cabangs', [CabangController::class, 'index'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.cabangs');
Route::get('/admin/cabang/create', [CabangController::class, 'create'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.cabangs.create');

Route::post('/admin/cabang', [CabangController::class, 'store'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.cabangs.store');

Route::get('/admin/cabang/{id}/edit', [CabangController::class, 'edit'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.cabangs.edit');
Route::put('/admin/cabang/{id}', [CabangController::class, 'update'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.cabangs.update');
Route::delete('/admin/cabang/{id}', [CabangController::class, 'destroy'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.cabangs.destroy');


Route::get('/admin/mitra', [AdminController::class, 'mitra'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.mitra');
Route::get('/admin/private', [AdminController::class, 'private'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.private');
Route::get('/admin/guru', [AdminController::class, 'guru'])
    ->middleware(['auth','role:Admin'])
    ->name('admin.guru');

Route::get('/admin/settings', [AdminController::class, 'settings'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.settings');
Route::patch('/admin/settings', [AdminController::class, 'update'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.settings.update');

// Laporan Cabang Admin
Route::get('/admin/laporan/cabang', [AdminController::class, 'cabanglaporan'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.cabang');
Route::get('/admin/laporan/cabang/create', [AdminController::class, 'createcabanglaporan'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.create');
Route::post('/admin/laporan/cabang/store', [AdminController::class, 'storelaporancabang'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.store');
Route::get('/admin/laporan/cabang/{id}/edit', [AdminController::class, 'editlaporancabang'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.show');
Route::put('/admin/laporan/cabang/{id}', [AdminController::class, 'updatelaporancabang'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.update');
Route::delete('/admin/laporan/cabang/{id}', [AdminController::class, 'destroylaporancabang'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.destroy');

// Laporan Pengeluaran Cabang Admin
Route::get('/admin/laporan/pengeluaran/create', [AdminController::class, 'createcabanpengeluaranlaporan'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.create');
Route::post('/admin/laporan/pengeluaran/store', [AdminController::class, 'storelaporanpengeluaran'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.store');
Route::get('/admin/laporan/pengeluaran/{id}/edit', [AdminController::class, 'editpengeluarancabang'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.show');
Route::put('/admin/laporan/pengeluaran/{id}', [AdminController::class, 'updatepengeluarancabang'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.update');
Route::delete('/admin/laporan/pengeluaran/{id}', [AdminController::class, 'destroypengeluarancabang'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.destroy');



// Laporan Pemasukan Mitra Admin
Route::get('/admin/laporan/mitra', [AdminController::class, 'mitralaporan'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.mitra');
Route::get('/admin/laporan/mitra/create', [AdminController::class, 'createmitralaporan'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.create');
Route::post('/admin/laporan/mitra/store', [AdminController::class, 'storelaporanmitra'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.mitra.store');
Route::get('/admin/laporan/mitra/{id}/edit', [AdminController::class, 'editlaporanmitra'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.show');
Route::put('/admin/laporan/mitra/{id}', [AdminController::class, 'updatelaporanmitra'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.update');
Route::delete('/admin/laporan/mitra/{id}', [AdminController::class, 'destroylaporanmitra'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.destroy');

// Laporan Pengeluaran Mitra Admin
Route::get('/admin/laporan/pengeluaranmitra/create', [AdminController::class, 'createpengeluaranmitralaporan'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.create');
Route::post('/admin/laporan/pengeluaranmitra/store', [AdminController::class, 'storelaporanpengeluaranmitra'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.store');
Route::get('/admin/laporan/pengeluaranmitra/{id}/edit', [AdminController::class, 'editpengeluaranmitra'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.show');
Route::put('/admin/laporan/pengeluaranmitra/{id}', [AdminController::class, 'updatepengeluaranmitra'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.update');
Route::delete('/admin/laporan/pengeluaranmitra/{id}', [AdminController::class, 'destroypengeluaranmitra'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.destroy');




// Laporan Pemasukan Private Admin

Route::get('/admin/laporan/private', [AdminController::class, 'privatelaporan'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.private');
Route::get('/admin/laporan/private/create', [AdminController::class, 'createprivate'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.create');
Route::post('/admin/laporan/private/store', [AdminController::class, 'storelaporanprivate'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.private.store');
Route::get('/admin/laporan/private/{id}/edit', [AdminController::class, 'editlaporanprivate'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.show');
Route::put('/admin/laporan/private/{id}', [AdminController::class, 'updatelaporanprivate'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.update');
Route::delete('/admin/laporan/private/{id}', [AdminController::class, 'destroylaporanprivate'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.destroy');

// Laporan Pengeluaran Private Admin
Route::get('/admin/laporan/pengeluaranprivate/create', [AdminController::class, 'createpengeluaranprivatelaporan'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.create');
Route::post('/admin/laporan/pengeluaranprivate/store', [AdminController::class, 'storelaporanpengeluaranprivate'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.store');
Route::get('admin/laporan/pengeluaranprivate/{id}/edit', [AdminController::class, 'editpengeluaranprivate'])
    ->middleware(['auth','role:Admin'])
    ->name('admin.laporan.pengeluaran.edit');
Route::put('/admin/laporan/pengeluaranprivate/{id}', [AdminController::class, 'updatepengeluaranprivate'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.update');
Route::delete('/admin/laporan/pengeluaranprivate/{id}', [AdminController::class, 'destroypengeluaranprivate'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.laporan.pengeluaran.destroy');










Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    Route::get('/laporan', function () {
        return Inertia::render('Laporan/LaporanPage');
    });
});



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















// Route::get('/users', function () {

// Route::group(['middleware' => ['auth']], function () {
//     Route::resource('roles', RoleController::class)->middleware('role:Admin');

//     // Route for displaying the list of users
//     Route::get('users', [App\Http\Controllers\UserController::class, 'index'])
//         ->name('users.index')
//         ->middleware('auth', 'verified',);

//     // Route for displaying the form to create a new user
//     Route::get('users/create', [App\Http\Controllers\UserController::class, 'create'])
//         ->name('users.create')
//         ->middleware('auth', 'verified', 'role:Admin');

//     // Route for storing a newly created user
//     Route::post('users', [App\Http\Controllers\UserController::class, 'store'])
//         ->name('users.store')
//         ->middleware('auth', 'verified', 'role:Admin');

//     // Route for displaying a specific user
//     Route::get('users/{id}', [App\Http\Controllers\UserController::class, 'show'])
//         ->name('users.show')
//         ->middleware('auth', 'verified', 'role:Admin');

//     // Route for displaying the form to edit an existing user
//     Route::get('users/{id}/edit', [App\Http\Controllers\UserController::class, 'edit'])
//         ->name('users.edit')
//         ->middleware('auth', 'verified', 'role:Admin');

//     // Route for updating an existing user
//     Route::put('users/{id}', [App\Http\Controllers\UserController::class, 'update'])
//         ->name('users.update')
//         ->middleware('auth', 'verified', 'role:Admin');

//     // Route for deleting a user
//     Route::delete('users/{id}', [App\Http\Controllers\UserController::class, 'destroy'])
//         ->name('users.destroy')
//         ->middleware('auth', 'verified', 'role:Admin');
// });
// Route::get('/laporan', function () {
//     return Inertia::render('Laporan.La');
// });

Route::get('/', function () {
    return Inertia::render('Albri');
});

// Route::resource('cabangs', CabangController::class);


require __DIR__ . '/auth.php';
