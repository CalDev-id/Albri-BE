<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Fungsi ini akan dijalankan saat 'php artisan migrate'
        // Kita akan menghapus kolom 'gaji' dari tabel ini.
        Schema::table('lap_pengeluaran_cabang', function (Blueprint $table) {
            $table->dropColumn('gaji');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Fungsi ini akan dijalankan jika Anda melakukan 'php artisan migrate:rollback'
        // Kita kembalikan kolom 'gaji' jika migrasi dibatalkan.
        Schema::table('lap_pengeluaran_cabang', function (Blueprint $table) {
            $table->integer('gaji');
        });
    }
};

