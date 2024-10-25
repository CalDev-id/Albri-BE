<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Private_bimble extends Model
{
    use HasFactory;
    protected $table = 'private_bimbles';
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
    ];
}
