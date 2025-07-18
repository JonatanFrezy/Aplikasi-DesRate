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
        Schema::create('rating_links', function (Blueprint $table) {
            $table->id('rating_link_id');
            $table->foreignId('project_id')
                ->constrained('projects')
                ->cascadeOnDelete()
                ->noActionOnUpdate();
            $table->string('token')->unique();
            $table->string('send_to_email')->nullable();
            $table->string('send_to_phone')->nullable();
            $table->boolean('is_used')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rating_links');
    }
};
