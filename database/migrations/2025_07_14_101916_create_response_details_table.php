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
        Schema::create('response_details', function (Blueprint $table) {
            $table->id();
            $table->text('answer_text')->nullable();
            $table->foreignId('selected_option_id')
                ->nullable()
                ->constrained('answer_options')
                ->noActionOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('response_id')
                ->constrained('responses')
                ->noActionOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('question_id')
                ->constrained('questions')
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
        Schema::dropIfExists('response_details');
    }
};
