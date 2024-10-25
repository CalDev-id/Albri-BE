<?php
  
namespace Database\Seeders;
  
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
  
class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
           'role-list',
           'role-create',
           'role-edit',
           'role-delete',
   
           'manage_users',
            'manage_branches',
            'manage_partners',
            'manage_privates',
            'manage_reports',
        ];
        
        foreach ($permissions as $permission) {
             Permission::create(['name' => $permission]);
        }
    }
}
