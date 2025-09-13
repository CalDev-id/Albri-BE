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
        'gurus', // JSON field for multiple gurus
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

    protected $casts = [
        'gurus' => 'array', // Automatically cast JSON to array
    ];

    public function user()
    {

        return $this->belongsTo(User::class, 'guru_id');
    }
}
