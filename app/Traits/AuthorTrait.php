<?php
namespace App\Traits;

use App\Observers\AuthorObserver;

trait AuthorTrait
{
    public static function bootAuthorTrait()
    {
        self::observe(AuthorObserver::class);
    }
}