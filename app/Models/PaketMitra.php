<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaketMitra extends Model
{
    use HasFactory;

    protected $table = 'paket_mitra';

    protected $fillable = ['nama_paket', 'harga'];

    public function laporans()
    {
        return $this->belongsToMany(LapPemasukanMitra::class, 'laporan_paket_mitra', 'paket_mitra_id', 'laporan_mitra_id')
            ->withPivot('jumlah')
            ->withTimestamps();
    }
}
