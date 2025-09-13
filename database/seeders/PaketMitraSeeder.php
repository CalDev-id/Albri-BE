<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PaketMitra;

class PaketMitraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pakets = [
            ['nama_paket' => 'Paket 5K', 'harga' => 7000],
            ['nama_paket' => 'Paket 8K', 'harga' => 8000],
            ['nama_paket' => 'Paket 10K', 'harga' => 10000],
            ['nama_paket' => 'Paket 15K', 'harga' => 15000],
        ];

        foreach ($pakets as $paket) {
            PaketMitra::create($paket);
        }
    }
}
