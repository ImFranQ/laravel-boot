<?php

namespace App\Http\Controllers;

use App\Contracts\Resourceable;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Requests\Category\UpdateRequest;
use App\Models\Category;
use App\Traits\IsDestroyable;
use App\Traits\IsEditable;
use App\Traits\IsIndexable;
use App\Traits\IsShowable;
use App\Traits\IsStorable;

class CategoryController extends Controller implements Resourceable
{
    use IsIndexable, IsDestroyable, IsShowable;
    use IsEditable {
        update as protected updateResource;
    }
    use IsStorable {
        store as protected storeResource;
    }

    function __construct()
    {
        $this->middleware('auth');
        $this->middleware('inputCleaner')->only(['update']);
    }

    public function getEloquentResource()
    {
        return Category::class;
    }

    public function viewPrefixName()
    {
        return 'Categories';
    }

    public function getIndexResponse()
    {
        $data = $this->getEloquentResource()::paginate(10);

        $data->getCollection()->transform(function ($category) {
            $category->actions = [
                'destroy' => route('Categories/Destroy', $category),
                'edit' => route('Categories/Edit', $category),
                'show' => route('Categories/Show', $category)
            ];
            return $category;
        });

        return [
            'categories' => $data,
            'createUrl' => route('Categories/Create'),
        ];
    }

    public function getCreateResponse()
    {
        return [
            'categories' => $this->getEloquentResource()::whereNull('parent_id')->get(),
            'storeUrl' => route('Categories/Store'),
        ];
    }

    public function getEditResponse($id)
    {
        return [
            'categories' => $this->getEloquentResource()::whereNull('parent_id')->get(),
            'updateUrl' => route('Categories/Update', $id),
            'category' => $this->getEloquentResource()::find($id)
        ];;
    }

    public function getShowResponse($id)
    {
        return [
            'categories' => $this->getEloquentResource()::whereNull('parent_id')->get(),
            'category' => $this->getEloquentResource()::find($id)
        ];
    }

    public function store(StoreRequest $request)
    {
        return $this->storeResource($request);
    }

    public function update(UpdateRequest $request, $id)
    {
        return $this->updateResource($request, $id);
    }

    public function afterStore($resoruce)
    {
        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Category stored successfully'
        ]);
    }

    public function afterUpdate($resoruce, $request)
    {
        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Category updated successfully'
        ]);
    }

}
