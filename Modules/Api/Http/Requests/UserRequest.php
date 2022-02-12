<?php

namespace Modules\Api\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            'name' => ['required', 'between: 3,32'],
            'address' => ['required'],
            'phone' => ['required', 'numeric' ,'digits_between:9,11'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $this->id, 'regex:/[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/'],
            'city_id' => ['required'],
            'district_id' => ['required'],
            'address' => ['required'],
            'date_of_birth' => ['nullable','date_format:Y-m-d','before:today'],
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
            'name.between' => 'Tên có độ dài trong khoảng 3 đến 32 ký tự',
            'email.required' => 'Email là bắt buộc',
            'email.email' => 'Email không hợp lệ',
            'email.regex' => 'Email không hợp lệ',
            'email.unique' => 'Email này đã tồn tại trên hệ thông',
            'phone.required' => 'Bạn phải nhập số điện thoại',
            'phone.numeric' => 'Số điện thoại không đúng định dạng',
            'phone.digits_between' => 'Số điện thoại phải nằm trong khoảng 9 đến 11 ký tự',
            'city_id.required' => 'Bạn phải chọn một tỉnh, thành phố',
            'district_id.required' => 'Bạn phải chọn một quận, huyện',
            'address.required' => 'Bạn phải nhập địa chỉ',
            'date_of_birth.date_format' => 'Ngày sinh không đúng định dạng',
            'date_of_birth.before' => 'Ngày sinh không được lớn hơn hoặc bằng ngày hiện tại',
        ];
    }
}
