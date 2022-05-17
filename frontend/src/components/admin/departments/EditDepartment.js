import React, { Fragment, useState, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import {Button,Row,Col} from 'react-bootstrap';

import { updateDepartment, getDepartmentDetails, clearErrors } from '../../../redux/actions/departmentActions'
import { UPDATE_DEPARTMENT_RESET } from '../../../redux/constants/departmentConstants'
import AdminSidebar from '../../layout/AdminSidebar'
const Updatedepartment = ({ match, history }) => {
    const [deptname, setDepartmentname] = useState('');
    const [deptcode, setDepartmentcode] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, department } = useSelector(state => state.departmentDetails)
    const {  error: updateError, isUpdated } = useSelector(state => state.departments);
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const {departmentId} = useParams();

    useEffect(() => {
        console.log(departmentId, department, (department && department._id) !== departmentId)
        if ((department && department._id) !== departmentId) {
            dispatch(getDepartmentDetails(departmentId));
        } else {
            setDepartmentname(department.deptname);
            setDepartmentcode(department.deptcode);
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
            history.push('/admin/department');
            alert.success('Department updated successfully!');
            dispatch({ type: UPDATE_DEPARTMENT_RESET })
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

        if (admin.role === 'Moderator') {
            history.push('/')
            alert.error('Restricted')
        }
    }, [dispatch, alert, error, isUpdated, history, updateError, department,isLoggedInAdmin,adminToken, departmentId, admin])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('deptname', deptname);
        formData.set('deptcode', deptcode);

        dispatch(updateDepartment(department._id, formData,adminToken))
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
                                <h1 className="mb-4">Update Department</h1>

                                <div className="form-group">
                                    <label htmlFor="deptname_field">Department Name</label>
                                    <input
                                        type="text"
                                        id="deptname_field"
                                        className="form-control"
                                        value={deptname}
                                        onChange={(e) => setDepartmentname(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="deptcode_field">Department Code</label>
                                    <input
                                        type="text"
                                        id="deptcode_field"
                                        className="form-control"
                                        value={deptcode}
                                        onChange={(e) => setDepartmentcode(e.target.value)}
                                    />
                                </div>

                                <div className='d-flex justify-content-end'>
                                    <Button id="login_button" variant="success" type="submit" disabled={loading ? true : false}>
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

export default Updatedepartment
