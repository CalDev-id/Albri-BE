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
        Schema::create('lap_pengeluaran_mitra', function (Blueprint $table) {
            $table->id();
            $table->string('created_by');
            $table->string('hari');
            $table->date('tanggal');
            $table->foreignId('guru_id')->constrained('users');
            $table->integer('gaji');
            $table->integer('atk');
            $table->integer('intensif');
            $table->integer('lisensi');
            $table->integer('lainlain');
            $table->integer('totalpengeluaran');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lap_pengeluaran_mitra');
    }
};
