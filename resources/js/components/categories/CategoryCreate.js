import CategoryForm from '@/components/categories/CategoryForm';
import { useEffect } from 'react';

const CategoryCreate = () => {
    useEffect(() => {
        document.title = "Thêm danh mục";
    }, []);

    return (
        <div className="list-roles pt-sm-0">
            <div className="content-header row">
                <div className="header-title col">
                    Thêm danh mục
                </div>
            </div>
            <div className="main-wrapper card">
                <CategoryForm type="create"/>
            </div>
        </div>
    )
}

export default CategoryCreate;