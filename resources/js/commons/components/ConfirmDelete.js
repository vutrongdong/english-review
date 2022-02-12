import React, { useEffect, useRef } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const ConfirmDelete = ({id, showDeleteModal, handleClose, handleDelete}) => {
    const ref = useRef();
    useOnClickOutside(ref, () => handleClose());
    useEffect(() => {
        if (showDeleteModal) {
            $('#deleteModal').modal('show')
        } else {
            $('#deleteModal').modal('hide');
        }
    }, [showDeleteModal]);

    return (
        <div className="modal fade"  aria-hidden="true" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" onClick={()=> handleClose()}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title align-center">
                            Xác nhận !
                        </h5>
                        <button type="button" className="close" onClick={()=> handleClose()} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ textAlign: 'center', color: 'red'}}>
                        Bạn có muốn xóa hay không ?
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-sm btn-secondary" 
                            onClick={()=> handleClose()}
                        >
                            Hủy
                        </button>
                        <button 
                            type="button" 
                            className='btn btn-sm btn-danger'
                            onClick={() =>handleDelete(id)}
                        >
                            Đồng ý
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete;