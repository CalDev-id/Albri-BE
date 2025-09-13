<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LapPengeluaranMitra extends Model
{
    use HasFactory;

    protected $table = 'lap_pengeluaran_mitra';

    protected $fillable = [
        'created_by',
        'hari',
        'tanggal',
        'atk',
        'intensif',
        'lisensi',
        'lainlain',
        'totalpengeluaran',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function mitras()
    {
        return $this->hasMany(LaporanPengeluaranMitraDet::class, 'lap_pengeluaran_mitra_id');
    }
}
