import ActionFormSubmit from '@/commons/components/ActionFormSubmit';
import { toastSuccess } from '@/commons/helpers/toastHelper';
import { useHistory, useParams } from "react-router-dom";
import SelectForm from '@/commons/components/SelectForm';
import InputForm from '@/commons/components/InputForm';
import ErrorForm from '@/commons/components/ErrorForm';
import * as commonActions from '@/actions/commons';
import * as apiCategories from '@/apis/categories';
import Editor from '@/commons/components/Editor';
import { useState, useEffect } from 'react';
import { ENV } from '@/constants/config';
import * as blogApi from '@/apis/blogs';
import { useDispatch } from 'react-redux';
import { slug } from '@/utils/slug';

const BlogForm = ({ type }) => {
  const [optionCategories, setOptionCategories] = useState([]);
  const [errors, setError] = useState({});
  const [blog, setBlog] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(async () => {
    dispatch(commonActions.setLoading(true));
    if (type != 'create') {
      const blogData = await blogApi.getBlog(id);
      if (blogData.image) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = `/storage/${blogData.image}`;
        blogData['image_old'] = blogData.image;
        delete blogData.image;
      }

      setBlog(blogData);
    }

    await handleGetCategories();
    dispatch(commonActions.setLoading(false));
  }, []);

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
    let blogData = { ...blog };
    if (name == 'title') {
      blogData['slug'] = slug(value);
    }

    setBlog({
      ...blogData,
      [name]: value
    })
  };

  const loadFile = function (event) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = URL.createObjectURL(event.target.files[0]);

    setBlog({
      ...blog,
      image: event.target.files[0]
    });

    imagePreview.onload = function () {
      URL.revokeObjectURL(imagePreview.src)
    }
  }

  const createOrUpdate = async () => {
    try {
      let dataSubmit = new FormData();
      const valueBlog = Object.values(blog)
      Object.keys(blog).map(function (key, index) {
        dataSubmit.append(key, valueBlog[index]);
      });

      if (type == "create") {
        await blogApi.createBlog(dataSubmit);
        toastSuccess('Th??m danh m???c th??nh c??ng');
      } else {
        await blogApi.editBlog(dataSubmit);
        toastSuccess('S???a danh m???c th??nh c??ng');
      }
      history.push(`${ENV.PREFIX_URL}/blogs/list`);
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
              value={blog.title}
              disabled={type == 'detail'}
              handleChange={handleChange}
              name="title"
              placeholder="Nh???p t??n"
              error={errors.title}
            />
          </div>
          <div className="form-group">
            <InputForm
              label="T??n kh??ng d???u"
              required
              value={blog.slug}
              error={errors.slug}
              readonly={true}
              handleChange={handleChange}
            />
          </div>
          <div className="form-group">
            <InputForm
              label="T??c gi???"
              value={blog.author?.name}
              show={type == 'detail'}
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label>H??nh ???nh</label>
            {type != 'detail' &&
              <><br />
                <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={(event) => loadFile(event)} />
              <br /></>
            }<br />
            <ErrorForm error={errors.image} />
            <img id="imagePreview" />
          </div>
        </div>
        <div className="col-md-6 col-xs-12">
          <div className="form-group">
            <SelectForm
              label="Danh m???c"
              name="category_id"
              required
              value={blog.category_id}
              error={errors.category_id}
              handleChange={handleChange}
              disabled={type == 'detail'}
              options={optionCategories}
            />
          </div>
          <div className="form-group">
            <label>Tr???ng th??i</label>
            <select name="active"
              className="form-control"
              disabled={type == 'detail'}
              value={blog.active || 1}
              onChange={({ target: { value, name } }) => handleChange(value, name)}
            >
              <option value={0}>???n</option>
              <option value={1}>Hi???n th???</option>
            </select>
          </div>
          <div className="form-group">
            <label>Lo???i tin</label>
            <select name="hot"
              className="form-control"
              value={blog.hot || 0}
              disabled={type == 'detail'}
              onChange={({ target: { value, name } }) => handleChange(value, name)}
            >
              <option value={0}>B??nh th?????ng</option>
              <option value={1}>N???i b???t</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group form-content">
        <label>M?? t??? ng???n</label>
        <textarea
          onChange={({ target: { value, name } }) => handleChange(value, name) }
          value={blog.description ? blog.description : ''}
          disabled={type == 'detail'}
          className="form-control"
          name="description" rows="2"
        />
        <ErrorForm error={errors.description} />
      </div>
      <div className="form-group form-content">
        <label className="required">N???i dung</label>
        <Editor
          initialValue={blog.content}
          disabled={type == 'detail'}
          handleChange={(value) => handleChange(value, 'content')}
        />
        <ErrorForm error={errors.content} />
      </div>
      <ActionFormSubmit
        type={type}
        pathBack='blogs/list'
        createOrUpdate={createOrUpdate}
      />
    </div>
  )
}

export default BlogForm;