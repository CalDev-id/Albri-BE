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
        Schema::create('laporan_pengeluaran_guru', function (Blueprint $table) {
            // Kolom id sebagai primary key (BIGINT, AUTO_INCREMENT)
            $table->id();

            // Kolom untuk foreign key ke tabel lap_pengeluaran_cabang
            $table->unsignedBigInteger('lap_pengeluaran_id');

            // Kolom untuk foreign key ke tabel users (guru)
            $table->unsignedBigInteger('guru_id');

            // Kolom untuk gaji (INT, NOT NULL)
            $table->integer('gaji');

            // Kolom created_at dan updated_at (TIMESTAMP, NULLABLE)
            $table->timestamps();

            // Mendefinisikan foreign key constraints
            $table->foreign('lap_pengeluaran_id')
                  ->references('id')
                  ->on('lap_pengeluaran_cabang')
                  ->onDelete('cascade');

            $table->foreign('guru_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('laporan_pengeluaran_guru');
    }
};
