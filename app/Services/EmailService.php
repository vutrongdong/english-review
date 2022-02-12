<?php

namespace App\Services;
use App\Jobs\SendContactEmail;

/**
 * EmailService
 */
class EmailService
{
    /**
     * send email contact
     *
     * @return void
     */
    public function sendEmailContact($data)
    {
        $emailJob = new SendContactEmail($data);
        dispatch($emailJob);
    }
}
