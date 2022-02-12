import React from 'react';
import { pagination } from '@/commons/helpers/pagination';

const Paginate = ({perPage, data, handleChangePage, handleChangePerpage}) => {
    const { current_page, last_page } = data;
    const rangeWithDots = pagination(current_page, last_page);
    
    const changePage = (page) => {
        if (page) handleChangePage(page);
    }

    const changePerpage = (perpage) => {
        handleChangePerpage(perpage.target.value)
    }

    const pageButton = rangeWithDots.map((page, index) => {
        let classLiTag = "page-item ";
        if (data.current_page ==  page) classLiTag = classLiTag + "active ";
        if (page === '...') classLiTag = classLiTag + "disabled";

        return (
            <li key={index}
                className={classLiTag}
                onClick={() => changePage(data.current_page ==  page || page === '...' ? '' : page)}
            >
                <a className="page-link" style={{zIndex: 1}}>{ page }</a>
            </li>
        )
    });

    const prevButton = () => {
        let classLiTag = "page-item ";
        if (data.current_page === 1) classLiTag = classLiTag + "disabled";

        return (
            <li className={classLiTag}
                onClick={() => changePage(data.current_page == 1 ? '' : data.current_page - 1)}
            >
                <a className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
            </li>
        )
    }

    const nextButton = () => {
        let classLiTag = "page-item ";
        if (data.current_page === data.last_page) classLiTag = classLiTag + "disabled";

        return (
            <li className={ classLiTag }
                onClick={() => changePage(data.current_page == data.last_page ? '' : data.current_page + 1)}
            >
                <a className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </a>
            </li>
        )
    }
    
    return (
        <div className="row d-flex align-items-center">
            <div className="col-auto" style={{ margin: '0 auto'}}>
                <div className="paginate">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination small" style={{ margin: 0 }}>
                            { prevButton() }
                            { pageButton }
                            { nextButton() }
                        </ul>
                    </nav>
                </div>
            </div>
            {perPage&&
            <div className="">
                <select 
                    className="form-control form-control-sm"
                    onChange={ changePerpage }
                    value={ perPage }
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
            </div>
            }
        </div>
    )
}

export default Paginate;