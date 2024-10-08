<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cabang extends Model
{
    use HasFactory;
    
        // Tentukan nama tabel jika berbeda dari pluralisasi model secara otomatis
        protected $table = 'cabangs'; 

        // Tentukan kolom-kolom yang bisa diisi secara massal (mass assignment)
        protected $fillable = [
            'nama',
            'pengeluaran',
            'pendapatan',
            'jumlah_murid',
        ];
}
