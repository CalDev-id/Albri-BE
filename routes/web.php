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
use App\Http\Controllers\NewsEventController;


use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PrivateController;
use App\Http\Controllers\PublicNewsController;
use App\Http\Controllers\HomeController;
use Inertia\Inertia;

Route::get('/login', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware('guest');

Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth', 'web');






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
    ->middleware(['auth', 'role:Admin|Guru|Private|Mitra'])
    ->name('admin.users.update');

Route::delete('/admin/users/{id}', [UserController::class, 'destroy'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.users.destroy');

// Grouping untuk Cabang
// Route::prefix('admin/cabang')->middleware(['auth', 'role:Admin'])->name('admin.cabangs.')->group(function () {
//     Route::get('/', [CabangController::class, 'index'])->name('index');
//     Route::get('/create', [CabangController::class, 'create'])->name('create');
//     Route::post('/', [CabangController::class, 'store'])->name('store');
//     Route::get('/{id}/edit', [CabangController::class, 'edit'])->name('edit');
//     Route::put('/{id}', [CabangController::class, 'update'])->name('update');
//     Route::delete('/{id}', [CabangController::class, 'destroy'])->name('destroy');
// });

// // Grouping untuk Admin Pages
// Route::prefix('admin')->middleware(['auth', 'role:Admin'])->group(function () {
//     Route::get('/mitra', [AdminController::class, 'mitra'])->name('admin.mitra');
//     Route::get('/private', [AdminController::class, 'private'])->name('admin.private');
//     Route::get('/guru', [AdminController::class, 'guru'])->name('admin.guru');
// });

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
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.guru');

Route::prefix('admin/laporan')->middleware(['auth', 'role:Admin|Guru'])->group(function () {
    /* -----------------------------------------
                Laporan Cabang 
-------------------------------------------- */
    Route::prefix('cabang')->group(function () {
        Route::get('/', [AdminController::class, 'cabanglaporan'])->name('admin.laporan.cabang');
        Route::get('/create', [AdminController::class, 'createcabanglaporan'])->name('admin.laporan.create');
        Route::post('/store', [AdminController::class, 'storelaporancabang'])->name('admin.laporan.store');
        Route::get('/{id}/edit', [AdminController::class, 'editlaporancabang'])->name('admin.laporan.cabang.show');
        Route::put('/{id}', [AdminController::class, 'updatelaporancabang'])->name('admin.laporan.cabang.update');
        Route::delete('/{id}', [AdminController::class, 'destroylaporancabang'])->name('admin.laporan.cabang.destroy');
        Route::post('/bulk-delete', [AdminController::class, 'bulkDestroyCabang'])->name('admin.laporan.cabang.bulk-delete');
    });
    /* -----------------------------------------
                    Pengeluaran Cabang 
    -------------------------------------------- */
    Route::prefix('pengeluaran')->group(function () {
        Route::get('/create', [AdminController::class, 'createcabanpengeluaranlaporan'])->name('admin.laporan.pengeluaran.cabang.create');
        Route::post('/store', [AdminController::class, 'storelaporanpengeluaran'])->name('admin.laporan.pengeluaran.cabang.store');
        Route::get('/{id}/edit', [AdminController::class, 'editpengeluarancabang'])->name('admin.laporan.pengeluaran.cabang.show');
        Route::put('/{id}', [AdminController::class, 'updatepengeluarancabang'])->name('admin.laporan.pengeluaran.cabang.update');
        Route::delete('/{id}', [AdminController::class, 'destroypengeluarancabang'])->name('admin.laporan.pengeluaran.cabang.destroy');
        Route::post('/bulk-delete', [AdminController::class, 'bulkDestroyPengeluaranCabang'])->name('admin.laporan.pengeluaran.cabang.bulk-delete');
    });
});
/* -----------------------------------------
                Laporan Pemasukan Mitra 
-------------------------------------------- */
Route::middleware(['auth', 'role:Admin|Mitra'])->group(function () {
    Route::get('/admin/laporan/mitra', [AdminController::class, 'mitralaporan'])->name('admin.laporan.mitra');
    Route::get('/admin/laporan/mitra/create', [AdminController::class, 'createmitralaporan'])->name('admin.laporan.mitra.create');
    Route::post('/admin/laporan/mitra/store', [AdminController::class, 'storelaporanmitra'])->name('admin.laporan.mitra.store');
    Route::get('/admin/laporan/mitra/{id}/edit', [AdminController::class, 'editlaporanmitra'])->name('admin.laporan.mitra.show');
    Route::put('/admin/laporan/mitra/{id}', [AdminController::class, 'updatelaporanmitra'])->name('admin.laporan.mitra.update');
    Route::delete('/admin/laporan/mitra/{id}', [AdminController::class, 'destroylaporanmitra'])->name('admin.laporan.mitra.destroy');
    Route::post('/admin/laporan/mitra/bulk-delete', [AdminController::class, 'bulkDestroyMitra'])->name('admin.laporan.mitra.bulk-delete');

    // Setting Harga Paket Mitra
    Route::get('/admin/laporan/mitra/setting-harga', [AdminController::class, 'settingHargaMitra'])->name('admin.laporan.mitra.setting-harga');
    Route::get('/admin/laporan/mitra/setting-harga/create', [AdminController::class, 'createPaketMitra'])->name('admin.laporan.mitra.paket.create');
    Route::post('/admin/laporan/mitra/setting-harga/store', [AdminController::class, 'storePaketMitra'])->name('admin.laporan.mitra.paket.store');
    Route::get('/admin/laporan/mitra/setting-harga/{id}/edit', [AdminController::class, 'editPaketMitra'])->name('admin.laporan.mitra.paket.edit');
    Route::put('/admin/laporan/mitra/setting-harga/{id}', [AdminController::class, 'updatePaketMitra'])->name('admin.laporan.mitra.paket.update');
    Route::delete('/admin/laporan/mitra/setting-harga/{id}', [AdminController::class, 'destroyPaketMitra'])->name('admin.laporan.mitra.paket.destroy');
});
/* -----------------------------------------
                Laporan Pengeluaran Mitra 
-------------------------------------------- */
Route::middleware(['auth', 'role:Admin|Mitra'])->group(function () {
    Route::get('/admin/laporan/pengeluaranmitra/create', [AdminController::class, 'createpengeluaranmitralaporan'])->name('admin.laporan.pengeluaran.mitra.create');
    Route::post('/admin/laporan/pengeluaranmitra/store', [AdminController::class, 'storelaporanpengeluaranmitra'])->name('admin.laporan.pengeluaran.mitra.store');
    Route::get('/admin/laporan/pengeluaranmitra/{id}/edit', [AdminController::class, 'editpengeluaranmitra'])->name('admin.laporan.pengeluaran.mitra.show');
    Route::put('/admin/laporan/pengeluaranmitra/{id}', [AdminController::class, 'updatepengeluaranmitra'])->name('admin.laporan.pengeluaran.mitra.update');
    Route::delete('/admin/laporan/pengeluaranmitra/{id}', [AdminController::class, 'destroypengeluaranmitra'])->name('admin.laporan.pengeluaran.mitra.destroy');
    Route::post('/admin/laporan/pengeluaranmitra/bulk-delete', [AdminController::class, 'bulkDestroyPengeluaranMitra'])->name('admin.laporan.pengeluaran.mitra.bulk-delete');
});
/* -----------------------------------------
                Laporan Private 
-------------------------------------------- */
Route::prefix('admin/laporan')->middleware(['auth', 'role:Admin|Private'])->group(function () {
    // Laporan Private
    Route::prefix('private')->group(function () {
        Route::get('/', [AdminController::class, 'privatelaporan'])->name('admin.laporan.private');
        Route::get('/create', [AdminController::class, 'createprivate'])->name('admin.laporan.private.create');
        Route::post('/store', [AdminController::class, 'storelaporanprivate'])->name('admin.laporan.private.store');
        Route::get('/{id}/edit', [AdminController::class, 'editlaporanprivate'])->name('admin.laporan.private.show');
        Route::put('/{id}', [AdminController::class, 'updatelaporanprivate'])->name('admin.laporan.private.update');
        Route::delete('/{id}', [AdminController::class, 'destroylaporanprivate'])->name('admin.laporan.private.destroy');
        Route::post('/bulk-delete', [AdminController::class, 'bulkDestroyPrivate'])->name('admin.laporan.private.bulk-delete');
    });
    /* -----------------------------------------
                    Pengeluaran Private 
    -------------------------------------------- */
    Route::prefix('pengeluaranprivate')->group(function () {
        Route::get('/create', [AdminController::class, 'createpengeluaranprivatelaporan'])->name('admin.laporan.pengeluaran.private.create');
        Route::post('/store', [AdminController::class, 'storelaporanpengeluaranprivate'])->name('admin.laporan.pengeluaran.private.store');
        Route::get('/{id}/edit', [AdminController::class, 'editpengeluaranprivate'])->name('admin.laporan.pengeluaran.private.edit');
        Route::put('/{id}', [AdminController::class, 'updatepengeluaranprivate'])->name('admin.laporan.pengeluaran.private.update');
        Route::delete('/{id}', [AdminController::class, 'destroypengeluaranprivate'])->name('admin.laporan.pengeluaran.private.destroy');
        Route::post('/bulk-delete', [AdminController::class, 'bulkDestroyPengeluaranPrivate'])->name('admin.laporan.pengeluaran.private.bulk-delete');
    });
});
/* -----------------------------------------
    Rekap Bulanan 
-------------------------------------------- */
Route::prefix('rekap')->middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/cabang', [AdminController::class, 'rekapcabang'])->name('admin.rekap.cabang');
    Route::get('/mitra', [AdminController::class, 'rekapmitra'])->name('admin.rekap.mitra');
    Route::get('/private', [AdminController::class, 'rekapprivate'])->name('admin.rekap.private');
});

// Route Paket Harga Cabang
Route::prefix('admin/laporan/cabang/paket')->middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\PaketController::class, 'index'])->name('paket.index');
    Route::get('/create', [App\Http\Controllers\Admin\PaketController::class, 'create'])->name('paket.create');
    Route::post('/', [App\Http\Controllers\Admin\PaketController::class, 'store'])->name('paket.store');
    Route::get('/{paket}/edit', [App\Http\Controllers\Admin\PaketController::class, 'edit'])->name('paket.edit');
    Route::put('/{paket}', [App\Http\Controllers\Admin\PaketController::class, 'update'])->name('paket.update');
    Route::delete('/{paket}', [App\Http\Controllers\Admin\PaketController::class, 'destroy'])->name('paket.destroy');
});

