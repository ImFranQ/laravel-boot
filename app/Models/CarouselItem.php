<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarouselItem extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'link', 'link_text', 'is_active', 'order'];

    protected $appends = ['files', 'updateUrl'];

    public function getFilesAttribute()
    {
        return $this->filesRelations->map(fn ($relation) => $relation->file);
    }

    public function getUpdateUrlAttribute()
    {
        return route('Carousel/Update', $this->id);
    }
    
    public function filesRelations()
    {
        return $this->hasMany('App\Models\FileRelation', 'relation_id', 'id')
            ->where('relation_nane', CarouselItem::class);
    }

}
