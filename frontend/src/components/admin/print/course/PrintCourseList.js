import React, { Fragment, useEffect , useRef} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import LoaderAdmin from '../../../../components/utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import {getAdminCourse, clearErrors} from '../../../../redux/actions/courseActions'

import AdminSidebar from '../../../layout/AdminSidebar'

import ReactToPrint from "react-to-print";
require('../../dashboard/print.css');

const PrintCourseList = () => {
    const { loading, error, course } = useSelector(state => state.courses)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)


    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();

    useEffect(() => {
        dispatch(getAdminCourse());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        
        if (admin.role === 'Moderator') {
            history.push('/')
            alert.error('Restricted')
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
    },[ dispatch, alert, error,history, isLoggedInAdmin,adminToken, admin]);


    const setData = () => { 
        const data = {
            columns: [
                // {
                //     label: 'ID',
                //     field: 'id',
                //     sort: 'desc'
                // },
                {
                    label: 'Course',
                    field: 'coursename',
                    sort: 'asc'
                },
                {
                    label: 'Code',
                    field: 'coursecode',
                    sort: 'desc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'desc'
                }
            ],
            rows: []
        }

        course.forEach(course => {
            if(course.status === 'Active'){
                data.rows.push({
                    // id: course._id,
                    coursename: course.coursename,
                    coursecode: course.coursecode,
                    department: course.department.deptname,
                
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
                    <h1 className='print'>Courses</h1>
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

export default PrintCourseList;