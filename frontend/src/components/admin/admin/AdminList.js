import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getAdmins, deactivateAdmin, activateAdmin, superAdmin, moderatorAdmin, deleteAdmin,clearErrors} from '../../../redux/actions/adminActions';
import { DEACTIVATE_ADMIN_RESET, ACTIVATE_ADMIN_RESET, SUPER_ADMIN_RESET, MODERATOR_RESET, DELETE_ADMIN_RESET} from '../../../redux/constants/adminConstants';
import AdminSidebar from '../../layout/AdminSidebar'
import {getDepartment} from '../../../redux/actions/departmentActions'
const UserList = () => {
    const { loading, admins } = useSelector(state => state.admins)
    const { isDeactivated, isActivated, isSuperAdmin, isModerator, isDeleted, error} = useSelector(state => state.admin)
    const { isLoggedInAdmin,admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)
    const {department} = useSelector(state => state.department)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();

    const [thisDepartment, setDepartment] = useState('');


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
            // dispatch(clearErrors())
        }

        // if (deleteError) {
        //     alert.error(deleteError);
        //     dispatch(clearErrors())
        // }

        if (isDeleted) {
            history.push('/admin/admins');
            alert.success('Deleted');
            dispatch(clearErrors())
            dispatch({ type: DELETE_ADMIN_RESET })
        }
        if (isDeactivated) {
            history.push('/admin/admins');
            alert.success('Deactivated');
            dispatch(clearErrors())
            dispatch({ type: DEACTIVATE_ADMIN_RESET })
        }
        if (isActivated) {
            history.push('/admin/admins');
            alert.success('Deactivated');
            dispatch(clearErrors())
            dispatch({ type: ACTIVATE_ADMIN_RESET })
        }
        if (isSuperAdmin) {
            history.push('/admin/admins');
            alert.success('super admin has been assigned');
            dispatch(clearErrors())
            dispatch({ type: SUPER_ADMIN_RESET })
        }
        if (isModerator) {
            history.push('/admin/admins');
            alert.success('Moderator has been assigned');
            dispatch(clearErrors())
            dispatch({ type: MODERATOR_RESET })
        }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

        dispatch(getDepartment())
    },[ dispatch, alert, error, history, isLoggedInAdmin,adminToken, isDeactivated, isActivated, isSuperAdmin, isModerator, isDeleted,admin]);

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
                    attributes: {
                        'className': 'hide-print'
                    },
                },

            ],
            rows: []
        }

        admins && admins.forEach(admins => {
            
        if(admins.admin_status != 'Deleted'){ 
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
                    <div className='hide-print'> 

                    
                    {/* <Link to={`/admin/admins/edit/${admins._id}`} className="decor-none block">
                    <Button variant="primary" data-toggle="tooltip" data-placement="bottom" title="Edit">
                        <i className="fas fa-pencil-alt"></i>
                        </Button>
                    </Link> */}

                    
                    {admins.role === 'Moderator' && admins.admin_status === "Deactivated" ? 
                        <Button variant="success "  className='success m-1' data-toggle="modal" data-target={"#activateModal" + admins._id}> 
                        <i className="fas fa-user-check"></i>
                        </Button>
                    : 
                        null
                    }

                    {admins.role === 'Moderator' && admins.admin_status === 'Active' ?
                        <Button className='m-1' variant="secondary" data-toggle="modal" data-target={"#deactivateModal" + admins._id}> 
                        <i className="fas fa-user-times"></i>
                        </Button>
                    : null}
                    { admins.role === "Moderator" ? 
                    <Button  className='m-1' variant="warning" data-toggle="modal" data-target={"#superModal" + admins._id}> 
                    <i class="fas fa-crown"></i>
                    </Button>
                    : 
                    <Button  className='m-1' variant="info" data-toggle="modal" data-target={"#moderatorModal" + admins._id}> 
                    <i class="fas fa-cogs"></i>
                    </Button>}
                    { admins.role === 'Super Admin' ? null : <Button className="m-1 danger" variant="danger" data-toggle="modal" data-target={"#deleteModal" + admins._id}>
                    <i className="fas fa-trash"></i>
                    </Button>}

                    <div className="modal fade" id={"deleteModal" + admins._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Delete Admin?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => deleteAdminHandler(admins._id)}>Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    <div className="modal fade" id={"deactivateModal" + admins._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <div className="modal fade" id={"activateModal" + admins._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <div className="modal fade" id={"superModal" + admins._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Set Moderator as Super Admin?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => superAdminHandler(admins._id)}>Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    <div className="modal fade" id={"moderatorModal" + admins._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Set Super Admin as Moderator?

                                <Form.Group className="mb-3">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Select id="department_field" placeholder="" value={thisDepartment} onChange={(e) => setDepartment(e.target.value)} >
                                        <option> -- SELECT DEPARTMENT --</option>
                                            { department && department.map((departments) => (
                                                <option value={departments._id}>{departments.deptname}</option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => moderatorAdminHandler(admins._id)}>Yes</button>
                            </div>
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

    const deactivateAdminHandler = (id) => {
        const formData = new FormData();
        formData.set('admin_status', 'Deactivated');
        dispatch(deactivateAdmin(id,formData,adminToken))
    }
    const activateAdminHandler = (id) => {
        const formData = new FormData();
        formData.set('admin_status', 'Active');
        dispatch(activateAdmin(id,formData,adminToken))
    }
    const superAdminHandler = (id) => {
        const formData = new FormData();
        formData.set('role', 'Super Admin');
        dispatch(superAdmin(id,formData,adminToken))
    }
    const moderatorAdminHandler = (id) => {
        const formData = new FormData();
        formData.set('departments', thisDepartment);
        dispatch(moderatorAdmin(id,formData,adminToken))
    }

    const deleteAdminHandler = (id) => {
        const formData = new FormData();
        formData.set('admin_status', 'Deleted');
        dispatch(deleteAdmin(id,formData,adminToken))
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
                    <h1>Administrators</h1>
                </div>
                {loading ? <LoaderAdmin/>  :  
                    <>
                <div className='d-flex align-items-start mx-5 mt-3 '>
                    <Button variant="success" className='success mx-1'><Link to="/admin/admins/new">+ Add</Link></Button>
                    <Button variant="success" className='danger'><Link to="/admin/admins/deleted"><i class="fas fa-trash"></i> Trash Bin</Link></Button>
                    
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