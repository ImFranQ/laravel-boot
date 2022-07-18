<?php

namespace App\Traits;

/**
 * 
 */
trait IsShowable
{
  use HasRenderizableView;

  protected $showPageName = 'Show';

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    return $this->renderView(
      $this->getShowViewName(),
      $this->getShowResponse($id)
    );
  }

  /**
   * Return data to send to the view
   * 
   * @return array
   */
  public function getShowResponse($id)
  {
    return [];
  }

  /**
   * Return the string contents of the view.
   * 
   * @return String
   */
  public function getShowViewName()
  {
    return $this->viewPrefixName() . '/' . $this->showPageName;
  }
}
