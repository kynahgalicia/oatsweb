import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import {getCourse, deleteCourse, clearErrors} from '../../../redux/actions/courseActions'
import { DELETE_COURSE_RESET } from '../../../redux/constants/courseConstants'

import AdminSidebar from '../../layout/AdminSidebar'

const CourseList = () => {
    const { loading, error, course } = useSelector(state => state.courses)
    const {  error: deleteError, isDeleted } = useSelector(state => state.course)
    const { isLoggedInAdmin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)


    const dispatch = useDispatch();

    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
        dispatch(getCourse());

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
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
    },[ dispatch, alert, error, deleteError, isDeleted, history, isLoggedInAdmin,adminToken]);


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
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        course.forEach(course => {
            data.rows.push({
                // id: course._id,
                coursename: course.coursename,
                coursecode: course.coursecode,
                department: course.department.deptname,
                actions: 
                <Fragment>
                    <Link to={`/admin/course/edit/${course._id}`} className="decor-none block">
                        <Button variant="info">
                        <FaPencilAlt/>
                        </Button>
                    </Link>

                    <Button variant="danger" onClick={() => deleteCourseHandler(course._id)}>
                        <FaTrash/>
                    </Button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteCourseHandler = (id) => {
        dispatch(deleteCourse(id,adminToken))
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
                    <h1>Courses</h1>
                </div>
                <div className='d-flex align-items-start mx-5 mt-3'>
                    <Button variant="success"><Link to="/admin/course/new">+ Add</Link></Button>
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

export default CourseList;