import SelectForm from '@/commons/components/SelectForm';
import InputForm from '@/commons/components/InputForm';
import * as apiCategories from '@/apis/categories';
import { useState, useEffect } from 'react';
import * as apiUsers from '@/apis/users';

const Search = ({ showFormSearch, paramsSearch, handleChangeParamsSearch, handleSearch }) => {
  if (!showFormSearch) return (<></>);
  const [optionUsers, setOptionUsers] = useState([]);
  const [optionCategories, setOptionCategories] = useState([]);

  useEffect(async () => {
    await handleGetAuthors();
    await handleGetCategories();
  }, []);

  const handleGetAuthors = async () => {
    const dataUser = await apiUsers.getUsers({ per_page: -1 }, false);
    const options = dataUser.data.map((user) => {
      return (
        <option value={user.id} key={user.id}>{user.name}</option>
      )
    });
    setOptionUsers(options);
  };

  const handleGetCategories = async () => {
    const dataCategory = await apiCategories.getCategories({ per_page: -1 }, false);
    const options = dataCategory.data.map((category) => {
      return (
        <option value={category.id} key={category.id}>{category.name}</option>
      )
    });
    setOptionCategories(options);
  };

  const handleChange = async (value, name) => {
    handleChangeParamsSearch({
      ...paramsSearch,
      [name]: value
    })
  }

  const handleReset = () => {
    handleChangeParamsSearch({
      title: '',
      active: '',
      category_id: '',
      author_id: '',
    })
  }

  return (
    <div id="searchArea" className="col-md-12 mt-2">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <InputForm
              label="Nhập tiêu đề"
              value={paramsSearch.title}
              handleChange={handleChange}
              name="title"
              placeholder="Tiêu đề"
            />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <select name="active" className="form-control"
              value={paramsSearch.active || ""}
              onChange={({ target: { value, name } }) => handleChange(value, name)}
            >
              <option value=""></option>
              <option value={0}>Ẩn</option>
              <option value={1}>Hiển thị</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <SelectForm
              label="Danh mục"
              name="category_id"
              value={paramsSearch.category_id}
              handleChange={handleChange}
              options={optionCategories}
            />
          </div>
          <div className="form-group">
            <SelectForm
              label="Tác giả"
              name="author_id"
              value={paramsSearch.author_id}
              handleChange={handleChange}
              options={optionUsers}
            />
          </div>
        </div>
      </div>
      <div className="text-center mb-3">
        <button className="btn btn-default mr-1" type="button" onClick={() => handleReset()}>Làm mới</button>
        <button className="btn btn-success" type="submit" onClick={() => handleSearch()}>Tìm kiếm</button>
      </div>
    </div>
  )
}

export default Search