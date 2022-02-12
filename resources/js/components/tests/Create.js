import { useEffect } from 'react';
import Form from '@/components/tests/Form';

const Create = () => {
  useEffect(() => {
    document.title = "Tạo bài thi";
  }, []);
  
  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
            Tạo bài thi
        </div>
      </div>
      <div className="main-wrapper card">
        <Form type="create"/>
      </div>
    </div>
  )
}

export default Create;