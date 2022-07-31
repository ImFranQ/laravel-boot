<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index(){
        return Inertia::render('Welcome', [
            'products' => Product::paginate(12)
        ]);
    }
}
