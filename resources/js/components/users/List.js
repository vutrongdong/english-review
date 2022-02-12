import ConfirmDelete from '@/commons/components/ConfirmDelete';
import ActionTable from '@/commons/components/ActionTable';
import SortTable from '@/commons/components/SortTable';
import { useDispatch, useSelector } from 'react-redux';
import { BodyTable } from '@/commons/utils/BodyTable';
import Paginate from '@/commons/components/Paginate';
import React, { useEffect, useState } from 'react';
import * as actionUsers from '@/actions/users';
import Search from '@/components/users/Search';
import { NavLink } from 'react-router-dom';
import useParams from '@/hooks/useParams';
import { ENV } from '@/constants/config';

const List = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const initParams = useParams();
  const [params, setParams] = useState(initParams);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [paramsSearch, setParamsSearch] = useState(initParams);
  const isShowFormSearch = (paramsSearch.keyword || paramsSearch.city_id || paramsSearch.district_id);
  const [showFormSearch, setShowFormSearch] = useState(isShowFormSearch);

  useEffect(() => {
    dispatch(actionUsers.getUsers(params))
  }, [params]);

  useEffect(() => {
    document.title = "Danh sách người dùng";
  }, []);

  const handleChangePage = (page) => {
    setValue({ page });
  };

  const handleChangePerpage = (per_page) => {
    setValue({ per_page, page: 1 });
  };

  const setValue = (value) => {
    setParams({
      ...params,
      ...value
    });
  };

  const showModalDelete = (id) => {
    setUserId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(actionUsers.deleteUser(userId))
  }

  const handleChangeParamsSearch = (params) => {
    setParamsSearch(params);
  }

  const handleSearch = () => {
    setValue({
      ...paramsSearch,
      page: 1
    });
  }

  const tbody = (users.data || []).map((user, index) => {
    return (
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.city?.name}</td>
        <td>{user.district?.name}</td>
        <ActionTable
          showModalDelete={() => showModalDelete(user.id)}
          pathDetail={`users/detail/${user.id}`}
          pathEdit={`users/edit/${user.id}`}
        />
      </tr>
    )
  });

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Danh sách người dùng
          <NavLink to={{ pathname: `${ENV.PREFIX_URL}/users/create` }} className="btn btn-sm btn btn-success ml-1">
            <i className="far fa-plus-square mr-1"></i>Thêm mới
          </NavLink>
        </div>
        <div className="action" style={{ float: 'right' }}>
          <button type="button" className="btn btn-sm btn btn-info mr-1" onClick={() => setShowFormSearch(!showFormSearch)}>
            <i className="fas fa-search mr-1"></i>Tìm kiếm
          </button>
        </div>
      </div>

      <div className="main-wrapper card">
        <Search
          showFormSearch={showFormSearch}
          paramsSearch={paramsSearch}
          handleChangeParamsSearch={handleChangeParamsSearch}
          handleSearch={handleSearch}
        />
        <div className="card-body pt-1">
          <div className="table-responsive">
            <table className="table table-hover table-striped my-2 text-nowrap">
              <thead className="small">
                <tr>
                  <th>Tên <SortTable params={params} name="name" handleSort={setValue} /></th>
                  <th>Email <SortTable params={params} name="email" handleSort={setValue} /></th>
                  <th>Số điện thoại <SortTable params={params} name="phone" handleSort={setValue} /></th>
                  <th>TỈnh, thành phố</th>
                  <th>Quận, huyện</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              {BodyTable(tbody)}
            </table>
          </div>
          <Paginate
            className="mt-3"
            data={users}
            perPage={params.per_page}
            handleChangePage={handleChangePage}
            handleChangePerpage={handleChangePerpage}
          />
        </div>
      </div>
      <ConfirmDelete
        handleDelete={() => handleDelete()}
        handleClose={() => setShowDeleteModal(false)}
        showDeleteModal={showDeleteModal}
      />
    </div>
  )
}

export default List