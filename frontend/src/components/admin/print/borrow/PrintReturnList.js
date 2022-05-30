import React, { Fragment,useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import moment from 'moment'
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'

import { getBorrow, clearErrors} from '../../../../redux/actions/borrowActions';
import AdminSidebar from '../../../layout/AdminSidebar'
import LoaderAdmin from '../../../utils/LoaderAdmin'

import ReactToPrint from "react-to-print";
require('../../dashboard/print.css');
const PrintReturnList = () => {
    const { loading, error, borrow } = useSelector(state => state.borrows)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();

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

    }, [dispatch, alert, history, error, admin])


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
                }
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
                    <h1 className='print'>Returned Books</h1>
                </div >
                            {loading ? <LoaderAdmin /> :
                        <>
                          <div className='d-flex align-items-center mx-5 mt-3 ' >
                            <ReactToPrint
                                trigger={() => { return <Button className='success hide-print mx-1'><i className="fas fa-print"></i> Print</Button>}}
                                content={() =>componentRef}
                                bodyClass="table"
                            />
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

export default PrintReturnList