import React, { Fragment, useEffect, useState, useRef} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../utils/LoaderAdmin'
import { getUsers, clearErrors} from '../../../../redux/actions/userActions';
import AdminSidebar from '../../../layout/AdminSidebar'

import ReactToPrint from 'react-to-print';
require('../../dashboard/print.css');

const PrintUserList = () => {
    const { loading, error, users } = useSelector(state => state.users)
    const { isLoggedInAdmin,admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)
    
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();

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
        }

        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');

        }
    },[ dispatch, alert, error, history, isLoggedInAdmin,admin,adminToken]);

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
            
    
                })

            }
            })
    
    }

        return data;
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
                <div ref={el =>(componentRef = el) }>
                <div className='d-flex align-items-start m-2 px-5'>
                    <h1 className='print'>TUP-T Students</h1>
                </div >
                    {loading ? <LoaderAdmin/>  :  
                    <>
                    <div className='d-flex align-items-center mx-5 mt-3 ' >
                    <ReactToPrint
                        trigger={() => { return <Button className='success hide-print mx-1'><i className="fas fa-print"></i> Print</Button>}}
                        content={() =>componentRef}
                        bodyClass="table"
                        />
                    </div>
                    <MDBDataTableV5 
                        hover 
                        entriesOptions={[5, 10, 15, 25, 30, 35, 40, 45]} 
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
                </div>
            </Col>
        </Row>
        </Fragment>
    )

}

export default PrintUserList