<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laporan_paket_mitra', function (Blueprint $table) {
            $table->id();
            $table->foreignId('laporan_mitra_id')->constrained('lap_pemasukan_mitra')->onDelete('cascade');
            $table->foreignId('paket_mitra_id')->constrained('paket_mitra')->onDelete('cascade');
            $table->integer('jumlah');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_paket_mitra');
    }
};
