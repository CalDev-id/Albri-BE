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
        Schema::create('laporan_pengeluaran_guru_mitra', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lap_pengeluaran_mitra_id')->constrained('lap_pengeluaran_mitra')->onDelete('cascade');
            $table->string('mitra_nama');
            $table->integer('gaji');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_pengeluaran_guru_mitra');
    }
};
