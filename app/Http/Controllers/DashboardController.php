<?php

namespace App\Http\Controllers;

use App\Traits\HasRenderizableView;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    use HasRenderizableView;
    
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return $this->renderView('Home');
    }
}
