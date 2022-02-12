import * as constCategory from '@/constants/categories';
import ErrorForm from '@/commons/components/ErrorForm';
import Questions from '@/components/tests/Questions';
import * as constTest from '@/constants/tests';
import Media from '@/components/tests/Media';

const GroupQuestion = ({ data, handleChange, errors, disabled, handleDelete, partId="" }) => {
  const addNewGroup = () => {
    const dataGroups = JSON.parse(JSON.stringify(data.group_questions))
    const newGroup = { ...constTest.GROUP_QUESTIONS };
    newGroup['id'] = getMaxIdGroup() + 1;
    if (partId) newGroup['part_id'] = partId;
    dataGroups.push(newGroup)
    setData(dataGroups)
  }

  const removeGroup = (group) => {
    let dataGroups = JSON.parse(JSON.stringify(data.group_questions))
    if (!group.isNew) handleDelete('group_delete_arr', group.id);
    dataGroups = dataGroups.filter(data => data.id !== group.id);
    setData(dataGroups);
  }

  const addNewQuestion = (groupId) => {
    const [indexGroup, group, dataGroups] = getGroup(groupId)
    const newQuestion = JSON.parse(JSON.stringify(constTest.DEFAULT_VALUE_QUESTION));
    newQuestion['id'] = getMaxIdQuestion() + 1;
    group.list_question.push(newQuestion);
    dataGroups[indexGroup] = group;
    setData(dataGroups);
  }

  const removeQuestion = (groupId, index) => {
    const [indexGroup, group, dataGroups] = getGroup(groupId)
    const question = group.list_question[index];
    if (!question.isNew) handleDelete('question_delete_arr', question.id)
    group.list_question.splice(index, 1);
    dataGroups[indexGroup] = group;
    setData(dataGroups);
  }

  const getMaxIdGroup = () => {
    const ids = (data?.group_questions || []).map((group) => {
      return group.id; 
    })

    return Math.max(...ids); 
  }
  const getMaxIdQuestion = () => {
    const ids = (data?.group_questions || []).map((group) => {
      const questionIds = group.list_question.map(question => question.id);
      return Math.max(...questionIds);
    });

    return Math.max(...ids);
  }

  const changeData = (dataGroup) => {
    const [indexGroup, group, dataGroups] = getGroup(dataGroup.id);
    if (!dataGroup.isNew) dataGroup['isEdit'] = true;
    dataGroups[indexGroup] = dataGroup;
    setData(dataGroups);
  }

  const setData = (dataGroups) => {
    const dataJson = JSON.parse(JSON.stringify(dataGroups));
    handleChange(dataJson, 'group_questions')
  }

  const getGroup = (groupId) => {
    const dataGroups = JSON.parse(JSON.stringify(data.group_questions))
    const indexGroup = dataGroups.findIndex(groupQ => groupQ.id == groupId);
    const group = JSON.parse(JSON.stringify(dataGroups[indexGroup]));

    return [indexGroup, group, dataGroups];
  }

  const groups = (data?.group_questions || []).filter(group => {
    if (!partId) return true;
    return group['part_id'] === partId;
  });
  
  const listGroupsQuestions = groups.map((group, index) => {
    const itemGroup = partId ? `${partId} - ${index + 1}` : index + 1;

    return (
      <div className="form-group group-question-box" key={group.id}>
        <label className="required">Nhóm câu hỏi ( Mục {itemGroup})</label>
        {(index == groups.length - 1 && !disabled) &&
          <button
            type="button"
            className="ml-3 btn btn-sm btn-info"
            onClick={() => addNewGroup()}
          >
            Thêm nhóm
          </button>
        }
        {(groups.length > 1 && !disabled) &&
          <button
            type="button"
            className="ml-3 btn btn-sm btn-danger"
            onClick={() => removeGroup(group)}
          >
            Xóa nhóm
          </button>
        }
        <div className="form-group">
          <textarea
            onChange={({ target: { value, name } }) => changeData({ ...group, [name]: value })}
            value={group.description || ''}
            disabled={disabled}
            className="form-control"
            placeholder="Nhóm các câu hỏi có ý nghĩa tương tự nhau"
            name="description" rows="2"
          />
          <ErrorForm error={errors[`group_questions.${index}.description`]} />
        </div>
        {(data.category_id >= constCategory.TOEIC_P1 && data.category_id <= constCategory.TOEIC_FULL)&&
          <Media 
            handleChange={(dataGroup) => changeData(dataGroup)}
            disabled={disabled}
            partId={group.part_id}
            type="group"
            data={group}
          />
        }
        <hr style={{ borderTop: '1px solid #1faba2' }} />
        <Questions
          group={group}
          addNewQuestion={addNewQuestion}
          removeQuestion={removeQuestion}
          handleChange={(dataGroup) => changeData(dataGroup)}
          errors={errors}
          groupIndex={index}
          disabled={disabled}
        />
      </div>
    )
  })

  return (
    <div className="groups_questions">
      {listGroupsQuestions}
    </div>
  )
}

export default GroupQuestion;
