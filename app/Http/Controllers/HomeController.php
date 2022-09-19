<?php

namespace App\Http\Controllers;

use App\Models\CarouselItem;
use App\Traits\HasRenderizableView;

class HomeController extends Controller
{
    use HasRenderizableView;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit(){
        return $this->renderView('Home/Edit', [
            'carousel' => CarouselItem::where('is_active', true)->orderBy('order')->get(),
            'storeCarouselUrl' => route('Carousel/Store'),
        ]);
    }
}
