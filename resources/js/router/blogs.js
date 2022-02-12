import BlogList from '@/components/blogs/List';
import BlogDetail from '@/components/blogs/BlogDetail';
import BlogCreate from '@/components/blogs/BlogCreate';
import BlogEdit from '@/components/blogs/BlogEdit';
import Upload from '@/components/blogs/Upload';

export const blogs = [
    {
        path: 'blogs/list',
        icon: 'fab fa-blogger-b',
        name: 'Danh sách bài viết',
        type: 'sidebar',
        component: BlogList
    },
    {
        path: 'blogs/detail/:id',
        name: 'Thông tin bài viết',
        component: BlogDetail
    },
    {
        path: 'blogs/create',
        name: 'Thêm bài viết',
        component: BlogCreate
    },
    {
        path: 'blogs/edit/:id',
        name: 'Sửa bài viết',
        component: BlogEdit
    }
]