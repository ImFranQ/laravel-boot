<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    protected $fillable = [ 'name', 'value', 'description' ];

    public static function get(string $name, $default = null){
        $option = self::where('name', $name)->first();
        if($option){
            return $option->value;
        }
        return $default;
    }

    public static function set(string $name, $value, string $description = null){
        $option = self::where('name', $name)->first();
        if($option){
            $option->value = $value;
            $option->description = $description;
            $option->save();
        }else{
            $option = self::create([
                'name' => $name,
                'value' => $value,
                'description' => $description,
            ]);
        }
        return $option;
    }

    public static function remove(string $name){
        $option = self::where('name', $name)->first();
        if($option){
            $option->delete();
        }
    }
}
