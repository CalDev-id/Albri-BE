<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class LapPemasukanMitra extends Model
{
    use HasFactory;

    protected $table = 'lap_pemasukan_mitra';

    protected $fillable = [
        'created_by',
        'hari',
        'tanggal',
        'biaya_5000',
        'biaya_8000',
        'biaya_10000',
        'biaya_15000',
        'totalbiaya',
        'daftar',
        'modul',
        'kaos',
        'kas',
        'lainlain',
        'totalpemasukan',
    ];
    public function user()
{
    return $this->belongsTo(User::class, 'created_by');


}
}
