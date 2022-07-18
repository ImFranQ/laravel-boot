<?php

namespace App\Traits;

/**
 * 
 */
trait IsIndexable
{
  use HasRenderizableView;

  protected $indexPageName = 'Index';

  /**
   * Display a view of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return $this->renderView(
      $this->getIndexViewName(),
      $this->getIndexResponse()
    );
  }

  /**
   * Return data to send to the view
   * 
   * @return array
   */
  public function getIndexResponse()
  {
    return [];
  }

  /**
   * Return the string contents of the view.
   * 
   * @return String
   */
  public function getIndexViewName(){
    return $this->viewPrefixName() . '/' . $this->indexPageName;
  }
}