// Route Paket Harga Private
Route::prefix('admin/laporan/private/paket')->middleware(['auth', 'role:Admin|Private'])->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\PaketPrivateController::class, 'index'])->name('paketprivate.index');
    Route::get('/create', [App\Http\Controllers\Admin\PaketPrivateController::class, 'create'])->name('paketprivate.create');
    Route::post('/', [App\Http\Controllers\Admin\PaketPrivateController::class, 'store'])->name('paketprivate.store');
    Route::get('/{paketPrivate}/edit', [App\Http\Controllers\Admin\PaketPrivateController::class, 'edit'])->name('paketprivate.edit');
    Route::put('/{paketPrivate}', [App\Http\Controllers\Admin\PaketPrivateController::class, 'update'])->name('paketprivate.update');
    Route::delete('/{paketPrivate}', [App\Http\Controllers\Admin\PaketPrivateController::class, 'destroy'])->name('paketprivate.destroy');
});
/* -----------------------------------------
                Settings 
-------------------------------------------- */
Route::get('/admin/settings', [AdminController::class, 'settings'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.settings');

Route::get('/mitra/settings', [AdminController::class, 'settings'])
    ->middleware(['auth', 'role:Mitra'])
    ->name('mitra.settings');

Route::get('/guru/settings', [AdminController::class, 'settings'])
    ->middleware(['auth', 'role:Guru'])
    ->name('guru.settings');

Route::get('/private/settings', [AdminController::class, 'settings'])
    ->middleware(['auth', 'role:Private'])
    ->name('private.settings');
Route::patch('/admin/settings', [AdminController::class, 'update'])
    ->middleware(['auth', 'role:Admin|Guru|Private|Mitra'])
    ->name('admin.settings.update');





/* -----------------------------------------
                dashboard role 
-------------------------------------------- */
Route::get('guru/dashboard', [GuruController::class, 'index'])
    ->middleware(['auth', 'role:Guru'])
    ->name('guru.dashboard');
// Route untuk Private
Route::get('/private/dashboard', [PrivateController::class, 'index'])
    ->middleware(['auth', 'role:Private'])
    ->name('private.dashboard');
// Route untuk Mitra
Route::get('/mitra/dashboard', [MitraController::class, 'index'])
    ->middleware(['auth', 'role:Mitra'])
    ->name('mitra.dashboard');
Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'role:Admin'])->name('admin.dashboard');

