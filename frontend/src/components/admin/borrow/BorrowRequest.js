import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import moment from 'moment'
import { FaTrash} from 'react-icons/fa';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'

import { useDispatch, useSelector } from 'react-redux'
import { getBorrow, updateBorrow, deleteBorrow, clearErrors} from '../../../redux/actions/borrowActions';
import { UPDATE_BORROW_RESET, DELETE_BORROW_RESET } from '../../../redux/constants/borrowConstants';
import AdminSidebar from '../../layout/AdminSidebar'

const BorrowRequest = () => {
    const { loading, error, borrow } = useSelector(state => state.borrows)
    const {  error: updateError, isUpdated, deleteError, isDeleted } = useSelector(state => state.borrow);
    const { isLoggedInAdmin} = useSelector(state => state.authAdmin)
    // const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [dateReturned, setDateReturned] = useState('')

    useEffect(() => {
        // if(adminToken){
            dispatch(getBorrow())
        // }

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
    }, [dispatch, alert, error, history,isUpdated, updateError, deleteError, isDeleted,isLoggedInAdmin])

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
            if(borrow.status === 'Pending'){
                data.rows.push({
                    thesis: borrow.thesis.title,
                    user_tupid: borrow.user.tupid,
                    user: borrow.user.fname + " " + borrow.user.lname,
                    status: borrow.status,
                    actions: 
                    <Fragment>
                        <Button className="success">
                            Accept
                        </Button> 
                        <Button className='mx-1 danger' data-toggle="modal" data-target={'#deleteModal' + borrow._id}>
                            Decline
                        </Button> 
    
    
                        <div className="modal fade" id={'deleteModal' +  borrow._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Do you really want to decline the request?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => returnHandler(borrow._id)}>Submit</Button>
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

    const deleteBorrowHandler = (id) => {
        dispatch(deleteBorrow(id))
    }

    const returnHandler = (id) => {

        const formData = new FormData();
        formData.set('dateReturned', dateReturned);
        dispatch(updateBorrow(id))
        console.log(id)
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
                        <div className='d-flex align-items-start m-2'>
                            <h1>Borrow Requests</h1>
                        </div>

                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={10} 
                            pagesAmount={4}
                            data={setData()} 
                            className='table px-4'
                            container-sm="true"/>
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default BorrowRequest;