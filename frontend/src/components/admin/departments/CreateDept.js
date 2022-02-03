import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import {Row, Col, Button} from 'react-bootstrap';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { newDept, clearErrors } from '../../../redux/actions/deptActions'
import { NEW_DEPT_RESET } from '../../../redux/constants/deptConstants'

const CreateDept = ({history}) => {
    const [deptname, setDeptname] = useState('');
    const [deptcode, setDeptcode] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newDept);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/dept');
            alert.success('department created successfully');
            dispatch({ type: NEW_DEPT_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        console.log(deptname);
        console.log(deptcode);
        formData.set('deptname', deptname);
        formData.set('deptcode', deptcode);

        dispatch(newDept(formData))
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Department</h1>

                                <div className="form-group">
                                    <label htmlFor="deptname_field">Department Name</label>
                                    <input
                                        type="text"
                                        id="deptname_field"
                                        className="form-control"
                                        value={deptname}
                                        onChange={(e) => setDeptname(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="deptcode_field">Code</label>
                                    <textarea className="form-control" id="deptcode_field" value={deptcode} onChange={(e) => setDeptcode(e.target.value)}></textarea>
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    Save
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateDept
