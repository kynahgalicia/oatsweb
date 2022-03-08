import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaPencilAlt,FaUserAltSlash} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'

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
                        <Button variant="info">
                        <FaPencilAlt/>
                        </Button>
                    {/* </Link> */}

                    <Button variant="danger" data-toggle="tooltip" data-placement="bottom" title="Deactivate">
                    <FaUserAltSlash />
                    </Button>
                </Fragment>
            })
            console.log('test')
        })

        return data;
    }
    return(
        <Fragment>
        <Row>
        <Col sm= {2}>
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
                <h1>Admins</h1>
                    <button><Link to="/admin/admins/new">Add</Link></button>

                    <MDBDataTableV5 
                        hover 
                        entriesOptions={[5, 10, 15, 25]} 
                        entries={10} 
                        pagesAmount={4}
                        data={setData()} 
                        className='table'
                        container-sm="true"/>
                </div>
            </Col>
        </Row>
        </Fragment>
    )

}

export default UserList