Route::get('/admin/dashboard', [AdminController::class, 'index'])
    ->middleware(['auth', 'role:Admin'])
    ->name('admin.dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    Route::get('/laporan', function () {
        return Inertia::render('Laporan/LaporanPage');
    });
});


Route::get('/', [HomeController::class, 'index']);

// Public News Events Routes
Route::get('/berita-acara', [PublicNewsController::class, 'index'])->name('public.news-events.index');
Route::get('/berita-acara/{slug}', [PublicNewsController::class, 'show'])->name('public.news-events.show');

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




// Laporan Pemasukan Private Admin

// Route::get('/admin/laporan/private', [AdminController::class, 'privatelaporan'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.private');
// Route::get('/admin/laporan/private/create', [AdminController::class, 'createprivate'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.create');
// Route::post('/admin/laporan/private/store', [AdminController::class, 'storelaporanprivate'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.private.store');
// Route::get('/admin/laporan/private/{id}/edit', [AdminController::class, 'editlaporanprivate'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.show');
// Route::put('/admin/laporan/private/{id}', [AdminController::class, 'updatelaporanprivate'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.update');
// Route::delete('/admin/laporan/private/{id}', [AdminController::class, 'destroylaporanprivate'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.destroy');

// // Laporan Pengeluaran Private Admin
// Route::get('/admin/laporan/pengeluaranprivate/create', [AdminController::class, 'createpengeluaranprivatelaporan'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.pengeluaran.create');
// Route::post('/admin/laporan/pengeluaranprivate/store', [AdminController::class, 'storelaporanpengeluaranprivate'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.pengeluaran.store');
// Route::get('admin/laporan/pengeluaranprivate/{id}/edit', [AdminController::class, 'editpengeluaranprivate'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.pengeluaran.edit');
// Route::put('/admin/laporan/pengeluaranprivate/{id}', [AdminController::class, 'updatepengeluaranprivate'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.pengeluaran.update');
// Route::delete('/admin/laporan/pengeluaranprivate/{id}', [AdminController::class, 'destroypengeluaranprivate'])
//     ->middleware(['auth', 'role:Admin|Private'])
//     ->name('admin.laporan.pengeluaran.destroy');


