<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up()
{
    Schema::table('lap_pemasukan_cabang', function (Blueprint $table) {
        // hapus foreign key lama
        $table->dropForeign(['cabang_id']);

        // pastikan nullable
        $table->unsignedBigInteger('cabang_id')->nullable()->change();

        // tambahkan foreign key baru dengan SET NULL
        $table->foreign('cabang_id')
              ->references('id')->on('cabangalbris')
              ->onDelete('set null');
    });
}

public function down()
{
    Schema::table('lap_pemasukan_cabang', function (Blueprint $table) {
        $table->dropForeign(['cabang_id']);
        $table->unsignedBigInteger('cabang_id')->change();

        $table->foreign('cabang_id')
              ->references('id')->on('cabangalbris')
              ->onDelete('restrict');
    });
}

};
