import BlogForm from '@/components/blogs/BlogForm';
import { useEffect } from 'react';

const BlogCreate = () => {
    useEffect(() => {
        document.title = "Sửa bài viết";
    }, []);

    return (
        <div className="list-roles pt-sm-0">
            <div className="content-header row">
                <div className="header-title col">
                    Sửa bài viết
                </div>
            </div>
            <div className="main-wrapper card">
                <BlogForm type="edit"/>
            </div>
        </div>
    )
}

export default BlogCreate;