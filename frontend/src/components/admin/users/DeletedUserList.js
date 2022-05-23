import React, { Fragment, useEffect, useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getUsers ,restoreUser, clearErrors} from '../../../redux/actions/userActions';
import AdminSidebar from '../../layout/AdminSidebar'

import {  RESTORE_USER_RESET } from '../../../redux/constants/userConstants'
const UserList = () => {
    const { loading, error, users } = useSelector(state => state.users)
    const { isLoggedInAdmin,admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)
    const{error: deleteError, isRestored} = useSelector(state=>state.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [thisDepartment, setThisDepartment] = useState('')
    useEffect(() => {

        if(admin){
            setThisDepartment(admin.admin_department.deptname)
        }
        if(adminToken){
            dispatch(getUsers(adminToken))
        }

        if (error) {
            alert.error(error);
            // dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isRestored) {
            history.push('/admin/users/deleted');
            alert.success('Restored');
            dispatch({ type: RESTORE_USER_RESET })
        }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');

        }
    },[ dispatch, alert, error, history, isLoggedInAdmin,admin,adminToken, deleteError, thisDepartment, isRestored]);

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
            users.forEach(users => {
            if(users.user_department.deptname === thisDepartment && users.user_status === 'Deleted'){
                data.rows.push({
                    user_tupid: users.user_tupid,
                    user_fname: users.user_fname,
                    user_lname: users.user_lname,
                    user_contact: users.user_contact,
                    user_tupmail: users.user_tupmail,
                    department: users.user_department.deptname,
                    course: users.user_course.coursecode,
                    user_status: <div className="denied">{users.user_status}</div>,
                    actions: 
                    <Fragment>
    
                        <Button className="m-1 danger" variant="danger" data-toggle="modal" data-target={'#restoreModal' + users._id}>
                        <i class="fas fa-undo"></i>
                        </Button>

                        <div className="modal fade" id={"restoreModal" + users._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Are you sure you want to restore this data?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => restoreUserHandler(users._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                            </div>
                    </Fragment>
                })
            }
        }):
        users.forEach(users => {
            if( users.user_status === 'Deleted'){
                data.rows.push({
                    user_tupid: users.user_tupid,
                    user_fname: users.user_fname,
                    user_lname: users.user_lname,
                    user_contact: users.user_contact,
                    user_tupmail: users.user_tupmail,
                    department: users.user_department.deptname,
                    course: users.user_course.coursecode,
                    user_status: <div className="denied">{users.user_status}</div>,
                    actions: 
                    <Fragment>
    
                        <Button className="m-1 danger" variant="danger" data-toggle="modal" data-target={'#restoreModal' + users._id}>
                        <i class="fas fa-undo"></i>
                        </Button>
    
                        <div className="modal fade" id={"restoreModal" + users._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Are you sure you want to restore this data?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => restoreUserHandler(users._id)}>Yes</Button>
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

    const restoreUserHandler = (id) => {
        const formData = new FormData();
        formData.set('user_status', 'Active');
        dispatch(restoreUser(id,formData,adminToken))
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
                        <h1>Deleted Students</h1>
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

export default UserList