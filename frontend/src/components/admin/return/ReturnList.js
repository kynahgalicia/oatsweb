import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import {Row, Col, Button} from 'react-bootstrap';
import moment from 'moment'
import {MDBDataTableV5 } from 'mdbreact'

import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from '../../layout/AdminSidebar'

const ReturnList = () => {
    const { loading, error, borrow } = useSelector(state => state.borrows)

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
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

            borrow.forEach(borrow => {

                if(borrow.dateReturned !== null){
                    data.rows.push({
                        user: borrow.user.fname + " " + borrow.user.lname,
                        user_tupid: borrow.user.tupid,
                        thesis: borrow.thesis.title,
                        admin: borrow.admin.fname + " " + borrow.admin.lname,
                        admin_tupid: borrow.admin.tupid,
                        dateBorrowed: moment(borrow.dateBorrowed).format('MM/DD/YYYY'),
                        dueDate: moment(borrow.dueDate).format('MM/DD/YYYY'),
                        dateReturned: borrow.dateReturned,
                        actions: 
                            <Button variant="danger" data-toggle="modal" data-target={'#returnModal' + borrow._id}>
                                Return
                            </Button> 
                    })
                }
            })
        

        return data;
    }

    return(
        <Fragment>
            <Row>
                <Col sm= {2}>
                    <AdminSidebar/>
                </Col>

                <Col sm={10}>
                    <div className="admin-wrapper">
                        <div className="admin-wrapper">
                            <h1>Return</h1>
                        

                            <MDBDataTableV5 
                                hover 
                                entriesOptions={[5, 10, 15, 25]} 
                                entries={10} 
                                pagesAmount={4}
                                data={setData()} 
                                className='table'
                                container-sm="true"/>

                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default ReturnList