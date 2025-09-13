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
        Schema::table('lap_pengeluaran_private', function (Blueprint $table) {
            $table->json('gurus')->nullable()->after('tanggal'); // JSON field to store multiple gurus data
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lap_pengeluaran_private', function (Blueprint $table) {
            $table->dropColumn('gurus');
        });
    }
};
