import List from '@/components/tests/List';
import Detail from '@/components/tests/Detail';
import Create from '@/components/tests/Create';
import Edit from '@/components/tests/Edit';

export const tests = [
    {
        path: 'tests/list',
        icon: 'fas fa-clipboard-list',
        name: 'Danh sách bài thi',
        type: 'sidebar',
        component: List
    },
    {
        path: 'tests/detail/:id',
        name: 'Chi tiết bài thi',
        component: Detail
    },
    {
        path: 'tests/create',
        name: 'Tạo bài thi',
        component: Create
    },
    {
        path: 'tests/edit/:id',
        name: 'Sửa bài thi',
        component: Edit
    }
]