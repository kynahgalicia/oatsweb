import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import moment from 'moment'
import { FaTrash} from 'react-icons/fa';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribe, clearErrors} from '../../../redux/actions/subscriptionActions';
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import AdminSidebar from '../../layout/AdminSidebar'

const BorrowList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const { loading, error, subs } = useSelector(state => state.subs)

    useEffect(() => {
            dispatch(getSubscribe())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        // if (!isLoggedInAdmin) {
        //     history.push('/admin/login');
        // }
    }, [dispatch, alert, error, history])

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'User',
                    field: 'user',
                    sort: 'desc'
                },
                {
                    label: 'Sender Name',
                    field: 'sender_name',
                    sort: 'desc'
                },
                {
                    label: 'Sender No.',
                    field: 'sender_no',
                    sort: 'desc'
                },
                {
                    label: 'Reference No.',
                    field: 'reference_no',
                    sort: 'asc'
                },
                {
                    label: 'Subscription Type',
                    field: 'sub_type',
                    sort: 'desc'
                },
                {
                    label: 'Paid At',
                    field: 'paidAt',
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

        subs && subs.forEach(subs => {
            if(subs.status === 'Pending'){
                data.rows.push({
                    user: subs.user.user_name,
                    sender_name: subs.sender_name,
                    sender_no: subs.sender_no,
                    reference_no: subs.reference_no,
                    sub_type: subs.sub_type, 
                    status: subs.status,
                    paidAt: moment(subs.paidAt).format('MM/DD/YYYY'),
                    actions: 
                    <Fragment>
                        <Button className="success">
                            Accept
                        </Button> 
                        <Button className='mx-1 danger' data-toggle="modal" data-target={'#deleteModal' + subs._id}>
                            Decline
                        </Button> 
    
    
                        <div className="modal fade" id={'deleteModal' +  subs._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Do you really want to decline the request?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal">Submit</Button>
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
                            <h1>Subscription Request</h1>
                        </div> 
                        { loading ? <LoaderAdmin /> :
                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={10} 
                            pagesAmount={4}
                            data={setData()} 
                            className='table px-4'
                            container-sm="true"/>}
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default BorrowList;