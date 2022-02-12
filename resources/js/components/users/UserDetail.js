import { useEffect } from 'react';
import UserForm from '@/components/users/UserForm';

const UserDetail = () => {
  useEffect(() => {
    document.title = "Thông tin người dùng";
  }, []);

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Thông tin người dùng
        </div>
      </div>
      <div className="main-wrapper card">
        <UserForm type="detail" />
      </div>
    </div>
  )
}

export default UserDetail;
