import React, { useEffect, useState } from 'react';
import { ENV } from '@/constants/config';
import useParams from '@/hooks/useParams';
import { NavLink } from 'react-router-dom';
import Search from '@/components/blogs/Search';
import * as actionBlogs from '@/actions/blogs';
import * as commonActions from '@/actions/commons';
import Paginate from '@/commons/components/Paginate';
import { BodyTable } from '@/commons/utils/BodyTable';
import { useDispatch, useSelector } from 'react-redux';
import SortTable from '@/commons/components/SortTable';
import ActionTable from '@/commons/components/ActionTable';
import ConfirmDelete from '@/commons/components/ConfirmDelete';

const List = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const initParams = useParams();
  const [params, setParams] = useState(initParams);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogId, setBlogId] = useState(null);
  const [paramsSearch, setParamsSearch] = useState(initParams);
  const isShowFormSearch = (paramsSearch.title || paramsSearch.active || paramsSearch.category_id || paramsSearch.author_id);
  const [showFormSearch, setShowFormSearch] = useState(isShowFormSearch);

  useEffect(async () => {
    dispatch(commonActions.setLoading(true));
    await dispatch(actionBlogs.getBlogs(params));
    dispatch(commonActions.setLoading(false));
  }, [params]);

  useEffect(() => {
    document.title = "Danh sách bài viết";
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
    setBlogId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(actionBlogs.deleteBlog(blogId))
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

  const tbody = (blogs.data || []).map((blog, index) => {
    return (
      <tr key={index}>
        <td>{blog.id}</td>
        <td>{blog.title}</td>
        <td>{blog.active ? 'Hiển thị' : 'Ẩn'}</td>
        <td>{blog.tests_count}</td>
        <td>{blog.category?.name}</td>
        <td>{blog.author?.name}</td>
        <ActionTable
          showModalDelete={() => showModalDelete(blog.id)}
          pathDetail={`blogs/detail/${blog.id}`}
          pathEdit={`blogs/edit/${blog.id}`}
        />
      </tr>
    )
  });

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Danh sách bài viết
          <NavLink to={{ pathname: `${ENV.PREFIX_URL}/blogs/create` }} className="btn btn-sm btn btn-success ml-1">
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
                  <th>Tiêu đề <SortTable params={params} name="title" handleSort={setValue} /></th>
                  <th>Trạng thái</th>
                  <th>Số bài thi</th>
                  <th>Danh mục</th>
                  <th>Tác giả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              {BodyTable(tbody)}
            </table>
          </div>
          <Paginate
            className="mt-3"
            data={blogs}
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