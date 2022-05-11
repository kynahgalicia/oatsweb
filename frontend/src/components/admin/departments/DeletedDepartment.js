import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import {getDepartmentDeleted, restoreDepartment, clearErrors} from '../../../redux/actions/departmentActions'
import { RESTORE_DEPARTMENT_RESET } from '../../../redux/constants/departmentConstants'
import AdminSidebar from '../../layout/AdminSidebar'
const DeletedDepartment = () => {
    const { loading, error, department } = useSelector(state => state.department);
    const {  error: deleteError, isRestored } = useSelector(state => state.departments);
    const { isLoggedInAdmin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
        dispatch(getDepartmentDeleted());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isRestored) {
            history.push('/admin/department');
            alert.success('restored successfully');
            dispatch({ type: RESTORE_DEPARTMENT_RESET })
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
        
    },[ dispatch, alert, error, deleteError, isRestored, history,isLoggedInAdmin,adminToken]);


    const setData = () => { 
        const data = {
            columns: [
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
                deptname: department.deptname,
                deptcode: department.deptcode,
                status: <div className='denied'>Deleted</div> ,
                actions: 
                <Fragment>

                    <Button className="m-1" variant="danger" data-toggle="modal" data-target={"#deleteModal" + department._id}>
                    <i class="fas fa-undo"></i>
                    </Button>

                    <div className="modal fade" id={"deleteModal"  + department._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <i class="fas fa-exclamation-triangle alert"/>
                                    <br/>
                                    This department may contain data from other lists once restored. Are you sure you want to restore this department?
                                </div>
                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal"  onClick={() => activateDepartmentHandler(department._id)}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            })
        })

        return data;
    }

    const activateDepartmentHandler = (id) => {
        dispatch(restoreDepartment(id,adminToken))
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
                    <h1>Deleted Departments</h1>
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

export default DeletedDepartment;