<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GajiGuru extends Model
{
    use HasFactory;

    protected $table = 'gaji_guru';
    
    protected $fillable = [
        'tanggal',
        'hari',
        'nama_guru',
        'gina',
        'amel',
        'lia',
        'siti',
        'nurul',
        'hikma',
        'safa',
        'khoir',
        'sarah',
        'indri',
        'aminah',
        'rina',
        'total'
    ];

    protected $casts = [
        'tanggal' => 'date',
        'gina' => 'integer',
        'amel' => 'integer',
        'lia' => 'integer',
        'siti' => 'integer',
        'nurul' => 'integer',
        'hikma' => 'integer',
        'safa' => 'integer',
        'khoir' => 'integer',
        'sarah' => 'integer',
        'indri' => 'integer',
        'aminah' => 'integer',
        'rina' => 'integer',
        'total' => 'integer'
    ];

    // Accessor untuk format mata uang Indonesia
    public function getFormattedGinaAttribute()
    {
        return number_format((float)$this->gina, 0, ',', '.');
    }

    public function getFormattedAmelAttribute()
    {
        return number_format((float)$this->amel, 0, ',', '.');
    }

    public function getFormattedLiaAttribute()
    {
        return number_format((float)$this->lia, 0, ',', '.');
    }

    public function getFormattedSitiAttribute()
    {
        return number_format((float)$this->siti, 0, ',', '.');
    }

    public function getFormattedNurulAttribute()
    {
        return number_format((float)$this->nurul, 0, ',', '.');
    }

    public function getFormattedHikmaAttribute()
    {
        return number_format((float)$this->hikma, 0, ',', '.');
    }

    public function getFormattedSafaAttribute()
    {
        return number_format((float)$this->safa, 0, ',', '.');
    }

    public function getFormattedKhoirAttribute()
    {
        return number_format((float)$this->khoir, 0, ',', '.');
    }

    public function getFormattedSarahAttribute()
    {
        return number_format((float)$this->sarah, 0, ',', '.');
    }

    public function getFormattedIndriAttribute()
    {
        return number_format((float)$this->indri, 0, ',', '.');
    }

    public function getFormattedAminahAttribute()
    {
        return number_format((float)$this->aminah, 0, ',', '.');
    }

    public function getFormattedRinaAttribute()
    {
        return number_format((float)$this->rina, 0, ',', '.');
    }

    public function getFormattedTotalAttribute()
    {
        return number_format((float)$this->total, 0, ',', '.');
    }
}