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
        Schema::create('gaji_guru', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->string('hari')->nullable();
            $table->string('nama_guru')->nullable();
            $table->decimal('gina', 10, 0)->default(0);
            $table->decimal('amel', 10, 0)->default(0);
            $table->decimal('lia', 10, 0)->default(0);
            $table->decimal('siti', 10, 0)->default(0);
            $table->decimal('nurul', 10, 0)->default(0);
            $table->decimal('hikma', 10, 0)->default(0);
            $table->decimal('safa', 10, 0)->default(0);
            $table->decimal('khoir', 10, 0)->default(0);
            $table->decimal('sarah', 10, 0)->default(0);
            $table->decimal('indri', 10, 0)->default(0);
            $table->decimal('aminah', 10, 0)->default(0);
            $table->decimal('rina', 10, 0)->default(0);
            $table->decimal('total', 15, 0)->default(0);
            $table->timestamps();

            $table->index(['tanggal', 'nama_guru']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gaji_guru');
    }
};
