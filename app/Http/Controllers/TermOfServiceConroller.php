<?php

namespace App\Http\Controllers;

use App\Traits\HasRenderizableView;
use Illuminate\Http\Request;

class TermOfServiceConroller extends Controller
{
    use HasRenderizableView;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit(){
        return $this->renderView('TermOfService/Edit');
    }
}
