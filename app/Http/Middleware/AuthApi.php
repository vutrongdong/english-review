<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthApi
{
    const CODE = 401;
    const MESSAGE = 'Unauthorized';

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return response()->json(['message' => self::MESSAGE], self::CODE);
        }

        return $next($request);
    }
}
