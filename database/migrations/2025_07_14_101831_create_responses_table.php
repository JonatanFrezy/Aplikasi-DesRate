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
        Schema::create('responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rating_link_id')
                ->constrained('rating_links')
                ->noActionOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('project_id')
                ->constrained('projects')
                ->noActionOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('questionnaire_id')
                ->constrained('questionnaires')
                ->noActionOnUpdate()
                ->cascadeOnDelete();
            $table->timestamp('submitted_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responses');
    }
};
