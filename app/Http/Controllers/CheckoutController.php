<?php

namespace App\Http\Controllers;

use App\Http\Requests\Checkout\PaymentMethodRequest;
use App\Facades\ShoppingCartFacade as ShoppingCart;
use App\Models\Customer;
use App\Models\ShoppingCart as Cart;
use App\Models\ShoppingCartItem as CartItem;
use App\Traits\HasRenderizableView;

class CheckoutController extends Controller
{
    use HasRenderizableView;
    
    function paymentMethod(PaymentMethodRequest $request){
        // Create Customer
        $customerInfo = $request->only(app(Customer::class)->getFillable());
        $customer = Customer::updateOrCreate(['email' => $customerInfo['email']], $customerInfo);

        // Update Cart
        $cart = ShoppingCart::get();
        $cart->customer = $customer;

        // Save ShoppingCart
        $shoppingCart = Cart::firstOrCreate(
            ['id' => $cart->id],
            ['customer_id' => $customer->id]
        );
        $cart->id = $shoppingCart->id;

        // Save Products
        $cart->products->each(function ($product) use ($shoppingCart, $cart) {
            CartItem::updateOrCreate([
                'shopping_cart_id' => $cart->id,
                'product_id' => $product->id,
            ], [
                'shopping_cart_id' => $shoppingCart->id,
                'product_id' => $product->id,
                'count' => $product->count,
                'price' => $product->price,
            ]);
        });

        return $this->renderView('Checkout/PaymentMethod', [
            //
        ]);
    }
}
