import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import LoaderAdmin from '../../utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { getBorrow, verifyBorrow, declineBorrow, clearErrors} from '../../../redux/actions/borrowActions';
import { UPDATE_BORROW_RESET, DELETE_BORROW_RESET , VERIFY_BORROW_RESET, DECLINE_BORROW_RESET} from '../../../redux/constants/borrowConstants';
import AdminSidebar from '../../layout/AdminSidebar'

const BorrowRequest = () => {
    const { loading, error, borrow } = useSelector(state => state.borrows)
    const {  error: updateError, isUpdated, deleteError, isDeleted } = useSelector(state => state.borrow);
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {isVerified, loadingButton, msg, isDeclined} = useSelector(state => state.verifyBorrow)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [dueDate, setDuedate] = useState('');
    const [thisDepartment, setThisDepartment] = useState('')

    useEffect(() => {

        dispatch(getBorrow())

        if(admin.role === 'Moderator'){
            setThisDepartment(admin.admin_department.deptname)
        }
    

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            history.push('/admin/borrow');
            alert.success('Returned');
            dispatch({ type: UPDATE_BORROW_RESET })
        }

        if (isDeleted) {
            history.push('/admin/return');
            alert.success('Borrow Request deleted successfully');
            dispatch({ type: DELETE_BORROW_RESET })
        }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

        if (isVerified) {
            history.push('/admin/borrow/request');
            alert.success(msg);
            dispatch({ type: VERIFY_BORROW_RESET })
        }
        if (isDeclined) {
            history.push('/admin/borrow/request');
            alert.success(msg);
            dispatch({ type: DECLINE_BORROW_RESET })
        }

        
        
    }, [dispatch, alert, error, history,isUpdated, updateError, deleteError, isDeleted,isLoggedInAdmin, isVerified, msg, isDeclined, admin])

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'Thesis',
                    field: 'thesis',
                    sort: 'desc'
                },
                {
                    label: 'TUPT ID',
                    field: 'user_tupid',
                    sort: 'desc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'desc'
                },
                {
                    label: 'Borrower',
                    field: 'user',
                    sort: 'desc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'desc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        {
            admin.role ===  'Moderator' ?

            <> 
            {borrow && borrow.forEach(borrow => {
                if(borrow.status === 'Pending' && borrow.thesis.department === thisDepartment){
                    data.rows.push({
                        thesis: borrow.thesis.title,
                        user_tupid: borrow.user.tupid,
                        department:  borrow.thesis.department ,
                        user: borrow.user.fname + " " + borrow.user.lname,
                        status: borrow.status,
                        actions: 
                        <Fragment>
                            <Button className="success" data-toggle="modal" data-target={'#verifyModal' + borrow._id}>
                                Accept
                            </Button> 
                            <Button className='mx-1 danger' data-toggle="modal" data-target={'#deleteModal' + borrow._id}>
                                Decline
                            </Button> 
        
        
                            <div className="modal fade" id={'verifyModal' +  borrow._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-body">

                                        <Form.Group className='mb-3'>
                                                <Form.Label> Please input due date:</Form.Label>
                                                <Form.Control
                                                    className=' my-1'
                                                    type="datetime-local"
                                                    id="borrowdue"
                                                    onChange={(e) => setDuedate(e.target.value)}
                                                />
                                            </Form.Group>                                </div>
                                    <div className="modal-footer">
                                        <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                        <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => verifyHandler(borrow._id)}>Submit</Button>
                                    </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id={'deleteModal' +  borrow._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-body">
                                        Do you really want to decline the request?
                                    </div>
                                    <div className="modal-footer">
                                        <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                        <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => declineHandler(borrow._id)}>Submit</Button>
                                    </div>
                                    </div>
                                </div>
                            </div>
        
                        </Fragment>
                        
                    })
                }
            })}

            </> : <> 
            {borrow && borrow.forEach(borrow => {
            if(borrow.status === 'Pending'){
                data.rows.push({
                    thesis: borrow.thesis.title,
                    user_tupid: borrow.user.tupid,
                    department:  borrow.thesis.department ,
                    user: borrow.user.fname + " " + borrow.user.lname,
                    status: borrow.status,
                    actions: 
                    <Fragment>
                        <Button className="success" data-toggle="modal" data-target={'#verifyModal' + borrow._id}>
                            Accept
                        </Button> 
                        <Button className='mx-1 danger' data-toggle="modal" data-target={'#deleteModal' + borrow._id}>
                            Decline
                        </Button> 
    
    
                        <div className="modal fade" id={'verifyModal' +  borrow._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">

                                    <Form.Group className='mb-3'>
                                            <Form.Label> Please input due date:</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="datetime-local"
                                                id="borrowdue"
                                                onChange={(e) => setDuedate(e.target.value)}
                                            />
                                        </Form.Group>                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => verifyHandler(borrow._id)}>Submit</Button>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id={'deleteModal' +  borrow._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Do you really want to decline the request?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => declineHandler(borrow._id)}>Submit</Button>
                                </div>
                                </div>
                            </div>
                        </div>
    
                    </Fragment>
                    
                })
            }
            })}
            </>

        }

        return data;
    }
    const setDataDenied = () => { 
        const data = {
            columns: [
                {
                    label: 'Thesis',
                    field: 'thesis',
                    sort: 'desc'
                },
                {
                    label: 'TUPT ID',
                    field: 'user_tupid',
                    sort: 'desc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'desc'
                },
                {
                    label: 'Borrower',
                    field: 'user',
                    sort: 'desc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'desc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        borrow && borrow.forEach(borrow => {
            if(borrow.status === 'Denied'){
                data.rows.push({
                    thesis: borrow.thesis.title,
                    user_tupid: borrow.user.tupid,
                    department:  borrow.thesis.department ,
                    user: borrow.user.fname + " " + borrow.user.lname,
                    status: borrow.status,
                    actions: 
                    <Fragment>
                        <Button className="success" data-toggle="modal" data-target={'#verifyModal' + borrow._id}>
                            Accept
                        </Button> 
    
                        <div className="modal fade" id={'verifyModal' +  borrow._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">

                                    <Form.Group className='mb-3'>
                                            <Form.Label> Please input due date:</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="date"
                                                id="borrowdue"
                                                onChange={(e) => setDuedate(e.target.value)}
                                            />
                                        </Form.Group>                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => verifyHandler(borrow._id)}>Submit</Button>
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


    const verifyHandler = (id) => {
        const formData = new FormData();
        formData.set('admins', admin._id);
        formData.set('id', id);
        formData.set('dueDate', dueDate);
        dispatch(verifyBorrow(formData))
    }
    const declineHandler = (id) => {
        dispatch(declineBorrow(id))
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

                                    <div className='d-flex align-items-start m-2 mb-5'>
                                    <h1>Borrow Requests</h1>
                                    </div>
                            {loading ? <LoaderAdmin /> : 
                                <>
                                    <div className='d-flex align-items-start mx-5'>
                                    <h3>Requests</h3>
                                    </div>
        
                                    <MDBDataTableV5 
                                    hover 
                                    entriesOptions={[5, 10, 15, 25]} 
                                    entries={5} 
                                    pagesAmount={4}
                                    data={setData()} 
                                    className='table px-4'
                                    container-sm="true"/>
                                    
                                    <div className='d-flex align-items-start mx-5'>
                                    <h3>Denied</h3>
                                    </div>
        
                                    <MDBDataTableV5 
                                    hover 
                                    entriesOptions={[5, 10, 15, 25]} 
                                    entries={5} 
                                    pagesAmount={4}
                                    data={setDataDenied()} 
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

export default BorrowRequest;