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
        Schema::table('lap_pengeluaran_mitra', function (Blueprint $table) {
            $table->dropForeign(['guru_id']);
            $table->dropColumn(['guru_id', 'gaji']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lap_pengeluaran_mitra', function (Blueprint $table) {
            $table->unsignedBigInteger('guru_id')->nullable();
            $table->integer('gaji')->default(0);
            $table->foreign('guru_id')->references('id')->on('users');
        });
    }
};