// // Laporan Cabang Admin
// Route::get('/admin/laporan/cabang', [AdminController::class, 'cabanglaporan'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.cabang');
// Route::get('/admin/laporan/cabang/create', [AdminController::class, 'createcabanglaporan'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.create');
// Route::post('/admin/laporan/cabang/store', [AdminController::class, 'storelaporancabang'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.store');
// Route::get('/admin/laporan/cabang/{id}/edit', [AdminController::class, 'editlaporancabang'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.show');
// Route::put('/admin/laporan/cabang/{id}', [AdminController::class, 'updatelaporancabang'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.update');
// Route::delete('/admin/laporan/cabang/{id}', [AdminController::class, 'destroylaporancabang'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.destroy');

// // Laporan Pengeluaran Cabang Admin
// Route::get('/admin/laporan/pengeluaran/create', [AdminController::class, 'createcabanpengeluaranlaporan'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.create');
// Route::post('/admin/laporan/pengeluaran/store', [AdminController::class, 'storelaporanpengeluaran'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.store');
// Route::get('/admin/laporan/pengeluaran/{id}/edit', [AdminController::class, 'editpengeluarancabang'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.show');
// Route::put('/admin/laporan/pengeluaran/{id}', [AdminController::class, 'updatepengeluarancabang'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.update');
// Route::delete('/admin/laporan/pengeluaran/{id}', [AdminController::class, 'destroypengeluarancabang'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.destroy');



