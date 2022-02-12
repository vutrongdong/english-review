<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

/**
 * Miyahara Base Controller
 */
class BaseController extends Controller
{
    protected $user = null;
    protected $guard = 'web';

    public function __construct(){
        $this->middleware(function ($request, $next) {
            $this->user = Auth::guard($this->guard)->user();

            return $next($request);
        });
    }
}
