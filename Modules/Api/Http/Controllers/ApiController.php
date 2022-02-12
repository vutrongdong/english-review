<?php

namespace Modules\Api\Http\Controllers;

use App\Http\Controllers\BaseController;

class ApiController extends BaseController
{
    use ApiResponseTrait;

    protected $guard = 'api';

    public function __construct()
    {
        parent::__construct();

        // $this->middleware([
        //     'auth_api'
        // ]);
    }
}
