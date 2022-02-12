<?php

namespace Modules\Api\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            'title' => ['required', 'between: 3,255', 'unique:tests,title,' . $this->id, 'between: 3,200'],
            'category_id' => ['required'],
            // 'group_questions.*.description' => ['required'], 
            'group_questions.*.list_question.*.answer_a' => ['required'], 
            'group_questions.*.list_question.*.answer_b' => ['required'], 
            // 'group_questions.*.list_question.*.answer_c' => ['required'], 
            // 'group_questions.*.list_question.*.answer_d' => ['required'], 
            'group_questions.*.list_question.*.result' => ['required']
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
            'title.required' => 'Tiêu đề  bài thi là bắt buộc',
            'title.between' => 'Tiêu đề  bài thi có độ dài trong khoảng 3 đến 255 ký tự',
            'title.unique' => 'Bài thi này đã tồn tại trên hệ thông',
            'category_id.required' => 'Bạn phải chọn một danh mục',
            'group_questions.*.description.required' => 'Bạn phải nhập phần nhóm câu hỏi',
            'group_questions.*.list_question.*.answer_a.required' => 'Bạn phải nhập câu a',
            'group_questions.*.list_question.*.answer_b.required' => 'Bạn phải nhập câu b',
            'group_questions.*.list_question.*.answer_c.required' => 'Bạn phải nhập câu c',
            'group_questions.*.list_question.*.answer_d.required' => 'Bạn phải nhập câu d',
            'group_questions.*.list_question.*.result.required' => 'Bạn phải chọn đáp án',
        ];
    }
}
