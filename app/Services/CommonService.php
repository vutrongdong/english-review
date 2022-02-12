<?php

namespace App\Services;

use App\Models\City;
use App\Models\District;
/**
 * CommonService
 */
class CommonService
{
    /**
     * get all cities
     *
     * @return void
     */
    public function getCities()
    {
        return City::get();
    }

    /**
     * get districts by city_id
     *
     * @return void
     */
    public function getDistricts($city_id)
    {
        return District::where('city_id', $city_id)->get();
    }
}
