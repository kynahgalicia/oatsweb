import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import moment from 'moment'
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribe, expireSubscribeAdmin, clearErrors} from '../../../redux/actions/subscriptionActions';
import { DELETE_SUBSCRIBES_RESET} from '../../../redux/constants/subscriptionConstants';
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import AdminSidebar from '../../layout/AdminSidebar'

const SubscriptionList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const { loading, error, subs } = useSelector(state => state.subs)
    const { isDeleted, msg } = useSelector(state => state.subscribes)

    useEffect(() => {
            dispatch(getSubscribe())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            history.push('/admin/subscription/list');
            alert.success(msg);
            dispatch({ type: DELETE_SUBSCRIBES_RESET })
        }

        // if (!isLoggedInAdmin) {
        //     history.push('/admin/login');
        // }

        // if(expired){
        //     console.log(expired)
        // }
    }, [dispatch, alert, error, history, isDeleted])

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
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        // let expired = []
        // subs && subs.forEach(subs => {
        //     if(subs.status === 'Active'){
        //         const startDate = moment(subs.activatedAt);
        //         const timeEnd = moment(Date.now());
        //         const diff = timeEnd.diff(startDate);
        //         const diffDuration = moment.duration(diff);

        //         const duration = diffDuration._data.days;
                
        //         console.log(duration)
        //         if(subs.sub_type === 'oneDay' && subs.status === "Active" && duration >= 1 ){
        //             expired.push(subs._id)
        //         }
        //         if(subs.sub_type === 'weekly' && subs.status === "Active" && duration >= 7 ){
        //             expired.push(subs._id)
        //         }
        //     }
        // })
        
        // if(expired !== []){ 
        //     const formData = new FormData()
        //     formData.append('expiredSubs', JSON.stringify(expired))
        //     dispatch(expireSubscribeAdmin(formData))
        // }

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
                    
                    actions: 
                    <Fragment>
                        <Button className='mx-1 danger' data-toggle="modal" data-target={'#deleteModal' + subs._id}>
                            Revoke
                        </Button> 
    
    
                        <div className="modal fade" id={'deleteModal' +  subs._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Do you really want to revoke the subscription?
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
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'desc'
                },
                // {
                //     label: 'Actions',
                //     field: 'actions',
                // },
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
                    activatedAt: moment(subs.activatedAt).format('MM/DD/YYYY'),
                    // actions: 
                    // <Fragment>
                    //     <Button className="success">
                    //         Accept
                    //     </Button> 
                    //     <Button className='mx-1 danger' data-toggle="modal" data-target={'#deleteModal' + subs._id}>
                    //         Decline
                    //     </Button> 
    
    
                    //     <div className="modal fade" id={'deleteModal' +  subs._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    //         <div className="modal-dialog" role="document">
                    //             <div className="modal-content">
                    //             <div className="modal-body">
                    //                 Do you really want to decline the request?
                    //             </div>
                    //             <div className="modal-footer">
                    //                 <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                    //                 <Button  className="btn btn-danger" data-dismiss="modal">Submit</Button>
                    //             </div>
                    //             </div>
                    //         </div>
                    //     </div>
    
                    // </Fragment>
                    
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
                        <div className='d-flex align-items-start mx-2 mb-4'>
                            <h1>Subscriptions</h1>
                        </div>
                        { loading ? <LoaderAdmin /> :
                        <>
                        <div className='d-flex align-items-start mx-5'>
                            <h3>Active</h3>
                        </div>
                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={10} 
                            pagesAmount={4}
                            data={setData()} 
                            className='table px-4'
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
                            className='table px-4'
                            container-sm="true"
                            searchTop
                            searchBottom={false}
                        />
                        </>
                    }
                    </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default SubscriptionList;