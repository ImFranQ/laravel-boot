<?php

namespace App\Traits;

use Illuminate\Http\Request;

/**
 * 
 */
trait IsEditable
{
  use HasRenderizableView;

  protected $editPageName = 'Edit';


  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    return $this->renderView(
      $this->getEditViewName(),
      $this->getEditResponse($id)
    );
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $resoruce = $this->getEloquentResource()::find($id);
    $data = $request->only($resoruce->getFillable());
    $resoruce->update($data);
    $this->afterUpdate($resoruce, $request);
    return redirect()->route($this->viewPrefixName() . '/' . $this->indexPageName);
  }

  /**
   * Return data to send to the view
   * 
   * @return array
   */
  public function getEditResponse($id)
  {
    return [];
  }

  /**
   * Emited when a resource is updated
   */
  public function afterUpdate($resoruce, Request $request)
  {
    //
  }

  /**
   * Return the string contents of the view.
   * 
   * @return String
   */
  public function getEditViewName()
  {
    return $this->viewPrefixName() . '/' . $this->editPageName;
  }
}
