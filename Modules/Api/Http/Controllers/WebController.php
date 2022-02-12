<?php

namespace Modules\Api\Http\Controllers;

use App\Services\WebService;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * WebController
 */
class WebController extends ApiController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $webService;

    /**
     * __construct
     *
     * @param  mixed $webService
     * @return void
     */
    public function __construct(WebService $webService)
    {
        parent::__construct();

        $this->webService = $webService;
    }

    /**
     * search vocabulary.
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchVocabulary($keyword)
    {
        $result = $this->webService->searchVocabulary($keyword);

        return $this->returnSuccess($result);
    }
}
