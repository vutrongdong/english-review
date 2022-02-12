import SelectForm from '@/commons/components/SelectForm';
import InputForm from '@/commons/components/InputForm';
import * as constTest from '@/constants/tests';
import Media from '@/components/tests/Media';
import { useState, useEffect } from 'react';

const Questions = ({ group, addNewQuestion, removeQuestion, errors, groupIndex, disabled, handleChange }) => {
  const [optionResult, setOptionResult] = useState([])
  const listQuestion = group.list_question || []
  const changeData = (index, value, name) => {
    const newGroup = { ...group }
    newGroup.list_question[index][name] = value;
    if (!newGroup.list_question[index].isNew) {
      newGroup.list_question[index]['isEdit'] = true;
    }
    handleChange(newGroup)
  }

  useEffect(() => {
    getOptionResult()
  }, []);

  const getOptionResult = () => {
    const options = constTest.RESULT_QUESTIONS.map((option) => {
      return (
        <option value={option.value} key={option.value}>{option.label}</option>
      )
    });
    setOptionResult(options);
  };

  const listQuestions = listQuestion.map((question, index) => {
    const resultSelect = () => {
      return <div className="form-group m-2 result-question d-inline">
        <label className="required d-inline"></label>
        <SelectForm
          name="result"
          id="inline-block"
          value={question.result}
          error={errors[`group_questions.${groupIndex}.list_question.${index}.result`]}
          style={{ display: 'inline' }}
          showOptionBlank={false}
          handleChange={(value, name) => changeData(index, value, name)}
          disabled={disabled}
          options={optionResult}
        />
      </div>
    }

    const isVisible = group.part_id >= constTest.TOEIC_P1 && group.part_id <= constTest.TOEIC_FULL;
    const showUploadFile = group.part_id >= constTest.TOEIC_P1 && group.part_id <= constTest.TOEIC_P2;

    return (
      <div key={question.id} className="question-box mt-2">
        <div>
          <label className="text-info p-1">Câu {index + 1}:</label>
          <div className="form-group m-2 d-inline">
            <label className="required d-inline"></label>
            <textarea
              onChange={({ target: { value, name } }) => changeData(index, value, name)}
              value={question.title || ''}
              placeholder="Nhập câu hỏi"
              disabled={disabled}
              className="form-control" id="title-question"
              name="title" rows="1"
            />
          </div>
          {(index == listQuestion.length - 1 && !disabled) &&
            <button
              type="button"
              className="m-2 btn btn-sm btn-success"
              onClick={() => addNewQuestion(group.id)}
            >
              <i className="fas fa-plus-square"></i>
            </button>
          }
          {(listQuestion.length > 1 && !disabled) &&
            <button
              type="button"
              className="m-2 btn btn-sm btn-danger"
              onClick={() => removeQuestion(group.id, index)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          }
        </div>
        {(showUploadFile) &&
          <div className='ml-2'>
            <Media
              handleChange={(value, name) => changeData(index, value, name)}
              disabled={disabled}
              partId={group.part_id}
              type="question"
              data={question}
            />
          </div>
        }
        <div className="list-group-question row">
          <div className="form-group m-2 width_question">
            <label className="required d-inline">A </label>
            <InputForm
              disabled={disabled}
              placeholder="Nhập câu A"
              value={question.answer_a}
              error={errors[`group_questions.${groupIndex}.list_question.${index}.answer_a`]}
              handleChange={(value, name) => changeData(index, value, name)}
              name="answer_a"
            />
          </div>
          <div className="form-group m-2 width_question">
            <label className="required d-inline">B </label>
            <InputForm
              disabled={disabled}
              placeholder="Nhập câu B"
              error={errors[`group_questions.${groupIndex}.list_question.${index}.answer_b`]}
              value={question.answer_b}
              handleChange={(value, name) => changeData(index, value, name)}
              name="answer_b"
            />
          </div>
          <div className="form-group m-2 width_question">
            <label className="required d-inline">C </label>
            <InputForm
              disabled={disabled}
              placeholder="Nhập câu C"
              error={errors[`group_questions.${groupIndex}.list_question.${index}.answer_c`]}
              value={question.answer_c}
              handleChange={(value, name) => changeData(index, value, name)}
              name="answer_c"
            />
          </div>
          <div className="form-group m-2 width_question">
            <label className="required d-inline">D </label>
            <InputForm
              disabled={disabled}
              placeholder="Nhập câu D"
              error={errors[`group_questions.${groupIndex}.list_question.${index}.answer_d`]}
              value={question.answer_d}
              handleChange={(value, name) => changeData(index, value, name)}
              name="answer_d"
            />
          </div>
          {resultSelect()}
        </div>
        {!isVisible &&
          <div className="form-group m-2">
            <label>Giải thích:</label>
            <textarea
              onChange={({ target: { value, name } }) => changeData(index, value, name)}
              value={question.explain || ''}
              disabled={disabled}
              placeholder="Giải thích tại sao lại có kết quả như vậy"
              className="form-control" id="explain-question"
              name="explain" rows="1"
            />
          </div>
        }
      </div>
    )
  })

  return (
    <div className="list_questions">
      {listQuestions}
    </div>
  )
}

export default Questions