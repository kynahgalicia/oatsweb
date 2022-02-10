import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { newCourse, clearErrors } from '../../../redux/actions/courseActions'
import {getDepartment} from '../../../redux/actions/departmentActions'
import { NEW_COURSE_RESET } from '../../../redux/constants/courseConstants'

const CreateCourse = () => {
    const [coursename, setCoursename] = useState('');
    const [coursecode, setCoursecode] = useState('');
    const [thisDepartment, setDepartment] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const {department} = useSelector(state => state.department)
    const { loading, error, success } = useSelector(state => state.newCourse);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/course');
            alert.success('course created successfully');
            dispatch({ type: NEW_COURSE_RESET })
        }

        dispatch(getDepartment())

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        // console.log(deptname);
        // console.log(deptcode);
        formData.set('coursename', coursename);
        formData.set('coursecode', coursecode);
        formData.set('departments', thisDepartment);

        dispatch(newCourse(formData))
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Course</h1>

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

                                <Form.Group className="mb-3">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Select id="department_field" placeholder="" value={thisDepartment} onChange={(e) => setDepartment(e.target.value)} >
                                    <option> -- SELECT DEPARTMENT --</option>

                                        { department && department.map((departments) => (
                                                    
                                                <option value={departments._id}>{departments.deptname}</option>
                                                    
                                            ))}
                                    </Form.Select>
                                </Form.Group>

                                <Button id="login_button" type="submit" disabled={loading ? true : false}>
                                    Save
                                </Button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateCourse
