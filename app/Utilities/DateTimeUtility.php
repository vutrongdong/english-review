<?php

namespace App\Utilities;


use Carbon\Carbon;

class DateTimeUtility
{
    protected const DATE_DEFAULT_FORMAT = 'Y-m-d';
    protected const DATE_DOT_FORMAT = 'Y.m.d';
    protected const DATE_TIME_DEFAULT_FORMAT = 'Y-m-d H:i:s';
    protected const LOCALE = 'ja';

    /**
     * Date format default
     *
     * @param $strDate
     * @return string
     */
    public static function dateFormatDefault($strDate)
    {
        return self::dateFormat($strDate, self::DATE_DEFAULT_FORMAT);
    }
    
    /**
     * Format date with weekday
     *
     * @param $strDate
     * @return string
     */
    public static function formatDateWithWeekday($strDate)
    {
        $date = empty($strDate) ? '-' : self::dateFormat($strDate, self::DATE_DOT_FORMAT) . "（" . self::getMinWeekdayFromDateWithLocale($strDate) . "）";
        return $date;
    }
    
    /**
     * Get min weekday from date with locale
     *
     * @param $strDate
     * @param $locale
     * @return string
     */
    public static function getMinWeekdayFromDateWithLocale($strDate, $locale = self::LOCALE)
    {
        return empty($strDate) ? '-' : Carbon::parse($strDate)->locale($locale)->minDayName;
    }

    /**
     * Date string from format
     *
     * @param $strDate
     * @param $format
     * @return string
     */
    public static function dateFormat($strDate, $format){
        return empty($strDate)? '-' : Carbon::parse($strDate)->format($format);
    }

    public static function getDateTimeExpired ($expired = 0) {
        return (new Carbon())->addDay($expired)->format(self::DATE_TIME_DEFAULT_FORMAT);
    }

    public static function getDateExpired ($expired = 0) {
        return (new Carbon())->addDay($expired)->format(self::DATE_DEFAULT_FORMAT);
    }

    public static function getDateNow () {
        return date(self::DATE_DEFAULT_FORMAT);
    }
}
