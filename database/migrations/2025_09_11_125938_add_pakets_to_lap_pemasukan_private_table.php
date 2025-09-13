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
        Schema::table('lap_pemasukan_private', function (Blueprint $table) {
            $table->json('pakets')->nullable()->after('tanggal'); // JSON field to store dynamic paket data
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lap_pemasukan_private', function (Blueprint $table) {
            $table->dropColumn('pakets');
        });
    }
};
