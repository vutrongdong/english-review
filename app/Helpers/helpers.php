<?php

use Illuminate\Support\Facades\Auth;

/**
 * Get current user login
 *
 * @return App\Models\User
 */
function authUser()
{
    if ($user = Auth::user()) {
        return $user;
    }
}

/**
 * Get current user login api
 *
 * @return App\Models\User
 */
function authApi()
{
    if ($user = auth()->guard('api')->user()) {
        return $user;
    }
}

/**
 * Date format default
 *
 * @param $strDate
 * @return string (ex: 2020-10-15)
 */
function dateFormatDefault($strDate){

    return \App\Utilities\DateTimeUtility::dateFormatDefault($strDate);
}

/**
 * Date format with weekday
 *
 * @param $strDate
 * @return string (ex: 2021.1.21 （日）)
 */
function formatDateWithWeekday($strDate)
{
    return \App\Utilities\DateTimeUtility::formatDateWithWeekday($strDate);
}