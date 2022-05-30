import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../../components/utils/LoaderAdmin'
import { getAdmins,clearErrors} from '../../../../redux/actions/adminActions';
import AdminSidebar from '../../../layout/AdminSidebar'
import ReactToPrint from "react-to-print";
require('../../dashboard/print.css');
const PrintAdminList = () => {
    const { loading, admins } = useSelector(state => state.admins)
    const { isLoggedInAdmin,admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();



    useEffect(() => {

        if(adminToken){
            dispatch(getAdmins(adminToken))
        }

        if(admin.role === 'Moderator'){
            history.push('/');
            alert.error('Restricted');
        }


        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

    },[ dispatch, alert, history, isLoggedInAdmin,adminToken, admin]);

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
                }

            ],
            rows: []
        }

        admins && admins.forEach(admins => {
            
        if(admins.admin_status === 'Active'){ 
                data.rows.push({
                admin_tupid: admins.admin_tupid,
                admin_fname: admins.admin_fname,
                admin_lname: admins.admin_lname,
                admin_contact: admins.admin_contact,
                admin_tupmail: admins.admin_tupmail,
                department: admins.admin_department.deptname,
                role: <div className={admins.role === 'Super Admin'? "superAdmin" : "moderator"}>{admins.role}</div>,
                status: <div className={admins.admin_status === 'Active'? "active" : "denied"}>{admins.admin_status}</div> ,


            })
        }
        })

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
                    <h1 className='print'>Administrators</h1>
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
                
                    
                </div>
            </Col>
        </Row>
        </Fragment>
    )

}

export default PrintAdminList