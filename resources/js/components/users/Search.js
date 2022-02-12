import React, { useState, useEffect } from 'react';
import * as commonApi from '@/apis/commons';
import { useSelector } from 'react-redux';

const Search = ({ showFormSearch, paramsSearch, handleChangeParamsSearch, handleSearch }) => {
  if (!showFormSearch) return (<></>);
  const cities = useSelector(state => state.commons.cities);
  const [districts, setDistricts] = useState([]);
  const [optionDistricts, setOptionDistricts] = useState([]);

  useEffect(() => {
    const options = districts.map((district) => {
      return (
        <option value={district.id} key={district.id}>{district.name}</option>
      )
    });
    setOptionDistricts(options);
  }, [districts]);

  useEffect(() => {
    if (paramsSearch.city_id) {
      handleChange(paramsSearch.city_id, 'city_id');
    }
  }, [showFormSearch])

  const optionCities = cities.map(city => {
    return (
      <option value={city.id} key={city.id}>{city.name}</option>
    )
  });

  const handleChange = async (value, name) => {
    handleChangeParamsSearch({
      ...paramsSearch,
      [name]: value
    })
    // set value for districts
    if (name == 'city_id') {
      let dataDistricts = [];
      if (value) {
        dataDistricts = await commonApi.getDistricts(value);
      }
      setDistricts(dataDistricts);
    }
  }

  const handleReset = () => {
    setDistricts([])
    handleChangeParamsSearch({
      city_id: '',
      keyword: '',
      district_id: ''
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
              placeholder="Tên, số điện thoại, email, ..."
              className="form-control"
              onChange={({ target: { value, name } }) => handleChange(value, name)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>Tỉnh, Thành phố</label>
            <select name="city_id" className="form-control"
              value={paramsSearch.city_id || ""}
              onChange={({ target: { value, name } }) => handleChange(value, name)}
            >
              <option value=""></option>
              {optionCities}
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>Quận, Huyện</label>
            <select name="district_id" className="form-control"
              value={paramsSearch.district_id}
              onChange={({ target: { value, name } }) => handleChange(value, name)}
            >
              <option value=""></option>
              {optionDistricts}
            </select>
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
