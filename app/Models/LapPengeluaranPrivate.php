<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LapPengeluaranPrivate extends Model
{
    use HasFactory;

    protected $table = 'lap_pengeluaran_private';

    protected $fillable = [
        'created_by',
        'hari',
        'tanggal',
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

    public function user(){

        return $this->belongsTo(User::class, 'guru_id');
    }
}
