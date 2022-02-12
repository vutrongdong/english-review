<?php

namespace Modules\Api\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            'name' => ['required', 'unique:categories,name,' . $this->id, 'between: 3,200'],
            'slug' => ['required', 'between: 3,200'],
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
            'name.between' => 'Tên có độ dài trong khoảng 3 đến 200 ký tự',
            'name.unique' => 'Tên không được trùng',
            'slug.required' => 'Tên không dấu là bắt buộc',
            'slug.between' => 'Tên không dấu có độ dài trong khoảng 3 đến 200 ký tự',
        ];
    }
}
