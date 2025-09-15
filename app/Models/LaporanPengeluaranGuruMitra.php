<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporanPengeluaranGuruMitra extends Model
{
    protected $table = 'laporan_pengeluaran_guru_mitra';
    protected $fillable = ['lap_pengeluaran_mitra_id', 'mitra_nama', 'gaji'];

    public function pengeluaran()
    {
        return $this->belongsTo(LapPengeluaranMitra::class, 'lap_pengeluaran_mitra_id');
    }
}
