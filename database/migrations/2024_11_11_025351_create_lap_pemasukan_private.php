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
        Schema::create('lap_pemasukan_private', function (Blueprint $table) {
            $table->id();
            $table->string('created_by');
            $table->string('hari');
            $table->date('tanggal');
            $table->integer('biaya_30');
            $table->integer('biaya_35');
            $table->integer('biaya_40');
            $table->integer('biaya_45');
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
        Schema::dropIfExists('lap_pemasukan_private');
    }
};
