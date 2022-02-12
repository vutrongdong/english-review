<?php

namespace Modules\Api\Http\Controllers;

use App\Services\EmailService;
use Modules\Api\Http\Requests\EmailContactRequest;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * EmailController
 */
class EmailController extends ApiController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $emailService;

    /**
     * __construct
     *
     * @param  mixed $emailService
     * @return void
     */
    public function __construct(EmailService $emailService)
    {
        parent::__construct();

        $this->emailService = $emailService;
    }

    /**
     * send email contact.
     * @return \Illuminate\Http\JsonResponse
     */
    public function emailContact(EmailContactRequest $request)
    {
        $data = $request->only('name', 'email', 'phone', 'content');
        $this->emailService->sendEmailContact($data);

        return $this->returnSuccess();
    }
}
