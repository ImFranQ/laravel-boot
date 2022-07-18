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
    $this->getEloquentResource()::destroy($id);
    return back();
  }
}
