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
        Schema::create('pengeluaran_private_pivot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengeluaran_id')->constrained('lap_pengeluaran_private')->onDelete('cascade');
            $table->foreignId('private_bimble_id')->constrained('private_bimbles')->onDelete('cascade');
            $table->decimal('gaji', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengeluaran_private_pivot');
    }
};
