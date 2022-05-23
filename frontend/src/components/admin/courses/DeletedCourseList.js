import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import {getAdminCourse, restoreCourse, clearErrors} from '../../../redux/actions/courseActions'
import { RESTORE_COURSE_RESET } from '../../../redux/constants/courseConstants'

import AdminSidebar from '../../layout/AdminSidebar'

const DeletedCourseList = () => {
    const { loading, error, course } = useSelector(state => state.courses)
    const {  error: deleteError, isRestored } = useSelector(state => state.course)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)


    const dispatch = useDispatch();

    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
        dispatch(getAdminCourse());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isRestored) {
            history.push('/admin/course/deleted');
            alert.success('Course Restored successfully');
            dispatch({ type: RESTORE_COURSE_RESET })
        }
        
        if (admin.role === 'Moderator') {
            history.push('/')
            alert.error('Restricted')
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
    },[ dispatch, alert, error, deleteError, isRestored, history, isLoggedInAdmin,adminToken, admin]);


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
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        course && course.forEach(course => {
            if(course.status !== 'Active'){
                data.rows.push({
                    // id: course._id,
                    coursename: course.coursename,
                    coursecode: course.coursecode,
                    department: course.department.deptname,
                    status: <div className='denied'>{course.status}</div>,
                    actions:  
                    <Fragment>
    
                        <Button variant="danger" clasName='danger' data-toggle="modal" data-target={"#deleteModal" + course._id} disabled={course.department.status !== 'Active' ? true : false}>
                        <i className="fas fa-undo"></i>
                        </Button>
    
                        <div className="modal fade" id={"deleteModal"  + course._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <i class="fas fa-exclamation-triangle alert"/>
                                        <br/>
                                        Are you sure you want to restore this data?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal"  onClick={() => restoreCourseHandler(course._id)}>Yes</button>
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

    const restoreCourseHandler = (id) => {
        const formData = new FormData();
        formData.set('status', 'Active');
        dispatch(restoreCourse(id,adminToken, formData))
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
                        <h1>Deleted Courses</h1>
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

export default DeletedCourseList;