import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ENV } from '@/constants/config';

const ActionTable = ({ showModalDelete, pathDetail, pathEdit }) => {
    const auth = useSelector(state => state.auth);

    const styles = {
        faEye: {
            color: '#34e5eb',
            fontSize: 17
        },
        faEdit: {
            color: 'green',
            fontSize: 17,
            cursor: 'pointer'
        },
        faTrash: {
            color: auth.role === 'admin' ? '#eb4034' : '#3b3b3b',
            fontSize: 17,
            cursor: auth.role === 'admin' ? 'pointer' : 'not-allowed'
        },
    }

    return (
        <td>
            <NavLink to={{pathname: `${ENV.PREFIX_URL}/${pathDetail}`}}>
                <i style={ styles.faEye } className="fas fa-eye mr-3"></i>
            </NavLink>
            <NavLink to={{pathname: `${ENV.PREFIX_URL}/${pathEdit}`}}>
                <i style={ styles.faEdit } className="fas fa-edit mr-3"></i>
            </NavLink>
            <i style={ styles.faTrash } 
               className="fas fa-trash-alt"
               onClick={()=> auth.role === 'admin' ? showModalDelete() : {}}
            ></i>
        </td>
    )
}

export default withRouter(ActionTable);