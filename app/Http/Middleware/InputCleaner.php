<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class InputCleaner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $data = collect($request->all());
        $newData = $data->filter(fn ($item) => $item != null);
        $request->replace($newData->all());
        return $next($request);
    }
}
