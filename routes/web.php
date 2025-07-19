<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HOD\HodDashboardController;
use App\Http\Controllers\HOD\ProjectController;
use App\Http\Controllers\HOD\ResponseController;
use App\Http\Controllers\FeedbackController;

// ----------------------------
// ----------------------------
Route::get('/', function () {
    return view('welcome');
});

// ----------------------------
// ----------------------------
Route::get('/feedback/{project}', [FeedbackController::class, 'showForm'])->name('feedback.form');
Route::post('/feedback/{project}', [FeedbackController::class, 'submit'])->name('feedback.submit');

// ----------------------------
// ----------------------------
Route::middleware(['auth', 'role:hod'])->prefix('hod')->name('hod.')->group(function () {

    Route::get('/dashboard', [HodDashboardController::class, 'index'])->name('dashboard');

    Route::resource('projects', ProjectController::class);

    Route::get('/responses', [ResponseController::class, 'index'])->name('responses.index');

    Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback.index');

    Route::get('/feedback/export/excel', [FeedbackController::class, 'exportExcel'])->name('feedback.export.excel');

    Route::get('/feedback/{response}', [FeedbackController::class, 'detail'])->name('feedback.detail');

    Route::get('/export-feedback', [HodDashboardController::class, 'exportFeedback'])->name('export.feedback');
});