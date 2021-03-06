import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import {getAdminCourse, deleteCourse, clearErrors} from '../../../redux/actions/courseActions'
import { DELETE_COURSE_RESET } from '../../../redux/constants/courseConstants'

import AdminSidebar from '../../layout/AdminSidebar'

const CourseList = () => {
    const { loading, error, course } = useSelector(state => state.courses)
    const {  error: deleteError, isDeleted } = useSelector(state => state.course)
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

        if (isDeleted) {
            history.push('/admin/course');
            alert.success('Course deleted successfully');
            dispatch({ type: DELETE_COURSE_RESET })
        }
        
        if (admin.role === 'Moderator') {
            history.push('/')
            alert.error('Restricted')
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
    },[ dispatch, alert, error, deleteError, isDeleted, history, isLoggedInAdmin,adminToken, admin]);


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

        course.forEach(course => {
            if(course.status === 'Active'){
                data.rows.push({
                    // id: course._id,
                    coursename: course.coursename,
                    coursecode: course.coursecode,
                    department: course.department.deptname,
                    status: <div className="active">{course.status}</div>,
                    actions: 
                    <Fragment>
                        <Link to={`/admin/course/edit/${course._id}`} className="decor-none block">
                            <Button variant="info">
                            <FaPencilAlt/>
                            </Button>
                        </Link>
    
                        <Button variant="danger" data-toggle="modal" data-target={"#deleteModal" + course._id} className='m-1 danger'>
                            <FaTrash/>
                        </Button>
    
                        <div className="modal fade" id={"deleteModal"  + course._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <i class="fas fa-exclamation-triangle alert"/>
                                        <br/>
                                        This course may contain data from other lists. Are you sure you want to delete this course? This action cannot be undone.
                                    </div>
                                    
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal"  onClick={() => deleteCourseHandler(course._id)}>Yes</button>
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

    const deleteCourseHandler = (id) => {
        const formData = new FormData();
        formData.set('status', 'Deleted');
        dispatch(deleteCourse(id,adminToken, formData))
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
                        <h1>Courses</h1>
                    </div>
                
                {loading ? <LoaderAdmin/>  :  
                    <>
                <div className='d-flex align-items-start mx-5 mt-3'>
                    <Button variant="success" className='success mx-1'><Link to="/admin/course/new">+ Add</Link></Button>
                    <Button variant="success" className='danger'><Link to="/admin/course/deleted"><i class="fas fa-trash"></i> Trash Bin</Link></Button>
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

export default CourseList;