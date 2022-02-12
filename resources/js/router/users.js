import UserList from '@/components/users/List';
import UserDetail from '@/components/users/UserDetail';
import UserCreate from '@/components/users/UserCreate';
import UserEdit from '@/components/users/UserEdit';

export const users = [
    {
        path: 'users/list',
        icon: 'fa fa-users',
        name: 'Danh sách người dùng',
        type: 'sidebar',
        component: UserList
    },
    {
        path: 'users/detail/:id',
        name: 'Thông tin người dùng',
        component: UserDetail
    },
    {
        path: 'users/create',
        name: 'Tạo người dùng',
        component: UserCreate
    },
    {
        path: 'users/edit/:id',
        name: 'Sửa người dùng',
        component: UserEdit
    }
]