import UserForm from '@/components/users/UserForm';
import { useEffect } from 'react';

const UserEdit = () => {
  useEffect(() => {
    document.title = "Sửa người dùng";
  }, []);

  return (
    <div className="list-roles pt-sm-0">
      <div className="content-header row">
        <div className="header-title col">
          Sửa người dùng
        </div>
      </div>
      <div className="main-wrapper card">
        <UserForm type="edit" />
      </div>
    </div>
  )
}

export default UserEdit;
