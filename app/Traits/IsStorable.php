<?php

namespace App\Traits;

use Illuminate\Http\Request;

/**
 * 
 */
trait IsStorable
{
  use HasRenderizableView;

  protected $createPageName = 'Create';

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return $this->renderView(
      $this->getCreateViewName(),
      $this->getCreateResponse()
    );
  }

  /**
   * Store a newly created resource in storage and redirect.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $this->doStore($request);
    return redirect()->route($this->viewPrefixName() . '/'. $this->indexPageName);
  }

  /**
   * Save a new resource
   * @param  \Illuminate\Http\Request  $request
   * @return \App\Model
   */
  public function doStore(Request $request){
    $resoruce = app($this->getEloquentResource());
    $data = $request->only($resoruce->getFillable());
    foreach ($data as $key => $value) {
      $resoruce->$key = $value;
    }
    $resoruce->save();

    $this->afterStore($resoruce, $request);
    return $resoruce;
  }

  /**
   * Return data to send to the view
   * 
   * @return array
   */
  public function getCreateResponse()
  {
    return [];
  }

  /**
   * Emited when a resource is stored
   */
  public function afterStore($resoruce, Request $request)
  {
    //
  }

  /**
   * Return the string contents of the view.
   * 
   * @return String
   */
  public function getCreateViewName()
  {
    return $this->viewPrefixName() . '/' . $this->createPageName;
  }
}
