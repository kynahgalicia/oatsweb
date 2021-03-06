import React, { Fragment, useEffect, useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getUsers , deactivateUser, deleteUser, clearErrors} from '../../../redux/actions/userActions';
import AdminSidebar from '../../layout/AdminSidebar'

import { DEACTIVATE_USER_RESET, DELETE_USER_RESET } from '../../../redux/constants/userConstants'
const UserList = () => {
    const { loading, error, users } = useSelector(state => state.users)
    const { isLoggedInAdmin,admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)
    const{error: deleteError,isDeactivated, isDeleted, msg} = useSelector(state=>state.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [thisDepartment, setThisDepartment] = useState('')
    const deactivate = "Deactivated"
    const activate = "Active"

    useEffect(() => {

        if(admin){
            setThisDepartment(admin.admin_department.deptname)
        }
        if(adminToken){
            dispatch(getUsers(adminToken))
        }

        if (error) {
            alert.error(error);
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            history.push('/admin/users');
            alert.success('Deleted');
            dispatch({ type: DELETE_USER_RESET })
        }

        if (isDeactivated) {
            history.push('/admin/users');
            alert.success('Changed status');
            dispatch({ type: DEACTIVATE_USER_RESET })
        }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');

        }
    },[ dispatch, alert, error, history, isLoggedInAdmin,admin,adminToken, isDeactivated, isDeleted, msg, deleteError, thisDepartment]);

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'user_tupid',
                    sort: 'desc'
                },
                {
                    label: 'First Name',
                    field: 'user_fname',
                    sort: 'desc'
                },
                {
                    label: 'Last Name',
                    field: 'user_lname',
                    sort: 'desc'
                },
                {
                    label: 'Contact',
                    field: 'user_contact',
                    sort: 'desc'
                },
                {
                    label: 'Email',
                    field: 'user_tupmail',
                    sort: 'desc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'desc'
                },
                {
                    label: 'Course',
                    field: 'course',
                    sort: 'desc'
                },
                {
                    label: 'Status',
                    field: 'user_status',
                    sort: 'desc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },

            ],
            rows: []
        }
        let x = 0
        { admin.role === 'Moderator' ?
            users && users.forEach(users => {
            if(users.user_department.deptname === thisDepartment && users.user_status != 'Deleted'){
                data.rows.push({
                    user_tupid: users.user_tupid,
                    user_fname: users.user_fname,
                    user_lname: users.user_lname,
                    user_contact: users.user_contact,
                    user_tupmail: users.user_tupmail,
                    department: users.user_department.deptname,
                    course: users.user_course.coursecode,
                    user_status: <div className="active">{users.user_status}</div>,
                    actions: 
                    <Fragment>
                        {/* <Link to={`/admin/users/edit/${users._id}`} className="decor-none block m-1">
                            <Button variant="primary" data-toggle="tooltip" data-placement="bottom" title="Edit">
                            <i className="fas fa-pencil-alt"></i>
                            </Button>
                        </Link> */}
                        
                        { users.user_status === "Deactivated" ? 
                        <Button variant="success" data-toggle="modal" data-target={"#activateModal" + users._id}> 
                        <i className="fas fa-user-check"></i>
                        </Button>
                        : 
                        <Button className='m-1' variant="secondary" data-toggle="modal" data-target={"#deactivateModal" + users._id}> 
                        <i className="fas fa-user-times"></i>
                        </Button>}
    
                        <Button className="m-1" variant="danger" data-toggle="modal" data-target={'#deleteModal' + users._id}>
                        <i className="fas fa-trash"></i>
                        </Button>
    
                        <div className="modal fade" id={'deleteModal' +  users._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Delete User?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => deleteUserHandler(users._id, x)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="modal fade" id={"deactivateModal" + users._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Deactivate User?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => deactivateUserHandler(users._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                            </div>
                        <div className="modal fade" id={"activateModal" + users._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Activate User?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => activateUserHandler(users._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                            </div>
                    </Fragment>
    
                })
            }
        }):
        users.forEach(users => {
            if(users.user_status != 'Deleted'){
                data.rows.push({
                    user_tupid: users.user_tupid,
                    user_fname: users.user_fname,
                    user_lname: users.user_lname,
                    user_contact: users.user_contact,
                    user_tupmail: users.user_tupmail,
                    department: users.user_department.deptname,
                    course: users.user_course.coursecode,
                    user_status: <div className="active">{users.user_status}</div>,
                    actions: 
                    <Fragment>
                        {/* <Link to={`/admin/users/edit/${users._id}`} className="decor-none block m-1">
                            <Button variant="primary" data-toggle="tooltip" data-placement="bottom" title="Edit">
                            <i className="fas fa-pencil-alt"></i>
                            </Button>
                        </Link> */}
                        
                        { users.user_status === "Deactivated" ? 
                        <Button variant="success" data-toggle="modal" data-target={"#activateModal" + users._id}> 
                        <i className="fas fa-user-check"></i>
                        </Button>
                        : 
                        <Button className='m-1' variant="secondary" data-toggle="modal" data-target={"#deactivateModal" + users._id}> 
                        <i className="fas fa-user-times"></i>
                        </Button>}
    
                        <Button className="m-1 danger" variant="danger" data-toggle="modal" data-target={'#deleteModal' + users._id}>
                        <i className="fas fa-trash"></i>
                        </Button>
    
                        <div className="modal fade" id={'deleteModal' +  users._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Delete User?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => deleteUserHandler(users._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="modal fade" id={"deactivateModal" + users._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Deactivate User?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => deactivateUserHandler(users._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                            </div>
                        <div className="modal fade" id={"activateModal" + users._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Activate User?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => activateUserHandler(users._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                            </div>
                    </Fragment>
    
                })

            }
            })
    
    }

        return data;
    }

    const deactivateUserHandler = (id) => {
        const formData = new FormData();
        formData.set('user_status', deactivate);
        dispatch(deactivateUser(id,formData,adminToken))
    }
    const activateUserHandler = (id) => {
        const formData = new FormData();
        formData.set('user_status', activate);
        dispatch(deactivateUser(id,formData,adminToken))
    }

    const deleteUserHandler = (id) => {
        const formData = new FormData();
        formData.set('user_status', 'Deleted');
        dispatch(deleteUser(id,formData,adminToken))
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
                    <div className='d-flex align-items-start m-2 px-5'>
                        <h1>Students</h1>
                    </div>
                    {loading ? <LoaderAdmin/>  :  
                    <>
                    <div className='d-flex align-items-start mx-5 mt-3'>
                        <Button variant="danger" className="danger mx-2"><Link className='link-admin' to="/admin/users/deleted"><i class="fas fa-trash"></i> Trash Bin</Link></Button>
                    </div>
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

export default UserList