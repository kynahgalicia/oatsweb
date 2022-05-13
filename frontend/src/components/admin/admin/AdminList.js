import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getAdmins, deactivateAdmin, activateAdmin, superAdmin} from '../../../redux/actions/adminActions';
import { DEACTIVATE_ADMIN_RESET, ACTIVATE_ADMIN_RESET, SUPER_ADMIN_RESET} from '../../../redux/constants/adminConstants';
import AdminSidebar from '../../layout/AdminSidebar'
const UserList = () => {
    const { loading, error, admins } = useSelector(state => state.admins)
    const { isDeactivated, isActivated, isSuperAdmin} = useSelector(state => state.admin)
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

        if (isDeactivated) {
            history.push('/admin/admins');
            alert.success('Deactivated');
            dispatch({ type: DEACTIVATE_ADMIN_RESET })
        }
        if (isActivated) {
            history.push('/admin/admins');
            alert.success('Deactivated');
            dispatch({ type: ACTIVATE_ADMIN_RESET })
        }
        if (isSuperAdmin) {
            history.push('/admin/admins');
            alert.success('super admin has been assigned');
            dispatch({ type: SUPER_ADMIN_RESET })
        }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
    },[ dispatch, alert, error, history, isLoggedInAdmin,adminToken, isDeactivated, isActivated, isSuperAdmin]);

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
            data.rows.push({
                admin_tupid: admins.admin_tupid,
                admin_fname: admins.admin_fname,
                admin_lname: admins.admin_lname,
                admin_contact: admins.admin_contact,
                admin_tupmail: admins.admin_tupmail,
                department: admins.admin_department.deptname,
                role: admins.role,
                status: admins.admin_status,
                actions:
                <Fragment>
                    {/* <Link to={`/admin/admins/edit/${admins._id}`} className="decor-none block">
                    <Button variant="primary" data-toggle="tooltip" data-placement="bottom" title="Edit">
                        <i className="fas fa-pencil-alt"></i>
                        </Button>
                    </Link> */}

                    { admins.admin_status === "Deactivated" ? 
                    <Button variant="success "  className='m-1' data-toggle="modal" data-target={"#activateModal" + admins._id}> 
                    <i className="fas fa-user-check"></i>
                    </Button>
                    : 
                    <Button className='m-1' variant="secondary" data-toggle="modal" data-target={"#deactivateModal" + admins._id}> 
                    <i className="fas fa-user-times"></i>
                    </Button>}
                    { admins.role === "Moderator" ? 
                    <Button  className='m-1' variant="warning" data-toggle="modal" data-target={"#superModal" + admins._id}> 
                    <i class="fas fa-crown"></i>
                    </Button>
                    : 
                    <Button  className='m-1' variant="info" data-toggle="modal" data-target={"#moderatorModal" + admins._id}> 
                    <i class="fas fa-cogs"></i>
                    </Button>}
                    <Button className="m-1" variant="danger" data-toggle="modal" data-target={"#deleteModal" + admins._id}>
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
                </Fragment>
            })
            console.log('test')
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