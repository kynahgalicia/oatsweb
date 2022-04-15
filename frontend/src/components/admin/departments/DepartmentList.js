import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import {getDepartment, deleteDepartment, clearErrors} from '../../../redux/actions/departmentActions'
import { DELETE_DEPARTMENT_RESET } from '../../../redux/constants/departmentConstants'
import AdminSidebar from '../../layout/AdminSidebar'
const DepartmentList = () => {
    const { loading, error, department } = useSelector(state => state.department);
    const {  error: deleteError, isDeleted } = useSelector(state => state.departments);
    const { isLoggedInAdmin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();

    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
        dispatch(getDepartment());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            history.push('/admin/department');
            alert.success('Department deleted successfully');
            dispatch({ type: DELETE_DEPARTMENT_RESET })
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
        
    },[ dispatch, alert, error, deleteError, isDeleted, history,isLoggedInAdmin,adminToken]);


    const setData = () => { 
        const data = {
            columns: [
                // {
                //     label: 'ID',
                //     field: 'id',
                //     sort: 'asc'
                // },
                {
                    label: 'Department Name',
                    field: 'deptname',
                    sort: 'asc'
                },
                {
                    label: 'Code',
                    field: 'deptcode',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        department.forEach(department => {
            data.rows.push({
                // id: department._id,
                deptname: department.deptname,
                deptcode: department.deptcode,
                actions: 
                <Fragment>
                    <Link to={`/admin/department/edit/${department._id}`} className="decor-none block">
                        <Button variant="info">
                        <FaPencilAlt/>
                        </Button>
                    </Link>

                    <Button variant="danger" onClick={() => deleteDepartmentHandler(department._id)}>
                        <FaTrash/>
                    </Button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteDepartmentHandler = (id) => {
        dispatch(deleteDepartment(id,adminToken))
    }

    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
                    <div className="table-admin">
                {loading ? <LoaderAdmin/>  :  
                    <>
                <div className='d-flex align-items-start m-2'>
                    <h1>Departments</h1>
                </div>
                <div className='d-flex align-items-start mx-5 mt-3'>
                    <Button variant="success"><Link to="/admin/department/new">+ Add</Link></Button>
                </div>
                    <MDBDataTableV5 
                    hover 
                    entriesOptions={[5, 10, 15, 25]} 
                    entries={10} 
                    pagesAmount={4}
                    data={setData()} 
                    className='table px-4'
                    container-sm="true"/>

                </>
                }    
                </div>
                
            </div>
            </Col>
        </Row>
        </Fragment>
    )
}

export default DepartmentList;