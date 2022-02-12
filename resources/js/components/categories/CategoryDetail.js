import { useEffect } from 'react';
import CategoryForm from '@/components/categories/CategoryForm';

const CategoryDetail = () => {
    useEffect(() => {
        document.title = "Thông tin danh mục";
    }, []);

    return (
        <div className="list-roles pt-sm-0">
            <div className="content-header row">
                <div className="header-title col">
                    Thông tin danh mục
                </div>
            </div>
            <div className="main-wrapper card">
                <CategoryForm type="detail"/>
            </div>
        </div>
    )
}

export default CategoryDetail;