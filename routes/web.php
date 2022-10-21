<?php

use App\Http\Controllers\CarouselController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\TermOfServiceConroller;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Services\ShoppingCart;
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

Route::controller(DashboardController::class)->group(function(){
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
  'show' => 'Products/Show',
]);

Route::controller(ProductController::class)->prefix('product')->group(function () {
  Route::get('/{product}', 'detail')->name('Products/Detail');
});

Route::resource('customers', CustomerController::class)->names([
  'index' => 'Customers/Index',
  'create' => 'Customers/Create',
  'store' => 'Customers/Store',
  'edit' => 'Customers/Edit',
  'update' => 'Customers/Update',
  'destroy' => 'Customers/Destroy',
  'show' => 'Customers/Show'
]);

Route::resource('files', FileController::class)->names([
  'index' => 'Files/Index',
  'store' => 'Files/Store',
  'destroy' => 'Files/Destroy',
]);


Route::resource('shopping-cart', ShoppingCartController::class)->names([
  'addProduct' => 'ShoppingCart',
  'customerDetail' => 'ShoppingCart/Detail'
]);

Route::controller(SearchController::class)->prefix('search')->group(function(){
  Route::get('/', 'index')->name('Search/Index');
});

Route::controller(ShoppingCartController::class)->prefix('cart')->group(function(){
  Route::get('detail', 'customerDetail')->name('ShoppingCart/Detail');
  Route::post('add/{product}', 'addProduct')->name('ShoppingCart/Add');
  Route::delete('destroy/{product}', 'removeProduct')->name('ShoppingCart/Destroy');
});

Route::controller(CheckoutController::class)->prefix('checkout')->group(function () {
  Route::post('payment-method', 'paymentMethod')->name('Checkout/PaymentMethod');
});

Route::prefix('pages')->group(function () {
  Route::get('home', [HomeController::class, 'edit'])->name('Pages/Home/Edit');
  
  Route::resource('home/carousel', CarouselController::class)->names([
    'store' => 'Carousel/Store',
    'update' => 'Carousel/Update',
  ]);
  
  Route::get('term-of-services', [TermOfServiceConroller::class, 'edit'])->name('Pages/TermOfService/Edit');
});

Route::controller(SettingsController::class)->prefix('settings')->group(function () {
  Route::get('/', 'edit')->name('Settings/Edit');
  Route::patch('/', 'update')->name('Settings/Update');
});
