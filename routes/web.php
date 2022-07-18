<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Auth::routes();

Route::controller(HomeController::class)->group(function(){
  Route::get('home', 'index')->name('home');
});

Route::resource('users', UserController::class)->names([
  'index' => 'Users/Index',
  'create' => 'Users/Create',
  'store' => 'Users/Store',
  'edit' => 'Users/Edit',
  'update' => 'Users/Update',
  'destroy' => 'Users/Destroy',
  'show' => 'Users/Show'
]);