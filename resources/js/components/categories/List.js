import React, { useEffect, useState } from 'react';
import { ENV } from '@/constants/config';
import useParams from '@/hooks/useParams';
import { NavLink } from 'react-router-dom';
import Search from '@/components/categories/Search';
import Paginate from '@/commons/components/Paginate';
import { BodyTable } from '@/commons/utils/BodyTable';
import { useDispatch, useSelector } from 'react-redux';
import SortTable from '@/commons/components/SortTable';
import * as actionCategories from '@/actions/categories';
import ActionTable from '@/commons/components/ActionTable';
import ConfirmDelete from '@/commons/components/ConfirmDelete';

const List = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const initParams = useParams();
  const [params, setParams] = useState(initParams);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [paramsSearch, setParamsSearch] = useState(initParams);
  const isShowFormSearch = (paramsSearch.name || paramsSearch.slug);
  const [showFormSearch, setShowFormSearch] = useState(isShowFormSearch);

  useEffect(() => {
    dispatch(actionCategories.getCategories(params))
  }, [params]);

  useEffect(() => {
    document.title = "Danh sách danh mục";
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
    setCategoryId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(actionCategories.deleteCategory(categoryId))
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

  const tbody = (categories.data || []).map((category, index) => {
    return (
      <tr key={index}>
        <td>{category.name}</td>
        <td>{category.slug}</td>
        <ActionTable
          showModalDelete={() => showModalDelete(category.id)}
          pathDetail={`categories/detail/${category.id}`}
          pathEdit={`categories/edit/${category.id}`}
        />
      </tr>
    )
  });

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Danh sách danh mục
          <NavLink to={{ pathname: `${ENV.PREFIX_URL}/categories/create` }} className="btn btn-sm btn btn-success ml-1">
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
                  <th>Tên không dấu</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              {BodyTable(tbody)}
            </table>
          </div>
          <Paginate
            className="mt-3"
            data={categories}
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

export default List;