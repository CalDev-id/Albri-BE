<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LapPemasukanCabang;
use App\Models\LapPengeluaranCabang;

class CabangAlbri extends Model
{
    use HasFactory;

    protected $table = 'cabangalbris';
    protected $fillable = ['nama'];

    public function lapPemasukanCabang()
    {
        return $this->hasMany(LapPemasukanCabang::class, 'cabang_id');
    }

    public function lapPengeluaranCabang()
    {
        return $this->hasMany(LapPengeluaranCabang::class, 'cabang_id');
    }
}
