import ActionFormSubmit from '@/commons/components/ActionFormSubmit';
import { toastSuccess } from '@/commons/helpers/toastHelper';
import ErrorForm from '@/commons/components/ErrorForm';
import * as blogApi from '@/apis/blogs';
import { useState, useEffect } from 'react';

const Upload = () => {
  const [data, setData] = useState({});
  const [urlImage, setUrl] = useState('');
  const [errors, setError] = useState({});
  
  useEffect(() => {
    $('button[type="submit"]').attr('disabled','disabled');
  }, [])
  const loadFile = function (event) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    $('button[type="submit"]').removeAttr('disabled');
    setData({
      image: event.target.files[0]
    });

    imagePreview.onload = function () {
      URL.revokeObjectURL(imagePreview.src)
    }
  }

  const createOrUpdate = async () => {
    try {
      let dataSubmit = new FormData();
      dataSubmit.append('image', data['image']);
      const result = await blogApi.uploadImage(dataSubmit);
      setUrl(result);
      $('button[type="submit"]').attr('disabled','disabled');
      toastSuccess('Upload thành công');
    } catch (error) {
      console.error(error);
      setError(error.errors);
    }
  }

  const handleCopy = () => {
    console.log(444, urlImage)
    navigator.clipboard.writeText(urlImage);
    toastSuccess(`Copy thành công: ${urlImage}`);
  }

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Upload hình ảnh
        </div>
      </div>
      <div className="main-wrapper card pb-3">
        <div className="card-body" style={{ height: 500 }}>
          <div className="row">
            <div className="form-group">
              <label>Hình ảnh</label>
              <br />
              <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={(event) => loadFile(event)} />
              <br />
              <ErrorForm error={errors.image} />
              <img className="mt-2" id="imagePreview" />
            </div>
          </div>
        </div>
        {urlImage != '' &&
          <div className="header-title text-center">
            <span>{ urlImage }</span>
            <button onClick={() => handleCopy() } className="ml-2 btn btn-success">Copy URL</button>
          </div>
        }
        <ActionFormSubmit
          type={'create'}
          pathBack='blogs/list'
          createOrUpdate={createOrUpdate}
        />
      </div>
    </div>
  )
}

export default Upload
