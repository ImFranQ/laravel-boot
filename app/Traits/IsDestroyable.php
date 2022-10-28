<?php

namespace App\Traits;

/**
 * 
 */
trait IsDestroyable
{
  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    try{
      $this->getEloquentResource()::destroy($id);
    } catch (\Exception $e) {
      return back()->withErrors('An error occurred while deleting the resource.');
    }
    return back();
  }
}
