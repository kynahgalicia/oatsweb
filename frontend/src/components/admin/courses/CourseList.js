import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux'
import {getCourse, deleteCourse, clearErrors} from '../../../redux/actions/courseActions'
import { DELETE_COURSE_RESET } from '../../../redux/constants/courseConstants'

const CourseList = () => {
    const { loading, error, course } = useSelector(state => state.courses);
    const {  error: deleteError, isDeleted } = useSelector(state => state.course);

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
        
    },[ dispatch, alert, error, deleteError, isDeleted, history,]);


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
        dispatch(deleteCourse(id))
    }

    return(
        <Fragment>
            <div className="admin-wrapper">
                <h1>Courses</h1>
                <button><Link to="/admin/course/new">Add Course</Link></button>

                <MDBDataTableV5 
                    hover 
                    entriesOptions={[5, 10, 15, 25]} 
                    entries={10} 
                    pagesAmount={4}
                    data={setData()} 
                    className='table'
                    container-sm="true"/>
            </div>
        </Fragment>
    )
}

export default CourseList;