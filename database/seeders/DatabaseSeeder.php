<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (env('APP_DEBUG')) {
            \App\Models\User::factory(10)->create();
            \App\Models\Category::factory(30)->create();
            \App\Models\Product::factory(500)->create();
            \App\Models\Customer::factory(50)->create();
        }

        $this->call([
            OptionsSeeder::class,
        ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
