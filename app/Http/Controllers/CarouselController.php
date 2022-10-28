<?php

namespace App\Http\Controllers;

use App\Http\Requests\Carousel\StoreRequest;
use App\Http\Requests\Carousel\UpdateRequest;
use App\Models\CarouselItem;
use App\Models\FileRelation;
use App\Traits\IsEditable;
use App\Traits\IsStorable;
use Illuminate\Http\Request;

class CarouselController extends Controller 
{
    use IsStorable, IsEditable;

    function __construct()
    {
        $this->middleware('auth');
    }

    public function getEloquentResource()
    {
        return CarouselItem::class;
    }

    public function store(StoreRequest $request){
        $resource = $this->doStore($request);
        
        $this->saveFiles($request, $resource);

        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Carousel item added successfully'
        ]);

        return back();
    }

    public function update(UpdateRequest $request, $id){
        $resource = $this->doUpdate($request, $id);
        
        $this->saveFiles($request, $resource);

        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Carousel item updated successfully'
        ]);

        return back();
    }

    private function saveFiles($request, $resource){
        FileRelation::updateOrCreate([
            'file_id' => $request->file_relation_id,
            'relation_id' => $resource->id
        ],[
            'file_id' => $request->file_relation_id,
            'relation_nane' => CarouselItem::class,
            'relation_id' => $resource->id
        ]);
    }

    public function destroy(Request $request, $id){
        
        FileRelation::where('relation_id', $id)->where('relation_nane', CarouselItem::class)->delete();
        CarouselItem::destroy($id);

        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Carousel item deleted successfully'
        ]);

        return back();
    }

}
