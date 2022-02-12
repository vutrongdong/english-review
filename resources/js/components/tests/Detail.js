import { useEffect } from 'react';
import Form from '@/components/tests/Form';

const Detail = () => {
  useEffect(() => {
    document.title = "Chi tiết bài thi";
  }, []);

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Chi tiết bài thi
        </div>
      </div>
      <div className="main-wrapper card">
        <Form type="detail" />
      </div>
    </div>
  )
}

export default Detail;