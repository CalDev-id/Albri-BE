<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Paket extends Model
{
    use HasFactory;

    protected $fillable = ['nama_paket', 'harga'];

    public function laporans()
{
    return $this->belongsToMany(LapPemasukanCabang::class, 'laporan_paket', 'paket_id', 'laporan_id')
                ->withPivot('jumlah')
                ->withTimestamps();
}

}

    
