<?php

namespace App\Http\Controllers;

use App\Contracts\Resourceable;
use App\Models\SearchTerm;
use App\Traits\IsIndexable;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller implements Resourceable
{
    use IsIndexable;

    public function getEloquentResource()
    {
        return SearchTerm::class;
    }

    public function viewPrefixName()
    {
        return 'Search';
    }

    public function getIndexResponse()
    {
        $query = request()->input('query');
        if ($query == null) return redirect()->route('welcome');

        $encode = $this->encode($query);

        $products = DB::table('search_terms')
            ->select('products.*', 'search_terms.product_id', 'search_terms.term')
            ->join('products', 'products.id', '=', 'search_terms.product_id');

        $products = $products->where('search_terms.term', 'like', "%$encode%");

        collect(explode(' ', $encode))->each(function ($term) use ($products) {
            $products->orWhere('search_terms.term', 'like', "%$term%");
        });

        $products = $products->paginate(20);

        $products->getCollection()->transform(function ($product) {
            $product->detailUrl = route('Products/Detail', $product->id);
            return $product;
        });

        return [
            'products' => $products,
            'query' => $query
        ];
    }
    
    public function encode($string)
    {
        $patrones = [
            '/(ñ|Ñ)/',
            '/(?!([A-Za-z0-9-_]|\s))./',
            '/[AEIOUaeiouXx]/',
            '/[-_]/',
        ];
        $sustituciones = [
            'n', '', '', ' '
        ];
        $text = preg_replace($patrones, $sustituciones, $string);
        $text = strtoupper($text);
        $text = preg_replace([
            '/[BV]/', '/[FH]/', '/[TD]/', '/[SZCX]/', '/[YL]/', '/[NÑM]/', '/[QK]/', '/[GJ]/', '/[R]/', '/[P]/'
        ], [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 0
        ], $text);
        return $text;
    }
}
