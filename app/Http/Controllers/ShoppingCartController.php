<?php

namespace App\Http\Controllers;

use App\Contracts\Resourceable;
use App\Facades\ShoppingCartFacade as ShoppingCart;
use App\Models\Product;
use App\Traits\HasRenderizableView;
use Illuminate\Http\Request;

class ShoppingCartController extends Controller
{

    use HasRenderizableView;

    function __construct()
    {
        $this->middleware('auth')->except(['customerDetail', 'addProduct', 'removeProduct']);
    }

    public function viewPrefixName()
    {
        return 'ShoppingCart';
    }

    public function customerDetail()
    {
        return $this->renderView('ShoppingCart/Detail');
    }

    public function addProduct(Request $request, Product $product)
    {
        ShoppingCart::add($product, $request->count);
        return back();
    }

    public function removeProduct(Request $request, Product $product)
    {
        ShoppingCart::destroy($product->id);
        return back();
    }
}
