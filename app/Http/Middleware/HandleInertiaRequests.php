<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;
use App\Facades\ShoppingCartFacade as ShoppingCart;
use App\Models\Option;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'appName' => env('APP_NAME'),
            'csrf' => csrf_token(),
            'auth' => Auth::user(),
            'cart' => ShoppingCart::get(),
            'alert' => session()->get('alert'),
            'cartUrl' => route('ShoppingCart/Detail'),
            'storeUrl' => route('welcome'),
            'boardUrl' => route('home'),
            'searchUrl' => route('Search/Index'),
            'defaultTitle' => Option::get('title', env('APP_NAME')),
            'defaultDescription' => Option::get('description', 'A Laravel powered store'),
            'urlSite' => Option::get('url', env('APP_URL')),
            'brandImage' => Option::get('brand_image', ''),  
        ]);
    }
}
