<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('laporan_paket', function (Blueprint $table) {
            // Hapus foreign key lama
            $table->dropForeign(['laporan_id']);

            // Tambah foreign key baru dengan ON DELETE CASCADE
            $table->foreign('laporan_id')
                  ->references('id')->on('lap_pemasukan_cabang')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('laporan_paket', function (Blueprint $table) {
            // Kembalikan ke RESTRICT (default)
            $table->dropForeign(['laporan_id']);

            $table->foreign('laporan_id')
                  ->references('id')->on('lap_pemasukan_cabang')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
        });
    }
};
