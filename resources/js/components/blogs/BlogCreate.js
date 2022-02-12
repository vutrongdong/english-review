import { useEffect } from 'react';
import BlogForm from '@/components/blogs/BlogForm';

const BlogCreate = () => {
    useEffect(() => {
        document.title = "Thêm bài viết";
    }, []);

    return (
        <div className="list-roles pt-sm-0">
            <div className="content-header row">
                <div className="header-title col">
                    Thêm bài viết
                </div>
            </div>
            <div className="main-wrapper card">
                <BlogForm type="create"/>
            </div>
        </div>
    )
}

export default BlogCreate;