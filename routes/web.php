<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
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

Route::resource('categories', CategoryController::class)->names([
  'index' => 'Categories/Index',
  'create' => 'Categories/Create',
  'store' => 'Categories/Store',
  'edit' => 'Categories/Edit',
  'update' => 'Categories/Update',
  'destroy' => 'Categories/Destroy',
  'show' => 'Categories/Show'
]);

Route::resource('products', ProductController::class)->names([
  'index' => 'Products/Index',
  'create' => 'Products/Create',
  'store' => 'Products/Store',
  'edit' => 'Products/Edit',
  'update' => 'Products/Update',
  'destroy' => 'Products/Destroy',
  'show' => 'Products/Show'
]);

Route::resource('customers', CustomerController::class)->names([
  'index' => 'Customers/Index',
  'create' => 'Customers/Create',
  'store' => 'Customers/Store',
  'edit' => 'Customers/Edit',
  'update' => 'Customers/Update',
  'destroy' => 'Customers/Destroy',
  'show' => 'Customers/Show'
]);