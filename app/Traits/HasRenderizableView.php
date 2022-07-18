<?php
namespace App\Traits;

use Inertia\Inertia;

trait HasRenderizableView
{
  private function renderView($view, $data = [])
  {
    return Inertia::render($view, $data);
  }
}
