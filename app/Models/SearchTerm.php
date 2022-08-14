<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchTerm extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'product_id',
        'term'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
