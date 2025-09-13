<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaketPrivate extends Model
{
    use HasFactory;

    protected $fillable = ['nama_paket', 'harga'];
}
