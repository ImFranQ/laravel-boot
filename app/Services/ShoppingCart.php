<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Product;

class ShoppingCart {
  
  function add(Product $product, $count){
    $cart = $this->get();
    $exists = $cart->products->firstWhere('id', $product->id);

    if($exists === null){
      $cart->products->push((object) [
        'id' => $product->id,
        'price' => $product->price,
        'count' => $count ?? 1,
        'destroyUrl' => route('ShoppingCart/Destroy', $product),
        'updateUrl' => route('ShoppingCart/Add', $product),
        'data' => $product
      ]);

    }else{
      $exists->count = $count;
    }
    
    $this->calculateTotals();
  }

  function get()
  {
    return session('cart', (object)[
      'products' => collect([]),
      'customer' => new Customer(),
      'total' => 0,
      'subtotal' => 0,
      'tax' => 0,
      'id' => 0
    ]);
  }

  function destroy($id)
  {
    $cart = $this->get();
    $cart->products = $cart->products->filter(fn ($product) => $product->id != $id)->values();

    $this->calculateTotals();
  }

  function getProduct($id): Product
  {
    return $this->get()->products->firstWhere('id', $id);
  }

  private function calculateTotals()
  {
    $cart = $this->get();

    $total = $cart->products->map(function ($product) {
      return $product->price * $product->count;
    })->sum();

    $tax = $total * (1 - ((100 - env('TAX', 0)) / 100));
    $cart->tax = round($tax, 2, PHP_ROUND_HALF_UP);
    $cart->subtotal = round($total - $tax, 2, PHP_ROUND_HALF_UP);
    $cart->total = round($total, 2, PHP_ROUND_HALF_UP);

    session()->put('cart', $cart);
  }

  function clear(){
    session()->forget('cart');
  }

}