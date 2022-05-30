import React, { Fragment, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import LoaderAdmin from '../../../utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import {getDepartment,clearErrors} from '../../../../redux/actions/departmentActions'
import AdminSidebar from '../../../layout/AdminSidebar'
import ReactToPrint from "react-to-print";
require('../../dashboard/print.css');

const PrintDepartmentList = () => {
    const { loading, error, department } = useSelector(state => state.department);
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();

    useEffect(() => {
        dispatch(getDepartment());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

        if (admin.role === 'Moderator') {
            history.push('/')
            alert.error('Restricted')
        }
        
    },[ dispatch, alert, error, history,isLoggedInAdmin,adminToken, admin]);


    const setData = () => { 
        const data = {
            columns: [
                // {
                //     label: 'ID',
                //     field: 'id',
                //     sort: 'asc'
                // },
                {
                    label: 'Department Name',
                    field: 'deptname',
                    sort: 'asc'
                },
                {
                    label: 'Code',
                    field: 'deptcode',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        department.forEach(department => {
            data.rows.push({
                // id: department._id,
                deptname: department.deptname,
                deptcode: department.deptcode,
            
                
            })
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
                    <h1 className='print'>Departments</h1>
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

export default PrintDepartmentList;