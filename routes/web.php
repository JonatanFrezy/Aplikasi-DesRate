<?php

use App\Http\Controllers\AdminProjectController;
use App\Http\Controllers\AdminQuestionnaireController;
use App\Http\Controllers\AdminRatingLinkController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('projects', AdminProjectController::class);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('questionnaires', AdminQuestionnaireController::class);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('rating-links', AdminRatingLinkController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
