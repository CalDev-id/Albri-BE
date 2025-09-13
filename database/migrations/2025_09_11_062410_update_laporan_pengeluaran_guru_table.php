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
        Schema::table('laporan_pengeluaran_guru', function (Blueprint $table) {
            // 1. Hapus foreign key constraint terlebih dahulu
            $table->dropForeign(['guru_id']);

            // 2. Hapus kolom guru_id
            $table->dropColumn('guru_id');

            // 3. Tambahkan kolom baru untuk nama guru
            $table->string('guru_nama')->nullable()->after('lap_pengeluaran_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('laporan_pengeluaran_guru', function (Blueprint $table) {
            // 1. Hapus kolom guru_nama
            $table->dropColumn('guru_nama');

            // 2. Tambahkan kembali kolom guru_id
            $table->unsignedBigInteger('guru_id')->nullable();

            // 3. Tambahkan kembali foreign key constraint
            $table->foreign('guru_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }
};
