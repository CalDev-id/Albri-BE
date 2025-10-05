<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cabangalbri;
use App\Models\User;

class LapPengeluaranCabang extends Model
{
    use HasFactory;

    protected $table = 'lap_pengeluaran_cabang';

    protected $fillable = [
        'created_by',
        'hari',
        'tanggal',
        'cabang_id',
        'guru_id',
        'gaji',
        'atk',
        'sewa',
        'intensif',
        'lisensi',
        'thr',
        'lainlain',
        'totalpengeluaran',

    ];
    public function cabang()
    {
        return $this->belongsTo(CabangAlbri::class, 'cabang_id');
    }
    public function user()
    {

        return $this->belongsTo(User::class, 'guru_id');
    }
    public function gurus()
    {
        return $this->hasMany(LaporanPengeluaranGuru::class, 'lap_pengeluaran_id');
    }


}
