import React, { useState, useEffect } from 'react';
import SelectForm from '@/commons/components/SelectForm';
import * as apiCategories from '@/apis/categories';
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
      keyword: '',
      category_id: '',
      author_id: '',
    })
  }

  return (
    <div id="searchArea" className="col-md-12 mt-2">
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>Nhập từ khóa</label>
            <input type="text" name="keyword"
              value={paramsSearch.keyword || ""}
              placeholder="Tên bài thi"
              className="form-control"
              onChange={({ target: { value, name } }) => handleChange(value, name)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <SelectForm
              label="Danh mục"
              name="category_id"
              value={paramsSearch.category_id}
              handleChange={handleChange}
              options={optionCategories}
            />
          </div>
        </div>
        <div className="col-md-4">
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