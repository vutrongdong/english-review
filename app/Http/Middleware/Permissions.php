<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;

class Permissions
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function handle($request, Closure $next, ...$permissions)
    {
        // check if user has permission
        if(in_array(authUser()->role, $permissions)) {
            return $next($request);
        }

        abort(404);
    }
}