<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cabang;


class CabangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cabang::create([
            'nama' => 'Cabang A',
            'pengeluaran' => 10000,
            'pendapatan' => 50000,
            'jumlah_murid' => 50,
        ]);

        Cabang::create([
            'nama' => 'Cabang B',
            'pengeluaran' => 15000,
            'pendapatan' => 60000,
            'jumlah_murid' => 60,
        ]);
    }
}
