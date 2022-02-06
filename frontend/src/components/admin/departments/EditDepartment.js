import React, { Fragment, useState, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'

import { updateDepartment, getDepartmentDetails, clearErrors } from '../../../redux/actions/departmentActions'
import { UPDATE_DEPARTMENT_RESET } from '../../../redux/constants/departmentConstants'

const Updatedepartment = ({ match, history }) => {
    const [deptname, setDepartmentname] = useState('');
    const [deptcode, setDepartmentcode] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, department } = useSelector(state => state.departmentDetails)
    const {  error: updateError, isUpdated } = useSelector(state => state.departments);

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
    }, [dispatch, alert, error, isUpdated, history, updateError, department, departmentId])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('deptname', deptname);
        formData.set('deptcode', deptcode);

        dispatch(updateDepartment(department._id, formData))
    }

    return (
        <Fragment>
            <div className="wrapper my-5">
                <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
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
                        <label htmlFor="deptcode_field">Code</label>
                        <textarea className="form-control" id="deptcode_field" rows="8" value={deptcode} onChange={(e) => setDepartmentcode(e.target.value)}></textarea>
                    </div>

                    <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                    >
                        UPDATE
                </button>

                </form>
            </div>
        </Fragment>
    )
}

export default Updatedepartment