// // Laporan Pemasukan Mitra Admin
// Route::get('/admin/laporan/mitra', [AdminController::class, 'mitralaporan'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.mitra');
// Route::get('/admin/laporan/mitra/create', [AdminController::class, 'createmitralaporan'])
//     ->middleware(['auth', 'role:Admin|Mitra'])
//     ->name('admin.laporan.create');
// Route::post('/admin/laporan/mitra/store', [AdminController::class, 'storelaporanmitra'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.mitra.store');
// Route::get('/admin/laporan/mitra/{id}/edit', [AdminController::class, 'editlaporanmitra'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.show');
// Route::put('/admin/laporan/mitra/{id}', [AdminController::class, 'updatelaporanmitra'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.update');
// Route::delete('/admin/laporan/mitra/{id}', [AdminController::class, 'destroylaporanmitra'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.destroy');

// // Laporan Pengeluaran Mitra Admin
// Route::get('/admin/laporan/pengeluaranmitra/create', [AdminController::class, 'createpengeluaranmitralaporan'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.create');
// Route::post('/admin/laporan/pengeluaranmitra/store', [AdminController::class, 'storelaporanpengeluaranmitra'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.store');
// Route::get('/admin/laporan/pengeluaranmitra/{id}/edit', [AdminController::class, 'editpengeluaranmitra'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.show');
// Route::put('/admin/laporan/pengeluaranmitra/{id}', [AdminController::class, 'updatepengeluaranmitra'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.update');
// Route::delete('/admin/laporan/pengeluaranmitra/{id}', [AdminController::class, 'destroypengeluaranmitra'])
//     ->middleware(['auth', 'role:Admin'])
//     ->name('admin.laporan.pengeluaran.destroy');

// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
//     Route::resource('users', UserController::class);
// });



// Route::resource('cabangs', CabangController::class);

/* -----------------------------------------
                News Events Management (Admin Only)
-------------------------------------------- */
Route::prefix('admin/news-events')->middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/', [App\Http\Controllers\NewsEventController::class, 'index'])->name('admin.news-events.index');
    Route::get('/create', [App\Http\Controllers\NewsEventController::class, 'create'])->name('admin.news-events.create');
    Route::post('/', [App\Http\Controllers\NewsEventController::class, 'store'])->name('admin.news-events.store');
    Route::get('/{newsEvent}', [App\Http\Controllers\NewsEventController::class, 'show'])->name('admin.news-events.show');
    Route::get('/{newsEvent}/edit', [App\Http\Controllers\NewsEventController::class, 'edit'])->name('admin.news-events.edit');
    Route::put('/{newsEvent}', [App\Http\Controllers\NewsEventController::class, 'update'])->name('admin.news-events.update');
    Route::delete('/{newsEvent}', [App\Http\Controllers\NewsEventController::class, 'destroy'])->name('admin.news-events.destroy');
});

/* -----------------------------------------
                Gaji Guru Management
-------------------------------------------- */
Route::prefix('gaji')->middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('/guru', [App\Http\Controllers\GajiGuruController::class, 'index'])->name('gaji.guru.index');
    Route::get('/guru/weekly', [App\Http\Controllers\GajiGuruController::class, 'weeklyReport'])->name('gaji.guru.weekly');
    Route::get('/guru/monthly', [App\Http\Controllers\GajiGuruController::class, 'monthlyReport'])->name('gaji.guru.monthly');
    Route::get('/guru/export-excel', [App\Http\Controllers\GajiGuruController::class, 'exportExcel'])->name('gaji.guru.export-excel');
    Route::get('/guru/export-pdf', [App\Http\Controllers\GajiGuruController::class, 'exportPdf'])->name('gaji.guru.export-pdf');
    Route::get('/guru/monthly/export/excel', [App\Http\Controllers\GajiGuruController::class, 'exportMonthlyExcel'])->name('gaji.guru.monthly.export.excel');
    Route::get('/guru/monthly/export/pdf', [App\Http\Controllers\GajiGuruController::class, 'exportMonthlyPdf'])->name('gaji.guru.monthly.export.pdf');
});

require __DIR__ . '/auth.php';
