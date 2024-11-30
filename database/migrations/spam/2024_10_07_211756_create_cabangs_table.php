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
    Schema::create('cabangs', function (Blueprint $table) {
        $table->id();
        $table->string('nama');
        $table->decimal('pengeluaran', 10, 2);
        $table->decimal('pendapatan', 10, 2);
        $table->integer('jumlah_murid');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cabangs');
    }
};
