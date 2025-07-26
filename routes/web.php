<?php

use App\Http\Controllers\AdminProjectController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminQuestionnaireController;
use App\Http\Controllers\AdminRatingLinkController;
use App\Http\Controllers\HODResponseController;
use App\Http\Controllers\RatingFormController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\HODProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('projects', AdminProjectController::class)->names('projects');
    Route::resource('questionnaires', AdminQuestionnaireController::class)->names('questionnaires');
    Route::resource('rating-links', AdminRatingLinkController::class)->names('rating-links');
});
Route::post('/admin/rating-links/{id}/resend', [AdminRatingLinkController::class, 'resend'])->name('admin.rating-links.resend');

Route::middleware(['auth', 'verified', 'role:hod'])->prefix('hod')->name('hod.')->group(function () {
    Route::resource('projects', HODProjectController::class)->names('projects');
    Route::resource('responses', HODResponseController::class)->names('responses');
});

Route::get('/hod/responses/{id}/download', [HODResponseController::class, 'download'])->name('hod.responses.download');

Route::get('/rating/{token}', [RatingFormController::class, 'show'])->name('rating.form');
Route::post('/rating/{token}', [RatingFormController::class, 'store'])->name('rating.form');
Route::get('/rating/{token}/success', function () {
        return Inertia::render('customer/alert/success');
    })->name('rating.success');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
