import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getAdmins } from '../../../redux/actions/adminActions';
import AdminSidebar from '../../layout/AdminSidebar'
const UserList = () => {
    const { loading, error, admins } = useSelector(state => state.admins)
    const { isLoggedInAdmin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {

        if(adminToken){
            dispatch(getAdmins(adminToken))
        }

        if (error) {
            alert.error(error);
            // dispatch(clearErrors())
        }

        // if (deleteError) {
        //     alert.error(deleteError);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     history.push('/admin/course');
        //     alert.success('Course deleted successfully');
        //     dispatch({ type: DELETE_COURSE_RESET })
        // }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
    },[ dispatch, alert, error, history, isLoggedInAdmin,adminToken]);

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
                    label: 'Actions',
                    field: 'actions',
                },

            ],
            rows: []
        }

        admins.forEach(admins => {
            data.rows.push({
                admin_tupid: admins.admin_tupid,
                admin_fname: admins.admin_fname,
                admin_lname: admins.admin_lname,
                admin_contact: admins.admin_contact,
                admin_tupmail: admins.admin_tupmail,
                department: admins.admin_department.deptname,
                actions: 
                <Fragment>
                    {/* <Link to={`/admin/course/edit/${course._id}`} className="decor-none block"> */}
                    <Button variant="primary" data-toggle="tooltip" data-placement="bottom" title="Edit">
                        <i className="fas fa-pencil-alt"></i>
                        </Button>
                    {/* </Link> */}

                    <Button className='m-1' variant="secondary" data-toggle="modal" data-target="#deactivateModal"> 
                    <i className="fas fa-user-times"></i>
                    </Button>

                    <Button className="m-1" variant="danger" data-toggle="modal" data-target="#deleteModal">
                    <i className="fas fa-trash"></i>
                    </Button>

                    <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Delete Admin Permanently?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => deleteAdminHandler(admins._id)}>Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    <div className="modal fade" id="deactivateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Deactivate Admin?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => deactivateAdminHandler(admins._id)}>Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    <div className="modal fade" id="activateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Activate Admin?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => activateAdminHandler(admins._id)}>Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                </Fragment>
            })
            console.log('test')
        })

        return data;
    }

    const deactivateAdminHandler = (id) => {
        // const formData = new FormData();
        // formData.set('user_status', deactivate);
        // dispatch(deactivateUser(id,formData,adminToken))
    }
    const activateAdminHandler = (id) => {
        // const formData = new FormData();
        // formData.set('user_status', activate);
        // dispatch(deactivateUser(id,formData,adminToken))
    }

    const deleteAdminHandler = (id) => {
        // dispatch(deleteUser(id,adminToken))
        // console.log('deleted' , id)
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
                    <h1>Administrators</h1>
                </div>
                <div className='d-flex align-items-start mx-5 mt-3'>
                    <Button variant="success"><Link to="/admin/admins/new">+ Add</Link></Button>
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

export default UserList