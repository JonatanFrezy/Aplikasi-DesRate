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
            $table->id();
            $table->string('token')->unique();
            $table->string('send_to_name');
            $table->string('send_to_email')->nullable();
            $table->string('send_to_phone')->nullable();
            $table->boolean('is_used')->default(false);
            $table->foreignId('project_id')
                ->constrained('projects')
                ->noActionOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('questionnaire_id')
                ->constrained('questionnaires')
                ->noActionOnUpdate()
                ->cascadeOnDelete();
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
