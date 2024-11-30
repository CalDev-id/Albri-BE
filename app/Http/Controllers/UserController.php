<?php
    
namespace App\Http\Controllers;
    
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use DB;
use Hash;
use Illuminate\Support\Arr;
    use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userData = User::with('roles')->latest()->paginate(10); 

        $mitraData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Mitra');
        })->with(['roles' => function ($query) {
            $query->where('name', 'Mitra');
        }])
        ->latest()
        ->paginate(5, ['*'], 'mitraPage'); // pagination untuk mitra

        // guru data
        $guruData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Guru');
        })
        ->with(['roles' => function ($query) {
            $query->where('name', 'Guru');
        }])
        ->latest()
        ->paginate(5, ['*'], 'guruPage');

        // private data 
        $privateData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Private');
        })->with(['roles' => function ($query) {
            $query->where('name', 'Private');
        }])
        ->latest()
        ->paginate(5, ['*'], 'privatePage'); // pagination untuk private

        // admin data
        $adminData = User::whereHas('roles', function ($query) {
            $query->where('name', 'Admin');
        })->with(['roles' => function ($query) {
            $query->where('name', 'Admin');
        }])->latest()->paginate(5, ['*'], 'adminPage'); // pagination untuk admin


  
        return Inertia::render('Admin/Users/index', [
            'userData' => $userData,
            'mitraData' => $mitraData,
            'guruData' => $guruData,
            'privateData' => $privateData,
            'adminData' => $adminData,
        ]);
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = Role::pluck('name','name')->all();

        return Inertia::render('Admin/Users/create', [
            'roles' => $roles,
        ]);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
            'roles' => 'required'
        ]);
    
        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
    
        $user = User::create($input);
        $user->assignRole($request->input('roles'));

        
    
        // Redirect dengan Inertia::location untuk refresh halaman penuh
        return Inertia::location('/admin/users');
    }
    
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): View
    {
        $user = User::find($id);

        return view('users.show',compact('user'));
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);  // Menggunakan findOrFail agar memberikan error jika user tidak ditemukan
        $roles = Role::all(['id', 'name']);  // Ambil role dengan id dan name
        $userRole = $user->roles->pluck('id')->toArray();  // Hanya mengambil id dari role user
    
        return Inertia::render('Admin/Users/edit', [
            'user' => $user,
            'roles' => $roles,
            'userRole' => $userRole,  // Mengirim array user role
        ]);
    }
    
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id): RedirectResponse
    {
        // Validasi input
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|min:8', // Password optional
            'roles' => 'required|array' // Validasi roles sebagai array
        ]);
    
        // Mengambil input data kecuali password jika kosong
        $input = $request->except(['password']);
        if (!empty($request->password)) {
            $input['password'] = Hash::make($request->password);
        }
    
        // Update data user
        $user = User::findOrFail($id);
        $user->update($input);
    
        // Hapus roles yang lama dan assign role baru
        $user->roles()->sync($request->roles);
    
        // Redirect dengan Inertia::location untuk refresh halaman penuh
        return redirect()->route('admin.users'); // Pastikan route ini sesuai dengan halaman yang Anda inginkan
    }
    
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): RedirectResponse
    {
        User::find($id)->delete();
        return redirect()->route('admin.users'); // Pastikan route ini sesuai dengan halaman yang Anda inginkan
    }
}
