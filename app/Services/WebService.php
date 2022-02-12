<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

/**
 * EmailService
 */
class WebService
{
    /**
     * send email contact
     *
     * @return void
     */
    public function searchVocabulary($keyword)
    {
        $dictionaryApi = config('app.dictionaryapi');
        $apiUS = $dictionaryApi . 'en_US/' . $keyword;
        $apiUK = $dictionaryApi . 'en_GB/' . $keyword;

        $resultUs = Http::get($apiUS)->json();
        $resultUK = Http::get($apiUK)->json();
        dd($resultUs, $resultUK);
    }
}
