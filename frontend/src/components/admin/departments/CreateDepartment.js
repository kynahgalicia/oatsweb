import React, { Fragment, useState, useEffect } from 'react'
import {Row, Col, Button} from 'react-bootstrap';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { newDepartment, clearErrors } from '../../../redux/actions/departmentActions'
import { NEW_DEPARTMENT_RESET } from '../../../redux/constants/departmentConstants'
import AdminSidebar from '../../layout/AdminSidebar'
const CreateDepartment = ({history}) => {
    const [deptname, setDepartmentname] = useState('');
    const [deptcode, setDepartmentcode] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newDepartment);
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/department');
            alert.success('department created successfully');
            dispatch({ type: NEW_DEPARTMENT_RESET })
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

        if (admin.role === 'Moderator') {
            history.push('/')
            alert.error('Restricted')
        }
    }, [dispatch, alert, error, success, history,isLoggedInAdmin, adminToken, admin])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        console.log(deptname);
        console.log(deptcode);
        formData.set('deptname', deptname);
        formData.set('deptcode', deptcode);

        dispatch(newDepartment(formData,adminToken))
    }

    return (
        <Fragment>
            <Row>
                <Col sm= {2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col>

                <Col sm={10}>
                <div className='back-button text-start px-3 py-2'>
                    <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                </div>
                    <div className="form-admin-wrapper">
                    
                        <div className="wrapper my-5">
                            <form onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Department</h1>

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
                                        Save
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

export default CreateDepartment
