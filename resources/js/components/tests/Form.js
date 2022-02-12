import { toastSuccess, toastError } from '@/commons/helpers/toastHelper';
import ActionFormSubmit from '@/commons/components/ActionFormSubmit';
import GroupQuestion from '@/components/tests/GroupQuestion';
import { useHistory, useParams } from "react-router-dom";
import SelectForm from '@/commons/components/SelectForm';
import * as constCategory from '@/constants/categories';
import InputForm from '@/commons/components/InputForm';
import ErrorForm from '@/commons/components/ErrorForm';
import { getPartToeic } from '@/commons/helpers/toeic';
import * as apiCategories from '@/apis/categories';
import * as commonActions from '@/actions/commons';
import TabTest from '@/components/tests/TabTest';
import * as constTest from '@/constants/tests';
import * as dateUtils from '@/utils/dateUtils';
import { useState, useEffect } from 'react';
import { getBase64 } from '@/utils/string';
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux';
import * as apiBlogs from '@/apis/blogs';
import { ENV } from '@/constants/config';
import * as testApi from '@/apis/tests';
import { slug } from '@/utils/slug';

const Form = ({ type }) => {
  const [optionCategories, setOptionCategories] = useState([]);
  const [test, setTest] = useState(constTest.TEST_INIT);
  const [deleteObject, setObjectDelete] = useState({});
  const [optionBlogs, setOptionBlogs] = useState([]);
  const [isToeic, setIsToeic] = useState(false);
  const [errors, setError] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(async () => {
    dispatch(commonActions.setLoading(true));
    if (type != 'create') {
      const testData = await fetchDataTest();
      const isToeicTest = testData.category_id >= constCategory.TOEIC_P1
        && testData.category_id <= constCategory.TOEIC_FULL;
      setIsToeic(isToeicTest);
      setTest(testData);
    }
    await handleGetCategories();
    dispatch(commonActions.setLoading(false));
  }, []);

  useEffect(async () => {
    if (constCategory.GRAMMAR == test.category_id) await handleGetBlogs();
  }, [test.category_id])

  const fetchDataTest = async () => {
    const testData = await testApi.getTest(id);
    testData.group_questions = testData.group_questions.map(group => {
      if (group.image) group['image_old'] = group.image;
      if (group.audio) group['audio_old'] = group.audio;
      group.list_question = group.list_question.map(question => {
        if (question.image) question['image_old'] = question.image;
        if (question.audio) question['audio_old'] = question.audio;
        return question;
      })

      return group;
    });

    return testData;
  }

  const handleChange = async (value, name) => {
    let data = { ...test }
    if (name == 'title') data['slug'] = slug(value);
    if (name == 'category_id') {
      data['grammar_id'] = null;
      const dataGroups = generateGroupsQuestion(value);
      if (dataGroups) data['group_questions'] = dataGroups;
    }

    setTest({ ...data, [name]: value })
  }

  const generateGroup = (newGroup, partId) => {
    const groupQuestion = JSON.parse(JSON.stringify(newGroup));
    groupQuestion['part_id'] = partId;
    groupQuestion['id'] = partId;
    return groupQuestion;
  }

  const generateGroupsQuestion = (categoryId) => {
    const isToeicTest = categoryId >= constCategory.TOEIC_P1 && categoryId <= constCategory.TOEIC_FULL;
    setIsToeic(isToeicTest)
    if (type === 'create') {
      const newGroup = { ...constTest.GROUP_QUESTIONS };
      let dataGroups = [newGroup];

      if (isToeicTest) {
        dataGroups = getPartToeic(categoryId).map((partId) => {
          return generateGroup(newGroup, partId)
        });
      }

      return JSON.parse(JSON.stringify(dataGroups));
    }

    return null;
  }

  const handleGetCategories = async () => {
    const dataCategory = await apiCategories.getCategories({ per_page: -1, direction: 'asc' }, false);
    const listCategories = dataCategory.data.filter(cate => cate.id != constCategory.BLOG)
    const options = listCategories.map((category) => {
      return (
        <option value={category.id} key={category.id}>{category.name}</option>
      )
    });
    setOptionCategories(options);
  };

  const handleGetBlogs = async () => {
    dispatch(commonActions.setLoading(true));
    const dataGrammar = await apiBlogs.getBlogs({ per_page: -1, category_id: 1, direction: 'asc' }, false);
    const options = dataGrammar.data.map((grammar) => {
      return (
        <option value={grammar.id} key={grammar.id}>{grammar.title} ({grammar.tests_count})</option>
      )
    });

    setOptionBlogs(options);
    dispatch(commonActions.setLoading(false));
  };

  const createOrUpdate = async () => {
    const dataSubmit = await getDataTest();
    try {
      dispatch(commonActions.setLoading(true));
      setError({});
      if (type == "create") {
        await testApi.createTest(dataSubmit);
        toastSuccess('Thêm bài thi thành công');
      } else {
        await testApi.editTest({ ...dataSubmit, ...deleteObject });
        toastSuccess('Sửa bài thi thành công');
      }
      history.push(`${ENV.PREFIX_URL}/tests/list`);
    } catch (error) {
      console.error(error);
      setError(error.errors);
      findQuestionError(error.errors, dataSubmit);
    } finally {
      dispatch(commonActions.setLoading(false));
    }
  }

  const findQuestionError = (errors, dataSubmit) => {
    const regex = /\d+/g;
    const firstError = Object.keys(errors)[0];
    const matches = firstError.match(regex);
    if (!matches) return;
    const groupIndexError = matches[0];
    const questionError = Number(matches[1]) + 1;
    const groupError = dataSubmit['group_questions'][groupIndexError];
    if (groupError['part_id']) {
      toastError(`Câu số ${questionError} thuộc Part ${groupError['part_id']} có lỗi: ${errors[firstError]}`)
    }
  }

  const getDataTest = async () => {
    const testData = { ...test };
    const setDataBase64 = async (dataFile, typeFile, fileId) => {
      if (dataFile && !dataFile.includes(`/${typeFile}`)) {
        dataFile = await getBase64($(`#${fileId}`)[0].files[0]);
      }

      return dataFile;
    }

    const setListQuestions = async (questions, partId = '') => {
      questions = await Promise.all(
        questions.map(async question => {
          question.image = await setDataBase64(question.image, 'image', `image_question_${partId}_${question.id}`);
          question.audio = await setDataBase64(question.audio, 'audio', `audio_question_${partId}_${question.id}`);

          return question;
        })
      );
      return questions;
    }

    testData.group_questions = await Promise.all(
      test.group_questions.map(async group => {
        const partId = group.part_id || '';
        group.image = await setDataBase64(group.image, 'image', `image_group_${partId}_${group.id}`);
        group.audio = await setDataBase64(group.audio, 'audio', `audio_group_${partId}_${group.id}`);
        group.list_question = await setListQuestions(group.list_question, partId);

        return group;
      })
    );

    return testData;
  }

  const handleDelete = (name, id_delete) => {
    const dataDelete = deleteObject[name] || [];
    dataDelete.push(id_delete);
    setObjectDelete({
      ...deleteObject,
      [name]: dataDelete
    })
  }

  const isGrammar = constCategory.GRAMMAR == test.category_id;
  const isNationalHightSchool = constCategory.NATIONAL_HIGHT_SCHOOL == test.category_id;

  return (
    <div className="card-body form-test">
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <div className="form-group">
            <InputForm
              label="Tên bài thi"
              required
              value={test.title}
              disabled={type == 'detail'}
              handleChange={handleChange}
              name="title"
              placeholder="Nhập tên"
              error={errors.title}
            />
          </div>
          <div className="form-group">
            <SelectForm
              label="Danh mục"
              name="category_id"
              required
              value={test.category_id}
              error={errors.category_id}
              handleChange={handleChange}
              disabled={type == 'detail' || type == 'edit'}
              options={optionCategories}
            />
          </div>
        </div>
        <div className="col-md-6 col-xs-12">
          {!isNationalHightSchool &&
            <div className="form-group">
              <InputForm
                label="Tên không dấu"
                required
                value={test.slug}
                error={errors.slug}
                readonly={true}
                handleChange={handleChange}
              />
            </div>
          }
          {!isGrammar &&
            <div className="form-group">
              <>
                <label>Ngày tạo</label><br />
                <DatePicker
                  className="form-control"
                  disabled={type == 'detail'}
                  selected={test.date ? new Date(test.date) : new Date()}
                  dateFormat="dd-MM-yyyy"
                  onChange={(date) => handleChange(dateUtils.formatDate(date), 'date')}
                  placeholderText="Nhập ngày tạo"
                />
                <ErrorForm error={errors.date} />
              </>
            </div>
          }
          <div className="form-group">
            {isGrammar &&
              <SelectForm
                label="Ngữ pháp"
                name="grammar_id"
                value={test.grammar_id}
                error={errors.grammar_id}
                handleChange={handleChange}
                disabled={type == 'detail' || !test.category_id}
                options={optionBlogs}
              />
            }
            {isNationalHightSchool &&
              <InputForm
                label="Đối tượng"
                name="subject"
                value={test.subject}
                disabled={type == 'detail'}
                handleChange={handleChange}
                placeholder="Cho biết đề thi thuộc trường nào, mã đề, ..."
                error={errors.subject}
              />
            }
          </div>
        </div>
      </div>
      {isToeic &&
        <TabTest
          data={test}
          errors={errors}
          type={type}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      }
      {!isToeic &&
        <GroupQuestion
          data={test}
          errors={errors}
          disabled={type == 'detail'}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      }
      <ActionFormSubmit
        type={type}
        pathBack='tests/list'
        createOrUpdate={createOrUpdate}
      />
    </div>
  )
}

export default Form;
