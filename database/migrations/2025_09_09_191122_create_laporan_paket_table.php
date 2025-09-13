<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up(): void
{
    Schema::create('laporan_paket', function (Blueprint $table) {
        $table->id();
        $table->foreignId('laporan_id')->constrained('lap_pemasukan_cabang')->onDelete('cascade');
        $table->foreignId('paket_id')->constrained('pakets')->onDelete('cascade');
        $table->integer('jumlah'); // berapa kali paket ini diisi
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_paket');
    }
};
