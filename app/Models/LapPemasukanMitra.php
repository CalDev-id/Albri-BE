<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\PaketMitra;

class LapPemasukanMitra extends Model
{
    use HasFactory;

    protected $table = 'lap_pemasukan_mitra';

    protected $fillable = [
        'created_by',
        'hari',
        'tanggal',
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

    public function pakets()
    {
        return $this->belongsToMany(PaketMitra::class, 'laporan_paket_mitra', 'laporan_mitra_id', 'paket_mitra_id')
            ->withPivot('jumlah')
            ->withTimestamps();
    }
}
