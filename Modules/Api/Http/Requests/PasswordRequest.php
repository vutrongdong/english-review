<?php

namespace Modules\Api\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            'current_password' => 'required',
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
            'password.regex' => 'Tên không được trùng',
            'current_password.required' => 'Mật khẩu hiện tại là bắt buộc',
            'password.required' => 'Mật khẩu là bắt buộc',
            'password.without_spaces' => 'Mật khẩu không được chứa khoảng trắng',
            'password.same' => 'Mật khẩu không khớp',
            'password.between' => 'Mật khẩu có độ dài trong khoảng 8 đến 32 ký tự',
            'password_confirm.required' => 'Nhập lại mật khẩu là bắt buộc',
            'password_confirm.same' => 'Mật khẩu không khớp',
            'password.regex' => 'Mật khẩu chứa các ký tự không hợp lệ'
        ];
    }
}
