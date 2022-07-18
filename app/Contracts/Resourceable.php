<?php

namespace App\Contracts;

interface Resourceable
{
  /**
   * @return App/Model
   */
  public function getEloquentResource();

  /**
   * @return String
   */
  public function viewPrefixName();
}
