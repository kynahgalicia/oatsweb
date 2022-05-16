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
                    label: 'Status',
                    field: 'status',
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
                status: <div className='active'>{department.status}</div> ,
                actions: 
                <Fragment>
                    <Link to={`/admin/department/edit/${department._id}`} className="decor-none block">
                        <Button variant="info">
                        <FaPencilAlt/>
                        </Button>
                    </Link>

                    <Button className="m-1" variant="danger" data-toggle="modal" data-target={"#deleteModal" + department._id}>
                        <FaTrash/>
                    </Button>

                    <div className="modal fade" id={"deleteModal"  + department._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <i class="fas fa-exclamation-triangle alert"/>
                                    <br/>
                                    This department may contain data from other lists. Are you sure you want to delete this department? This action cannot be undone.
                                </div>
                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal"  onClick={() => deleteDepartmentHandler(department._id)}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <div className="table-admin align-items-end">
                {loading ? <LoaderAdmin/>  :  
                    <>
                        <div className='d-flex align-items-start m-2'>
                            <h1>Departments</h1>
                        </div>
                        <div className='d-flex align-items-start mx-5 mt-3'>
                            <Button variant="success" className='success mx-1'><Link to="/admin/department/new">+ Add</Link></Button>

                            <Button variant="danger" className='danger mx-1'><Link to="/admin/department/deleted"> <i class="fas fa-trash"></i> Trash Bin</Link></Button>
                        </div>
                    <MDBDataTableV5 
                    hover 
                    entriesOptions={[5, 10, 15, 25]} 
                    entries={10} 
                    pagesAmount={4}
                    data={setData()} 
                    className='table px-4'
                    container-sm="true"
                    searchTop
                    searchBottom={false}
                        />

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