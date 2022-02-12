<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Mockery\Exception;
use Illuminate\Http\Response;

class DBTransaction
{
    /**
    * Handle an incoming request.
    *
    * @param \Illuminate\Http\Request $request
    * @param \Closure $next
    * @return mixed
    */
    public function handle($request, Closure $next)
    {
        DB::beginTransaction();

        $response = $next($request);

        if((property_exists($response, 'exception') && $response->exception) || ($response instanceof Response && $response->getStatusCode() > 399)) {
            Log::error($response->exception);
            Log::info('has error');
            DB::rollBack();
        } else {
            DB::commit();
        }

        return $response;
    }
}
