<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LapPemasukanPrivate extends Model
{
    use HasFactory;

    protected $table = 'lap_pemasukan_private';

    protected $fillable = [
        'created_by',
        'hari',
        'tanggal',
        'biaya_30',
        'biaya_35',
        'biaya_40',
        'biaya_45',
        'totalbiaya',
        'daftar',
        'modul',
        'kaos',
        'kas',
        'lainlain',
        'totalpemasukan',
    ];
}
