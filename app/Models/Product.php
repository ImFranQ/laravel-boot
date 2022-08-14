<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['description', 'title', 'category_id', 'user_id', 'price'];

    protected $appends = ['cart', 'detailUrl'];

    function generateSearchTerm()
    {
        $terms = app('App\Http\Controllers\SearchController')->encode($this->title);
        SearchTerm::updateOrCreate(
            ['product_id' => $this->id],
            ['product_id' => $this->id, 'term' => $terms]
        );
    }

    public function getCartAttribute()
    {
        return (object)[
            'addUrl' => route('ShoppingCart/Add', $this->id),
            'destroyUrl' => route('ShoppingCart/Destroy', $this->id)
        ];
    }

    public function getDetailUrlAttribute()
    {
        return route('Products/Detail', $this->id);
    }
}
