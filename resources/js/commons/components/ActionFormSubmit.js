import { NavLink } from 'react-router-dom';
import { ENV } from '@/constants/config';

const ActionFormSubmit = ({ type, pathBack, createOrUpdate }) => {
    return (
        <div className="col-md-12 mt-5">
            <div className="d-flex justify-content-center">
                <NavLink to={{pathname: `${ENV.PREFIX_URL}/${pathBack}`}} className="btn btn-default mr-2">
                    Trở về
                </NavLink>
                {
                    type !== 'detail' &&
                    <button type="submit" className="btn btn-primary" onClick={() => createOrUpdate()}>
                        {type == 'create' ? 'Thêm mới' : 'Lưu lại'}
                    </button>
                }
            </div>
        </div>
    )
}

export default ActionFormSubmit;