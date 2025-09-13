<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporanPengeluaranGuru extends Model
{
    protected $table = 'laporan_pengeluaran_guru';
    protected $fillable = ['lap_pengeluaran_id', 'guru_nama', 'gaji'];

    public function pengeluaran()
    {
        return $this->belongsTo(LapPengeluaranCabang::class, 'lap_pengeluaran_id');
    }
}
