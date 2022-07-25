<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->words($nb = $this->faker->randomDigitNot(0), $asText = true),
            'description' => $this->faker->text($maxNbChars = 1000),
            'category_id' => Category::get()->random(),
            'user_id' => User::get()->random(),
            'price' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 10, $max = 3000),
        ];
    }
}
