import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../utils/LoaderAdmin'
import { getAdmins,restoreDelete, clearErrors} from '../../../redux/actions/adminActions';
import { RESTORE_ADMIN_RESET} from '../../../redux/constants/adminConstants';
import AdminSidebar from '../../layout/AdminSidebar'
const DeletedAdminList = () => {
    const { loading, admins } = useSelector(state => state.admins)
    const { isRestored, error} = useSelector(state => state.admin)
    const { isLoggedInAdmin,admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();


    useEffect(() => {

        if(adminToken){
            dispatch(getAdmins(adminToken))
        }

        if(admin.role === 'Moderator'){
            history.push('/');
            alert.error('Restricted');
        }

        if (error) {
            alert.error(error);
        }

        if (isRestored) {
            history.push('/admin/admins/deleted');
            alert.success('Restored');
            dispatch(clearErrors())
            dispatch({ type: RESTORE_ADMIN_RESET })
        }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

        if(admin.role === 'Moderator'){
            history.push('/');
            alert.error('Restricted');
        }

    },[ dispatch, alert, error, history, isLoggedInAdmin,adminToken, isRestored,admin]);

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'admin_tupid',
                    sort: 'asc'
                },
                {
                    label: 'First Name',
                    field: 'admin_fname',
                    sort: 'desc'
                },
                {
                    label: 'Last Name',
                    field: 'admin_lname',
                    sort: 'desc'
                },
                {
                    label: 'Contact',
                    field: 'admin_contact',
                },
                {
                    label: 'Email',
                    field: 'admin_tupmail',
                },
                {
                    label: 'Department',
                    field: 'department',
                },
                {
                    label: 'Role',
                    field: 'role',
                },
                {
                    label: 'Status',
                    field: 'status',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },

            ],
            rows: []
        }

        admins.forEach(admins => {
            
        if(admins.admin_status === 'Deleted'){ 
                data.rows.push({
                admin_tupid: admins.admin_tupid,
                admin_fname: admins.admin_fname,
                admin_lname: admins.admin_lname,
                admin_contact: admins.admin_contact,
                admin_tupmail: admins.admin_tupmail,
                department: admins.admin_department.deptname,
                role: <div className={admins.role === 'Super Admin'? "superAdmin" : "moderator"}>{admins.role}</div>,
                status: <div className={admins.admin_status === 'Active'? "active" : "denied"}>{admins.admin_status}</div> ,
                actions:
                <Fragment>
                    
                    <Button className="m-1 danger" variant="danger" data-toggle="modal" data-target={"#restoreModal" + admins._id}>
                    <i class="fas fa-undo"></i>
                    </Button>
                    {/* <Button className="m-1 danger" variant="danger" data-toggle="modal" data-target={"#deleteModal" + admins._id}>
                    <i className="fas fa-trash"></i>
                    </Button> */}

                    <div className="modal fade" id={"restoreModal" + admins._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Are you sure you want to restore this data?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => restoreAdminHandler(admins._id)}>Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
        
                </Fragment>
            })
        }
        })

        return data;
    }

    const deleteAdminHandler = (id) => {
        // dispatch(deleteUser(id,adminToken))
        // console.log('deleted' , id)
    }
    const restoreAdminHandler = (id) => {
        const formData = new FormData();
        formData.set('admin_status', 'Active');
        dispatch(restoreDelete(id,formData,adminToken))
    }

    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
                        <div className='back-button text-start px-3 py-2'>
                            <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                        </div>
                <div className="table-admin">
                
                <div className='d-flex align-items-start m-2 px-5'>
                    <h1>Deleted Administrators</h1>
                </div>
                {loading ? <LoaderAdmin/>  :  
                    <>
                    <MDBDataTableV5 
                        hover 
                        entriesOptions={[5, 10, 15, 25]} 
                        entries={10} 
                        pagesAmount={4}
                        data={setData()} 
                        className='table px-5'
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

export default DeletedAdminList