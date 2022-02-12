import { useEffect } from 'react';
import UserForm from '@/components/users/UserForm';

const UserCreate = () => {
  useEffect(() => {
    document.title = "Thêm mới người dùng";
  }, []);

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Tạo người dùng mới
        </div>
      </div>
      <div className="main-wrapper card">
        <UserForm type="create" />
      </div>
    </div>
  )
}

export default UserCreate;
