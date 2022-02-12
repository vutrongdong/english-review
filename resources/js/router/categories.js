import CategoryList from '@/components/categories/List';
import CategoryDetail from '@/components/categories/CategoryDetail';
import CategoryCreate from '@/components/categories/CategoryCreate';
import CategoryEdit from '@/components/categories/CategoryEdit';

export const categories = [
    {
        path: 'categories/list',
        icon: 'fab fa-hive',
        name: 'Danh sách danh mục',
        type: 'sidebar',
        component: CategoryList
    },
    {
        path: 'categories/detail/:id',
        name: 'Thông tin danh mục',
        component: CategoryDetail
    },
    {
        path: 'categories/create',
        name: 'Thêm danh mục',
        component: CategoryCreate
    },
    {
        path: 'categories/edit/:id',
        name: 'Sửa danh mục',
        component: CategoryEdit
    }
]