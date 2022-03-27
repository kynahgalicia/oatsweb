import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'

import {Row, Col, Form, Container, Button} from 'react-bootstrap';

import { newBorrow, clearErrors } from '../../../redux/actions/borrowActions'
import { NEW_BORROW_RESET } from '../../../redux/constants/borrowConstants'

import AdminSidebar from '../../layout/AdminSidebar'

const CreateBorrow = () => {  
    const [user_tupid, setUsertupid] = useState('');
    const [title, setTitle] = useState('');
    const [admin_id, setAdminid] = useState('');
    const [dateBorrowed, setDateborrowed] = useState('');
    const [dueDate, setDuedate] = useState('');
    // const [dateReturned, setDatereturned] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, error, success } = useSelector(state => state.newBorrow);
    const {isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/borrow');
            alert.success('Borrow request created successfully');
            dispatch({ type: NEW_BORROW_RESET })
        }

        if(isLoggedInAdmin){
            setAdminid(admin._id)
        }

        // if (!isLoggedInAdmin) {
        //     history.push('/admin/login');
        // }

        // dispatch(getDepartment())

    }, [dispatch, alert, error, success, history, isLoggedInAdmin])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('user', user_tupid);
        formData.set('theses', title);
        formData.set('admins', admin_id);
        formData.set('dateBorrowed', dateBorrowed);
        formData.set('dueDate', dueDate);
        // formData.set('dateReturned', dateReturned);

        dispatch(newBorrow(formData))
    }

    return(
        <Fragment>
            <Row>
                <Col sm={2}>
                    <AdminSidebar/>
                </Col>

                <Col sm={10}>
                    <Container>
                        <div className='createthesis'>
                            <div className='wrapper my-5'>
                                <Row>
                                    <h1>Create Borrow Request</h1>

                                    <Form action="" onSubmit={submitHandler}>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>TUP ID</Form.Label>
                                            <Form.Control
                                                className='w-75 my-1'
                                                type="text"
                                                id="borrowtupid"
                                                onChange={(e) => setUsertupid(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group className='mb-3'>
                                            <Form.Label>Thesis Title</Form.Label>
                                            <Form.Control
                                                className='w-75 my-1'
                                                type="text"
                                                id="borrowthesis"
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group className='mb-3'>
                                            <Form.Label>Date Borrowed</Form.Label>
                                            <Form.Control
                                                className='w-75 my-1'
                                                type="date"
                                                id="borrowdateborrowed"
                                                onChange={(e) => setDateborrowed(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group className='mb-3'>
                                            <Form.Label>Due Date</Form.Label>
                                            <Form.Control
                                                className='w-75 my-1'
                                                type="date"
                                                id="borrowdue"
                                                onChange={(e) => setDuedate(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Button 
                                            className='my-3'
                                            variant="primary" 
                                            type="submit"
                                            // id="login_button"
                                            disabled={loading ? true : false}
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                </Row>
                            </div>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Fragment>
    )
}

export default CreateBorrow