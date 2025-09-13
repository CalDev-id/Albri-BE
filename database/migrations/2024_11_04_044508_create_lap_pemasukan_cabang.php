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
        Schema::create('lap_pemasukan_cabang', function (Blueprint $table) {
            $table->id();
            $table->string('created_by');
            $table->string('hari');
            $table->date('tanggal');
            $table->foreignId('cabang_id')->constrained('cabangalbris');
            $table->integer('totalbiaya');
            $table->integer('daftar');
            $table->integer('modul');
            $table->integer('kaos');
            $table->integer('kas');
            $table->integer('lainlain');
            $table->integer('totalpemasukan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lap_pemasukan_cabang');
    }
};
