<?php

namespace Modules\Api\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            'name' => ['required', 'string', 'between:3,50'],
            'email' => ['required', 'string', 'email', 'between:8,50', 'unique:users'],
            'password' => 'required|same:password|between:8,32|without_spaces|regex:/^[@$!%*#?&a-zA-Z0-9_\-]*$/',
            'password_confirmation' => 'required|same:password',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * message for field
     * @return string[]
     */
    public function messages()
    {
        return [

        ];
    }
}
