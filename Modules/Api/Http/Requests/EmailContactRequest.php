<?php

namespace Modules\Api\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailContactRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            'name' => ['required', 'between: 3,100'],
            'email' => ['required', 'email', 'max:255', 'regex:/[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/'],
            'phone' => ['required', 'numeric' ,'digits_between:9,11'],
            'content' => ['required', 'max:300']
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
            'name.required' => 'Tên là bắt buộc',
            'name.between' => 'Tên có độ dài trong khoảng 3 đến 100 ký tự',
            'email.required' => 'Email là bắt buộc',
            'email.email' => 'Email không hợp lệ',
            'email.regex' => 'Email không hợp lệ',
            'phone.required' => 'Bạn phải nhập số điện thoại',
            'phone.numeric' => 'Số điện thoại không đúng định dạng',
            'phone.digits_between' => 'Số điện thoại phải nằm trong khoảng 9 đến 11 ký tự',
            'content.required' => 'Nội dung là bắt buộc',
            'content.max' => 'Nội dung không quá 300 ký tự',
        ];
    }
}
