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
        Schema::table('lap_pemasukan_mitra', function (Blueprint $table) {
            // Drop kolom-kolom hardcoded
            $table->dropColumn(['biaya_5000', 'biaya_8000', 'biaya_10000', 'biaya_15000']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lap_pemasukan_mitra', function (Blueprint $table) {
            // Restore kolom-kolom jika rollback
            $table->integer('biaya_5000')->default(0);
            $table->integer('biaya_8000')->default(0);
            $table->integer('biaya_10000')->default(0);
            $table->integer('biaya_15000')->default(0);
        });
    }
};
