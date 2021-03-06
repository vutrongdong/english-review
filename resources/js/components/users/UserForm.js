import ActionFormSubmit from '@/commons/components/ActionFormSubmit';
import { toastSuccess } from '@/commons/helpers/toastHelper';
import { useHistory, useParams } from "react-router-dom";
import SelectForm from '@/commons/components/SelectForm';
import InputForm from '@/commons/components/InputForm';
import ErrorForm from '@/commons/components/ErrorForm';
import * as dateUtils from '@/utils/dateUtils';
import * as commonApi from '@/apis/commons';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import { ENV } from '@/constants/config';
import * as userApi from '@/apis/users';

const UserForm = ({ type }) => {
  const cities = useSelector(state => state.commons.cities);
  const [districts, setDistricts] = useState([]);
  const [optionDistricts, setOptionDistricts] = useState([]);
  const [user, setUser] = useState({});
  const [errors, setError] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const options = districts.map((district) => {
      return (
        <option value={district.id} key={district.id}>{district.name}</option>
      )
    });
    setOptionDistricts(options);
  }, [districts]);

  useEffect(async () => {
    if (type != 'create') {
      const userData = await userApi.getUser(id);
      setUser(userData);
      getDistricts(userData.city_id);
    }
  }, []);

  const optionCities = cities.map(city => {
    return (
      <option value={city.id} key={city.id}>{city.name}</option>
    )
  });

  const handleChange = async (value, name) => {
    // set value for districts
    let userData = { ...user }
    if (name == 'city_id') {
      getDistricts(value);
      userData['district_id'] = null;
    }
    setUser({
      ...userData,
      [name]: value
    })
  }

  const getDistricts = async (value) => {
    let dataDistricts = [];
    if (value) {
      dataDistricts = await commonApi.getDistricts(value);
    }
    setDistricts(dataDistricts);
  }

  const createOrUpdate = async () => {
    try {
      if (type == "create") {
        await userApi.createUser(user);
        toastSuccess('Th??m ng?????i d??ng th??nh c??ng');
      } else {
        await userApi.editUser(user);
        toastSuccess('S???a ng?????i d??ng th??nh c??ng');
      }
      history.push(`${ENV.PREFIX_URL}/users/list`);
    } catch (error) {
      console.error(error);
      setError(error.errors);
    }
  }

  return (
    <div className="card-body">
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <div className="form-group">
            <InputForm
              label="T??n"
              required
              value={user.name}
              disabled={type == 'detail'}
              handleChange={handleChange}
              name="name"
              placeholder="Nh???p t??n"
              error={errors.name}
            />
          </div>
          <div className="form-group">
            <InputForm
              label="Email"
              required
              value={user.email}
              disabled={type == 'detail'}
              handleChange={handleChange}
              name="email"
              placeholder="Nh???p email"
              error={errors.email}
            />
          </div>
          <div className="form-group">
            <InputForm
              label="S??? ??i???n tho???i"
              required
              type="number"
              value={user.phone}
              disabled={type == 'detail'}
              handleChange={handleChange}
              name="phone"
              placeholder="Nh???p s??? ??i???n tho???i"
              error={errors.phone}
            />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <label>Ng??y sinh</label><br />
                <DatePicker
                  className="form-control" disabled={type == 'detail'}
                  selected={user.date_of_birth ? new Date(user.date_of_birth) : ''}
                  dateFormat="dd-MM-yyyy"
                  onChange={(date) => handleChange(dateUtils.formatDate(date), 'date_of_birth')}
                  placeholderText="Nh???p ng??y sinh"
                />
                <ErrorForm error={errors.date_of_birth} />
              </div>
              <div className="col-md-6 col-xs-12">
                <label>Tr???ng th??i</label>
                <select name="status" className="form-control"
                  value={user.status || 1} disabled={type == 'detail'}
                  onChange={({ target: { value, name } }) => handleChange(value, name)}
                >
                  <option value="0">Ch??a k??ch ho???t</option>
                  <option value="1">??ang ho???t ?????ng</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xs-12">
          <div className="form-group">
            <InputForm
              label="?????a ch???"
              required
              value={user.address}
              disabled={type == 'detail'}
              handleChange={handleChange}
              name="address"
              placeholder="Nh???p ?????a ch???"
              error={errors.address}
            />
          </div>
          <div className="form-group">
            <SelectForm
              label="T???nh, Th??nh ph???"
              name="city_id"
              required
              value={user.city_id}
              disabled={type == 'detail'}
              handleChange={handleChange}
              options={optionCities}
              error={errors.city_id}
            />
          </div>
          <div className="form-group">
            <SelectForm
              label="Qu???n, Huy???n"
              name="district_id"
              required
              value={user.district_id}
              disabled={!user.city_id || type == 'detail'}
              handleChange={handleChange}
              options={optionDistricts}
              error={errors.district_id}
            />
          </div>
          <div className="form-group">
            <label>Gi???i t??nh</label>
            <select name="gender" className="form-control"
              value={user.gender || 1} disabled={type == 'detail'}
              onChange={({ target: { value, name } }) => handleChange(value, name)}
            >
              <option value={0}>N???</option>
              <option value={1}>Nam</option>
            </select>
          </div>
        </div>
      </div>
      <ActionFormSubmit
        type={type}
        pathBack='users/list'
        createOrUpdate={createOrUpdate}
      />
    </div>
  )
}

export default UserForm;
