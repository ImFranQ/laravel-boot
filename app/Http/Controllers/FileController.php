<?php

namespace App\Http\Controllers;

use App\Http\Requests\Files\StoreRequest;
use App\Models\File;
use App\Traits\IsDestroyable;
use App\Traits\IsIndexable;
use App\Traits\IsStorable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class FileController extends Controller
{
    use IsIndexable;

    use IsDestroyable {
        destroy as protected destroyResource;
    }

    use IsStorable {
        store as protected storeResource;
    }

    function __construct()
    {
        if(!request()->expectsJson())
            $this->middleware('auth');
    }

    public function getEloquentResource()
    {
        return File::class;
    }

    public function viewPrefixName()
    {
        return 'Files';
    }

    public function getIndexResponse()
    {
        $limit = request()->input('limit') ?? 24;
        $files = $this->getEloquentResource()::paginate($limit);

        $files->getCollection()->transform(function ($product) {
            $product->actions = [
                'destroy' => route('Files/Destroy', $product),
            ];
            return $product;
        });


        return [
            'files' => $files,
            'storeUrl' => route('Files/Store'),
        ];
    }

    public function store(StoreRequest $request){

        $file = $request->file('file');
        $path = $file->store('public/images');
        $publicPath = Storage::url( $path );
        $name = $file->hashName();
        
        $request = $request->replace([
            'name' => $name,
            'path' => $publicPath
        ]);

        return $this->storeResource($request);
    }

    public function destroy(Request $request, File $file)
    {
        Storage::delete('public/images/'.$file->name);
        return $this->destroyResource($file->id);
    }

}
