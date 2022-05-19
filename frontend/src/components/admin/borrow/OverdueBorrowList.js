import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import moment from 'moment'
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import LoaderAdmin from '../../utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { getBorrow, returnBorrow, deleteBorrow, clearErrors} from '../../../redux/actions/borrowActions';
import { UPDATE_BORROW_RESET, DELETE_BORROW_RESET } from '../../../redux/constants/borrowConstants';
import AdminSidebar from '../../layout/AdminSidebar'

const OverdueBorrowList = () => {
    const { loading, error, borrow } = useSelector(state => state.borrows)
    const {  error: updateError, isUpdated, deleteError, isDeleted } = useSelector(state => state.borrow);
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    // const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [dateReturned, setDateReturned] = useState('')
    const [thisDepartment, setThisDepartment] = useState('')

    useEffect(() => {
        // if(adminToken){
            dispatch(getBorrow())
        // }
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
            history.push('/admin/borrow/overdue');
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
    }, [dispatch, alert, error, history,isUpdated, updateError, deleteError, isDeleted,isLoggedInAdmin, admin])

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'Borrower',
                    field: 'user',
                    sort: 'desc'
                },
                {
                    label: 'TUPT ID',
                    field: 'user_tupid',
                    sort: 'desc'
                },
                {
                    label: 'Thesis',
                    field: 'thesis',
                    sort: 'desc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'desc'
                },
                {
                    label: 'Admin',
                    field: 'admin',
                    sort: 'asc'
                },
                {
                    label: 'TUPT ID',
                    field: 'admin_tupid',
                    sort: 'desc'
                },
                {
                    label: 'Date Borrowed',
                    field: 'dateBorrowed',
                    sort: 'desc'
                },
                {
                    label: 'Due Date',
                    field: 'dueDate',
                    sort: 'desc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        { admin.role === 'Moderator' ?
        <> 
        {
                borrow && borrow.forEach(borrow => {
                if(borrow.dateReturned === null && borrow.status === 'Overdue' && borrow.thesis.department === thisDepartment){
                    data.rows.push({
                        user: borrow.user.fname + " " + borrow.user.lname,
                        user_tupid: borrow.user.tupid,
                        thesis: borrow.thesis.title,
                        department:  borrow.thesis.department ,
                        admin: ( borrow.admin ? borrow.admin.fname + " " + borrow.admin.lname: null),
                        admin_tupid: ( borrow.admin? borrow.admin.tupid : null), 
                        dateBorrowed: moment(borrow.dateBorrowed).format('MM/DD/YYYY hh:mm A'),
                        dueDate: moment(borrow.dueDate).format("MM/DD/YYYY hh:mm A"),
                        actions: 
                        <Fragment>
                            <Button variant="info" data-toggle="modal" data-target={'#returnModal' + borrow._id}>
                                Return
                            </Button> 
        
        
                            <div className="modal fade" id={'returnModal' +  borrow._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-body">
                                    <Form.Group className='mb-3'>
                                                    <Form.Label>Date Returned</Form.Label>
                                                    <Form.Control
                                                        className='w-75 my-1 flex-center'
                                                        type="datetime-local"
                                                        onChange={(e) => setDateReturned(e.target.value)}
                                                    />
                                                </Form.Group>
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
        } 
        </>
        :
        <> 
        {
            borrow && borrow.forEach(borrow => {
                if(borrow.dateReturned === null && borrow.status === 'Overdue'){
                    data.rows.push({
                        user: borrow.user.fname + " " + borrow.user.lname,
                        user_tupid: borrow.user.tupid,
                        thesis: borrow.thesis.title,
                        department:  borrow.thesis.department ,
                        admin: ( borrow.admin ? borrow.admin.fname + " " + borrow.admin.lname: null),
                        admin_tupid: ( borrow.admin? borrow.admin.tupid : null), 
                        dateBorrowed: moment(borrow.dateBorrowed).format('MM/DD/YYYY hh:mm A'),
                        dueDate: moment(borrow.dueDate).format("MM/DD/YYYY hh:mm A"),
                        actions: 
                        <Fragment>
                            <Button variant="info" data-toggle="modal" data-target={'#returnModal' + borrow._id}>
                                Return
                            </Button> 
        
        
                            <div className="modal fade" id={'returnModal' +  borrow._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-body">
                                    <Form.Group className='mb-3'>
                                                    <Form.Label>Date Returned</Form.Label>
                                                    <Form.Control
                                                        className='w-75 my-1 flex-center'
                                                        type="datetime-local"
                                                        onChange={(e) => setDateReturned(e.target.value)}
                                                    />
                                                </Form.Group>
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
        } 
        </>
    
    }
        borrow && borrow.forEach(borrow => {
            if(borrow.dateReturned === null && borrow.status === 'Overdue'){
                data.rows.push({
                    user: borrow.user.fname + " " + borrow.user.lname,
                    user_tupid: borrow.user.tupid,
                    thesis: borrow.thesis.title,
                    department:  borrow.thesis.department ,
                    admin: ( borrow.admin ? borrow.admin.fname + " " + borrow.admin.lname: null),
                    admin_tupid: ( borrow.admin? borrow.admin.tupid : null), 
                    dateBorrowed: moment(borrow.dateBorrowed).format('MM/DD/YYYY hh:mm A'),
                    dueDate: moment(borrow.dueDate).format("MM/DD/YYYY hh:mm A"),
                    actions: 
                    <Fragment>
                        <Button variant="info" data-toggle="modal" data-target={'#returnModal' + borrow._id}>
                            Return
                        </Button> 
    
    
                        <div className="modal fade" id={'returnModal' +  borrow._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                <Form.Group className='mb-3'>
                                                <Form.Label>Date Returned</Form.Label>
                                                <Form.Control
                                                    className='w-75 my-1 flex-center'
                                                    type="datetime-local"
                                                    onChange={(e) => setDateReturned(e.target.value)}
                                                />
                                            </Form.Group>
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
    

    // const deleteBorrowHandler = (id) => {
    //     dispatch(deleteBorrow(id))
    // }

    const returnHandler = (id) => {

        const formData = new FormData();
        formData.set('dateReturned', dateReturned);
        formData.set('id', id);
        dispatch(returnBorrow(formData))
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
                        <div className='d-flex align-items-start m-2 px-5'>
                            <h1>Overdue Books</h1>
                        </div>

                        { loading ? <LoaderAdmin /> :
                        <>

                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={10} 
                            pagesAmount={4}
                            data={setData()} 
                            className='table px-5'
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

export default OverdueBorrowList;