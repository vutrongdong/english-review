import { useEffect } from 'react';
import Form from '@/components/tests/Form';

const Edit = () => {
  useEffect(() => {
    document.title = "Sửa bài thi";
  }, []);

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Sửa bài thi
        </div>
      </div>
      <div className="main-wrapper card">
        <Form type="edit" />
      </div>
    </div>
  )
}

export default Edit;