<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileRelation extends Model
{
    use HasFactory;

    protected $fillable = ['file_id', 'relation_nane', 'relation_id'];

    public function file()
    {
        return $this->belongsTo('App\Models\File');
    }
}
