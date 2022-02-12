import { useEffect } from 'react';
import BlogForm from '@/components/blogs/BlogForm';

const blogDetail = () => {
    useEffect(() => {
        document.title = "Thông tin bài viết";
    }, []);

    return (
        <div className="list-roles pt-sm-0">
            <div className="content-header row">
                <div className="header-title col">
                    Thông tin bài viết
                </div>
            </div>
            <div className="main-wrapper card">
                <BlogForm type="detail"/>
            </div>
        </div>
    )
}

export default blogDetail;