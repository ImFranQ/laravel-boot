<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Traits\HasRenderizableView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TermOfServiceConroller extends Controller
{
    use HasRenderizableView;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit(){
        return $this->renderView('TermOfService/Edit', [
            'fileUrl' => Option::get('term_of_service_file_url'),
            'updateUrl' => route('Pages/TermOfService/Update'),
        ]);
    }

    public function update(Request $request){
        $request->validate([
            'term_of_service_file' => 'required|file|mimes:pdf'
        ]);

        try {
            Storage::delete('public/files/term_of_service.pdf');
        } catch (\Exception $e) {

        }

        $file = $request->file('term_of_service_file');
        $path =  $file->storeAs('public/files', 'term_of_service_file.pdf');
        $publicPath = Storage::url( $path );

        Option::set('term_of_service_file_url', asset($publicPath));

        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Term of service file updated successfully'
        ]);
        
        return back();
    }
}
