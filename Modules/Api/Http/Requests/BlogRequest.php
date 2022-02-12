<?php

namespace Modules\Api\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        $rules = [
            'title' => ['required', 'unique:blogs,title,' . $this->id, 'between: 3,200'],
            'slug' => ['required', 'between: 3,200'],
            'category_id' => ['required'],
            'content' => ['required'],
            'description' => ['nullable', 'max:255']
        ];

        return $rules;
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
            'title.required' => 'Tiêu đề là bắt buộc',
            'title.between' => 'Tiêu đề có độ dài trong khoảng 3 đến 200 ký tự',
            'title.unique' => 'Tiêu đề không được trùng',
            'slug.required' => 'Tiêu đề không dấu là bắt buộc',
            'slug.between' => 'Tiêu đề không dấu có độ dài trong khoảng 3 đến 200 ký tự',
            'category_id.required' => 'Bạn phải chọn một danh mục',
            'description.max' => 'Mô tả có độ dài tối đa 255 ký tự',
            'content.required' => 'Nội dung là bắt buộc',
        ];
    }
}
