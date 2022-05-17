import React, { Fragment,useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import moment from 'moment'
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'

import { getBorrow, deleteBorrow, clearErrors} from '../../../redux/actions/borrowActions';
import { DELETE_BORROW_RESET } from '../../../redux/constants/borrowConstants'

import AdminSidebar from '../../layout/AdminSidebar'
import LoaderAdmin from '../../utils/LoaderAdmin'
const ReturnList = () => {
    const { loading, error, borrow } = useSelector(state => state.borrows)
    const {  error: deleteError, isDeleted } = useSelector(state => state.borrow)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

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

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            history.push('/admin/return');
            alert.success('Borrow Request deleted successfully');
            dispatch({ type: DELETE_BORROW_RESET })
        }

        // if (updateError) {
        //     alert.error(updateError);
        //     dispatch(clearErrors())
        // }

        // if (isUpdated) {
        //     history.push('/admin/borrow');
        //     alert.success('Returned');
        //     dispatch({ type: UPDATE_BORROW_RESET })
        // }
        // if (!isLoggedInAdmin) {
        //     history.push('/admin/login');
        // }
    }, [dispatch, alert, history, error, deleteError, admin, isDeleted])


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
                    label: 'Date Returned',
                    field: 'dateReturned',
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

            borrow.forEach(borrow => {

                if(borrow.status === 'Returned'){
                    data.rows.push({
                        user: borrow.user.fname + " " + borrow.user.lname,
                        user_tupid: borrow.user.tupid,
                        thesis: borrow.thesis.title,
                        admin: borrow.admin.fname + " " + borrow.admin.lname,
                        admin_tupid: borrow.admin.tupid,
                        dateBorrowed: moment(borrow.dateBorrowed).format('MM/DD/YYYY HH:mm:ss'),
                        dueDate: moment(borrow.dueDate).format('MM/DD/YYYY HH:mm:ss'),
                        dateReturned:moment(borrow.dateReturned).format(" MM/DD/YYYY HH:mm:ss"),
                        status: borrow.status,
                        // actions: 
                        //     <Button variant="danger" data-toggle="modal" data-target={'#returnModal' + borrow._id} onClick={() => deleteBorrowHandler(borrow._id)}>
                        //         <FaTrash/>
                        //     </Button> 
                    })
                }
            })
        

        return data;
    }

    const deleteBorrowHandler = (id) => {
        dispatch(deleteBorrow(id))
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
                            <h1>Returned Books</h1>
                        </div>
                            {loading ? <LoaderAdmin /> :
                        <>
                        
                            <MDBDataTableV5 
                                hover 
                                entriesOptions={[5, 10, 15, 25]} 
                                entries={10} 
                                pagesAmount={4}
                                data={setData()} 
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

export default ReturnList