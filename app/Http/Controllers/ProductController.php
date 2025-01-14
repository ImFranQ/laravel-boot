<?php

namespace App\Http\Controllers;

use App\Contracts\Resourceable;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Models\FileRelation;
use App\Models\Product;
use App\Traits\HasRenderizableView;
use App\Traits\IsDestroyable;
use App\Traits\IsEditable;
use App\Traits\IsIndexable;
use App\Traits\IsShowable;
use App\Traits\IsStorable;

class ProductController extends Controller
{
    use IsIndexable, IsDestroyable, IsShowable, HasRenderizableView;
    use IsEditable {
        update as protected updateResource;
    }
    use IsStorable {    
        store as protected storeResource;
    }

    function __construct()
    {
        $this->middleware('auth')->except(['detail']);
        $this->middleware('authToRequest', ['only' => ['store']]);
        $this->middleware('inputCleaner')->only(['update']);
    }

    public function getEloquentResource()
    {
        return Product::class;
    }

    public function viewPrefixName()
    {
        return 'Products';
    }

    public function getIndexResponse()
    {
        $data = $this->getEloquentResource()::paginate(10);

        $data->getCollection()->transform(function ($product) {
            $product->actions = [
                'destroy' => route('Products/Destroy', $product),
                'edit' => route('Products/Edit', $product),
                'show' => route('Products/Show', $product)
            ];
            return $product;
        });

        return [
            'products' => $data,
            'createUrl' => route('Products/Create'),
        ];
    }

    public function getCreateResponse()
    {
        return [
            'categories' => $this->getEloquentResource()::get(),
            'storeUrl' => route('Products/Store'),
        ];
    }

    public function getEditResponse($id)
    {
        return [
            'updateUrl' => route('Products/Update', $id),
            'categories' => $this->getEloquentResource()::get(),
            'product' => $this->getEloquentResource()::find($id),
            'tets' => route('Api/Files/Index')
        ];;
    }

    public function getShowResponse($id)
    {
        return [
            'categories' => $this->getEloquentResource()::get(),
            'product' => $this->getEloquentResource()::find($id)
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

    public function detail(Product $product){
        return $this->renderView('Products/Detail', [
            'product' => $product
        ]);
    }

    public function afterStore($resource, $request)
    {
        $this->saveFiles($request, $resource);
        $resource->generateSearchTerm();

        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Product stored successfully'
        ]);
    }

    public function afterUpdate($resource, $request)
    {
        $this->saveFiles($request, $resource);
        $resource->generateSearchTerm();

        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Product updated successfully'
        ]);
    }

    private function saveFiles($request, $resource){
        // Get only id's
        $filesId = collect($request->input('files'))->map(fn ($file) => $file['id']);

        // Delete files
        FileRelation::where('relation_id', $resource->id)
            ->whereNotIn('file_id', $filesId)
            ->delete();

        // Add new files
        $filesId->each(function($id) use ($resource){
            FileRelation::updateOrCreate([
                'file_id' => $id,
                'relation_id' => $resource->id
            ],[
                'file_id' => $id,
                'relation_nane' => Product::class,
                'relation_id' => $resource->id
            ]);
        });
    }
}
