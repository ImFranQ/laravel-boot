<?php

namespace App\Http\Controllers;

use App\Models\CarouselItem;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index(){
        return Inertia::render('Welcome', [
            'categories' => Category::limit(12)->get(),
            'products' => Product::paginate(10),
            'carousel' => CarouselItem::where('is_active', true)->orderBy('order')->get()
        ]);
    }
}
