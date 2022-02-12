import ActionFormSubmit from '@/commons/components/ActionFormSubmit';
import { toastSuccess } from '@/commons/helpers/toastHelper';
import { useHistory, useParams } from "react-router-dom";
import InputForm from '@/commons/components/InputForm';
import * as categoryApi from '@/apis/categories';
import { useState, useEffect } from 'react';
import { ENV } from '@/constants/config';
import { slug } from '@/utils/slug';

const CategoryForm = ({type}) => {
    const [category, setCategory] = useState({});
    const [errors, setError] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(async () => {
        if (type != 'create') {
            const cateData = await categoryApi.getCategory(id);
            setCategory(cateData);
        }
    }, []);

    const handleChange = async (value, name) => {
        let dataCategory = { ...category };
        if (name == 'name') {
            dataCategory['slug'] = slug(value);
        }
        setCategory({
            ...dataCategory,
            [name]: value
        })
    };

    const createOrUpdate = async () => {
        try {
            if (type == "create") {
                await categoryApi.createCategory(category);
                toastSuccess('Thêm danh mục thành công');
            } else {
                await categoryApi.editCategory(category);
                toastSuccess('Sửa danh mục thành công');
            }
            history.push(`${ENV.PREFIX_URL}/categories/list`);
        } catch (error) {
            console.error(error);
            setError(error.errors);
        }
    }

    return (
        <div className="card-body">
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    <div className="form-group">
                        <InputForm
                            label="Tên"
                            required
                            value={category.name} 
                            disabled={type=='detail'}
                            handleChange={handleChange}
                            name="name" 
                            placeholder="Nhập tên"
                            error={errors.name}
                        />
                    </div>
                </div>
                <div className="col-md-6 col-xs-12">
                    <div className="form-group">
                        <InputForm
                            label="Tên không dấu"
                            value={category.slug}
                            error={errors.slug}
                            readonly={true}
                            name="name"
                        />
                    </div>
                </div>
            </div>
            <ActionFormSubmit 
                type={type} 
                pathBack='categories/list' 
                createOrUpdate={createOrUpdate}
            />
        </div>
    )
}

export default CategoryForm;