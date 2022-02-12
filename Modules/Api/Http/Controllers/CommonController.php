<?php

namespace Modules\Api\Http\Controllers;

use App\Services\CommonService;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
/**
 * CommonController
 */
class CommonController extends ApiController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $commonService;

    /**
     * __construct
     *
     * @param  mixed $commonService
     * @return void
     */
    public function __construct(CommonService $commonService)
    {
        parent::__construct();

        $this->commonService = $commonService;
    }

    /**
     * get all cities
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCities()
    {
        $cities = $this->commonService->getCities();

        return $this->returnSuccess($cities);
    }

    /**
     * get districts by city id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDistricts($city_id)
    {
        $districts = $this->commonService->getDistricts($city_id);

        return $this->returnSuccess($districts);
    }
}
