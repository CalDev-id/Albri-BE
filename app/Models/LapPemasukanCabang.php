<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CabangAlbri;

class LapPemasukanCabang extends Model
{
    use HasFactory;

    protected $table = 'lap_pemasukan_cabang';

    protected $fillable = [
        'created_by',
        'hari',
        'tanggal',
        'cabang_id',
        'biaya_5000',
        'biaya_10000',
        'biaya_12000',
        'totalbiaya',
        'daftar',
        'modul',
        'kaos',
        'kas',
        'lainlain',
        'totalpemasukan',
    ];

    // Relasi Many-to-One dengan CabangAlbris
// LapPemasukanCabang.php
public function cabang()
{
    return $this->belongsTo(CabangAlbri::class, 'cabang_id');
}


}
