import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import moment from 'moment'
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribe, declineSubscribe, clearErrors} from '../../../../redux/actions/subscriptionActions';
import LoaderAdmin from '../../../utils/LoaderAdmin'
import AdminSidebar from '../../../layout/AdminSidebar'
import ReactToPrint from "react-to-print";
require('../../dashboard/print.css');

const PrintSubscriptionList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();

    const { loading, error, subs } = useSelector(state => state.subs)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)

    useEffect(() => {
            dispatch(getSubscribe())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


        if (admin.role === 'Moderator') {
            history.push('/')
            alert.error('Restricted')
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

        // if(expired){
        //     console.log(expired)
        // }
    }, [dispatch, alert, error, history,admin, isLoggedInAdmin])


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
                    label: 'Activated At',
                    field: 'activatedAt',
                    sort: 'desc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'desc'
                }
            ],
            rows: []
        }

        subs && subs.forEach(subs => {
            if(subs.status === 'Active'){
                data.rows.push({
                    user: subs.user.user_name,
                    sender_name: subs.sender_name,
                    sender_no: subs.sender_no,
                    reference_no: subs.reference_no,
                    sub_type: subs.sub_type, 
                    status: subs.status,
                    paidAt: moment(subs.paidAt).format('MM/DD/YYYY'),
                    activatedAt: moment(subs.activatedAt).format('MM/DD/YYYY'),
                    
                    
                })
            }
        })

        return data;
    }
    const setDataExpired = () => { 
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
                    label: 'Activated At',
                    field: 'activatedAt',
                    sort: 'desc'
                }
            ],
            rows: []
        }

        subs && subs.forEach(subs => {
            if(subs.status === 'Expired'){
                data.rows.push({
                    user: subs.user.user_name,
                    sender_name: subs.sender_name,
                    sender_no: subs.sender_no,
                    reference_no: subs.reference_no,
                    sub_type: subs.sub_type, 
                    status: subs.status,
                    paidAt: moment(subs.paidAt).format('MM/DD/YYYY'),
                
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
                        <div className='back-button text-start px-3 py-2'>
                        <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                        </div>
                <div className="table-admin">
                <div ref={el =>(componentRef = el) }>
                <div className='d-flex align-items-start m-2 px-5'>
                    <h1 className='print'>Subscriptions</h1>
                </div >
                        { loading ? <LoaderAdmin /> :
                        <>
                        <div className='d-flex align-items-center mx-5 mt-3 ' >
                    <ReactToPrint
                        trigger={() => { return <Button className='success hide-print mx-1'><i className="fas fa-print"></i> Print</Button>}}
                        content={() =>componentRef}
                        bodyClass="table"
                    />
                </div>
                        <div className='d-flex align-items-start mx-5'>
                            <h3>Active</h3>
                        </div>
                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={10} 
                            pagesAmount={4}
                            data={setData()} 
                            className='table px-5'
                            container-sm="true"
                            searchTop
                        searchBottom={false}/>

                        <div className='d-flex align-items-start mx-5'>
                            <h3>Expired</h3>
                        </div>
                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={10} 
                            pagesAmount={4}
                            data={setDataExpired()} 
                            className='table px-5'
                            container-sm="true"
                            searchTop
                            searchBottom={false}
                        />
                        </>
                    }
                    </div>
                    </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default PrintSubscriptionList;