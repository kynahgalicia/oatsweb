import React, { Fragment, useState, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import {Button,Row,Col} from 'react-bootstrap';

import { updateCourse, getCourseDetails, clearErrors } from '../../../redux/actions/courseActions'
import { UPDATE_COURSE_RESET } from '../../../redux/constants/courseConstants'

import AdminSidebar from '../../layout/AdminSidebar'
const Updatecourse = ({ match, history }) => {
    const [coursename, setCoursename] = useState('');
    const [coursecode, setCoursecode] = useState('');
    const [thisDepartment, setDepartment] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, course } = useSelector(state => state.courseDetails)
    const {  error: updateError, isUpdated } = useSelector(state => state.course);
    // const { departments, loading } = useSelector(state => state.departments)
    const { isLoggedInAdmin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const {courseId} = useParams();

    useEffect(() => {
        console.log(courseId, course, (course && course._id) !== courseId)
        if ((course && course._id) !== courseId) {
            dispatch(getCourseDetails(courseId));
        } else {
            setCoursename(course.coursename);
            setCoursecode(course.coursecode);
            setDepartment(course.thisDepartment)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            history.push('/admin/course');
            alert.success('Course updated successfully!');
            dispatch({ type: UPDATE_COURSE_RESET })
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
    }, [dispatch, alert, error, isUpdated, history, updateError, course, courseId,isLoggedInAdmin,adminToken])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('coursename', coursename);
        formData.set('coursecode', coursecode);
        formData.set('departments', thisDepartment);

        dispatch(updateCourse(course._id, formData,adminToken))
    }

    return (
        <Fragment>
            <Row>
                <Col sm= {2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col>

                <Col sm={10}>
                    <div className="form-admin-wrapper">
                        <div className="wrapper my-5">
                            <form onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Course</h1>

                                <div className="form-group">
                                    <label htmlFor="coursename_field">Course Name</label>
                                    <input
                                        type="text"
                                        id="coursename_field"
                                        className="form-control"
                                        value={coursename}
                                        onChange={(e) => setCoursename(e.target.value)}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="coursecode_field">Course Code</label>
                                    <input
                                        type="text"
                                        id="coursecode_field"
                                        className="form-control"
                                        value={coursecode}
                                        onChange={(e) => setCoursecode(e.target.value)}
                                    />
                                </div>

                                {/* <div className="form-group">
                                    <label htmlFor="coursecode_field">Code</label>
                                    <textarea className="form-control" id="coursecode_field" rows="8" value={coursecode} onChange={(e) => setCoursecode(e.target.value)}></textarea>
                                </div> */}

                                {/* <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    UPDATE
                            </button> */}

                                <div className='d-flex justify-content-end'>
                                    <Button id="login_button" type="submit" variant='success' disabled={loading ? true : false}>
                                        Update
                                    </Button>
                                </div>

                            </form>
                        </div> 
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Updatecourse
