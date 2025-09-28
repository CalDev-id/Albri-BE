<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Function to safely drop foreign key if exists
        $dropForeignKeyIfExists = function($table, $column, $constraintName = null) {
            try {
                if ($constraintName) {
                    DB::statement("ALTER TABLE {$table} DROP FOREIGN KEY {$constraintName}");
                } else {
                    // Try to find and drop foreign key by column
                    $constraints = DB::select("
                        SELECT CONSTRAINT_NAME 
                        FROM information_schema.KEY_COLUMN_USAGE 
                        WHERE TABLE_NAME = '{$table}' 
                        AND COLUMN_NAME = '{$column}' 
                        AND TABLE_SCHEMA = DATABASE()
                        AND CONSTRAINT_NAME != 'PRIMARY'
                    ");
                    
                    foreach ($constraints as $constraint) {
                        DB::statement("ALTER TABLE {$table} DROP FOREIGN KEY {$constraint->CONSTRAINT_NAME}");
                    }
                }
            } catch (\Exception $e) {
                // Ignore if constraint doesn't exist
            }
        };

        // Step 1: Drop existing foreign key constraints
        $dropForeignKeyIfExists('lap_pemasukan_cabang', 'cabang_id');
        $dropForeignKeyIfExists('lap_pengeluaran_cabang', 'cabang_id');

        // Step 2: Ubah kolom cabang_id menjadi nullable
        Schema::table('lap_pemasukan_cabang', function (Blueprint $table) {
            $table->unsignedBigInteger('cabang_id')->nullable()->change();
        });
        
        Schema::table('lap_pengeluaran_cabang', function (Blueprint $table) {
            $table->unsignedBigInteger('cabang_id')->nullable()->change();
        });

        // Step 3: Add new foreign key constraints dengan SET NULL
        Schema::table('lap_pemasukan_cabang', function (Blueprint $table) {
            $table->foreign('cabang_id')
                  ->references('id')
                  ->on('cabangalbris')
                  ->onDelete('set null')
                  ->onUpdate('cascade');
        });

        Schema::table('lap_pengeluaran_cabang', function (Blueprint $table) {
            $table->foreign('cabang_id')
                  ->references('id')
                  ->on('cabangalbris')
                  ->onDelete('set null')
                  ->onUpdate('cascade');
        });

        // Step 4: Update foreign key di laporan_paket jika ada relasi ke cabang
        if (Schema::hasTable('laporan_paket')) {
            $dropForeignKeyIfExists('laporan_paket', 'laporan_id');
            
            Schema::table('laporan_paket', function (Blueprint $table) {
                $table->foreign('laporan_id')
                      ->references('id')
                      ->on('lap_pemasukan_cabang')
                      ->onDelete('restrict')
                      ->onUpdate('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Rollback perubahan
        Schema::table('lap_pemasukan_cabang', function (Blueprint $table) {
            $table->dropForeign(['cabang_id']);
            $table->unsignedBigInteger('cabang_id')->nullable(false)->change();
            $table->foreign('cabang_id')->references('id')->on('cabangalbris');
        });

        Schema::table('lap_pengeluaran_cabang', function (Blueprint $table) {
            $table->dropForeign(['cabang_id']);
            $table->unsignedBigInteger('cabang_id')->nullable(false)->change();
            $table->foreign('cabang_id')->references('id')->on('cabangalbris');
        });

        if (Schema::hasTable('laporan_paket')) {
            Schema::table('laporan_paket', function (Blueprint $table) {
                $table->dropForeign(['laporan_id']);
                $table->foreign('laporan_id')->references('id')->on('lap_pemasukan_cabang')->onDelete('cascade');
            });
        }
    }
};