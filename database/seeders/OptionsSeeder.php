<?php

namespace Database\Seeders;

use App\Models\Option;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Option::set('title', env('APP_NAME'));
        Option::set('description', '');
        Option::set('url', env('APP_URL'));
        Option::set('brand_image', '');
    }
}
