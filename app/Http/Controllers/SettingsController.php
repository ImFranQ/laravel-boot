<?php

namespace App\Http\Controllers;

use App\Http\Requests\Setting\UpdateRequest;
use App\Models\Option;
use App\Traits\IsEditable;
use Illuminate\Http\Request;

class SettingsController extends Controller
{

    use IsEditable;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getEloquentResource()
    {
        return Option::class;
    }

    public function viewPrefixName()
    {
        return 'Settings';
    }

    public function edit(){
        return $this->renderView(
            $this->getEditViewName(),
            [
                'settings' => $this->getEloquentResource()::where('name', 'title')
                    ->orWhere('name', 'description')
                    ->orWhere('name', 'url')
                    ->orWhere('name', 'brand_image')
                    ->get(),
                'updateUrl' => route('Settings/Update'),
            ]
        );
    }

    public function update(UpdateRequest $request)
    {

        Option::set('title', $request->title);
        Option::set('description', $request->description);
        Option::set('url', $request->url);
        Option::set('brand_image', $request->brand_image);

        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Settings updated successfully'
        ]);

        return back();
    }
}
