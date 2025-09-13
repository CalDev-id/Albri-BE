<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PaketPrivate;

class PaketPrivateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pakets = [
            ['nama_paket' => 'Paket 30K', 'harga' => 30000],
            ['nama_paket' => 'Paket 35K', 'harga' => 35000],
            ['nama_paket' => 'Paket 40K', 'harga' => 40000],
            ['nama_paket' => 'Paket 45K', 'harga' => 45000],
        ];

        foreach ($pakets as $paket) {
            PaketPrivate::create($paket);
        }
    }
}
