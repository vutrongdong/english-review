import ConfirmDelete from '@/commons/components/ConfirmDelete';
import { toastError } from '@/commons/helpers/toastHelper';
import ActionTable from '@/commons/components/ActionTable';
import SortTable from '@/commons/components/SortTable';
import { useDispatch, useSelector } from 'react-redux';
import { BodyTable } from '@/commons/utils/BodyTable';
import Paginate from '@/commons/components/Paginate';
import React, { useEffect, useState } from 'react';
import Search from '@/components/tests/Search';
import * as actionTests from '@/actions/tests';
import { NavLink } from 'react-router-dom';
import useParams from '@/hooks/useParams';
import { ENV } from '@/constants/config';
import * as testApi from '@/apis/tests';

const List = () => {
  const dispatch = useDispatch();
  const tests = useSelector(state => state.tests);
  const initParams = useParams();
  const [params, setParams] = useState(initParams);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testId, setTestId] = useState(null);
  const [paramsSearch, setParamsSearch] = useState(initParams);
  const isShowFormSearch = (paramsSearch.keyword || paramsSearch.category_id || paramsSearch.author_id);
  const [showFormSearch, setShowFormSearch] = useState(isShowFormSearch);

  useEffect(() => {
    dispatch(actionTests.getTests(params))
  }, [params]);

  useEffect(() => {
    document.title = "Danh sách bài thi";
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
    setTestId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    try {
      await testApi.deleteTest(testId);
      handleChangePage(1) // get data from page one
    } catch (error) {
      console.error(error)
      toastError('Bạn không được phép xóa bài thi này');
    }
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

  const tbody = (tests.data || []).map((test, index) => {
    return (
      <tr key={index}>
        <td>{test.id}</td>
        <td>{test.title}</td>
        <td>{test.totalQuestion}</td>
        <td>{test.category?.name}</td>
        <td>{test.grammar?.title}</td>
        <td>{test.author.name}</td>
        <ActionTable
          showModalDelete={() => showModalDelete(test.id)}
          pathDetail={`tests/detail/${test.id}`}
          pathEdit={`tests/edit/${test.id}`}
        />
      </tr>
    )
  });

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Danh sách bài thi
          <NavLink to={{ pathname: `${ENV.PREFIX_URL}/tests/create` }} className="btn btn-sm btn btn-success ml-1">
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
                  <th>Id</th>
                  <th>Tên bài thi <SortTable params={params} name="title" handleSort={setValue} /></th>
                  <th>Số câu</th>
                  <th>Danh mục</th>
                  <th>Danh mục con</th>
                  <th>Người tạo</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              {BodyTable(tbody)}
            </table>
          </div>
          <Paginate
            className="mt-3"
            data={tests}
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