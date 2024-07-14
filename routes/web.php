<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/users', [Controllers\UserController::class, 'index'])->name('users.index');
    Route::get('/todo', [Controllers\TodoController::class, 'index'])->name('todo.index');
    Route::get('/todo/edit/{todo}', [Controllers\TodoController::class, 'edit'])->name('todo.edit');
    Route::patch('/todo/edit/{todo}', [Controllers\TodoController::class, 'update'])->name('todo.update');
    Route::patch('/todo/edit-complete/{todo}', [Controllers\TodoController::class, 'updateComplete'])->name('todo.updateComplete');

    Route::delete('/todo/{todo}/delete',[Controllers\TodoController::class, 'destroy'])->name('todo.delete');
    Route::post('/todo',[Controllers\TodoController::class, 'store'])->name('todo.store');
});


require __DIR__.'/auth.php';
