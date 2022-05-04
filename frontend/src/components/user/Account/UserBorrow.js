import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import {Row, Col} from 'react-bootstrap'
import moment from 'moment'
import {MDBDataTableV5 } from 'mdbreact'
import UserSidebar from '../../layout/UserSidebar'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import {getStudentBorrow } from '../../../redux/actions/borrowActions';
const UserBorrow = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const { loading, error, borrow } = useSelector(state => state.borrows)
    const {user, isLoggedIn} = useSelector(state => state.authUser)

    useEffect(() => {

        if(isLoggedIn){ 
            dispatch(getStudentBorrow( user.user_tupid))}
    }, [dispatch, alert, error, isLoggedIn])

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'Thesis',
                    field: 'thesis',
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
                    label: 'Status',
                    field: 'status',
                },
            ],
            rows: []
        }

        borrow.forEach(borrow => {
            if(borrow.dateReturned === null){
                data.rows.push({
                    thesis: borrow.thesis.title,
                    dateBorrowed: ( borrow.dateBorrowed === null ? "Pending" : moment(borrow.dateBorrowed).format('MM/DD/YYYY')),
                    dueDate: ( borrow.dateBorrowed === null ? "Pending" :  moment(borrow.dueDate).format('MM/DD/YYYY')),
                    status: <div className={ borrow.status === 'Active' ? 'active' : 'pending'}>{borrow.status}</div>
                    
                })
            }
        })

        return data;
    }
    const setDataReturn = () => { 
        const data = {
            columns: [
                {
                    label: 'Thesis',
                    field: 'thesis',
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
                },
            ],
            rows: []
        }

        borrow.forEach(borrow => {
            if(borrow.dateReturned !== null && borrow.status === 'Returned'){
                data.rows.push({
                    thesis: borrow.thesis.title,
                    dateBorrowed:  moment(borrow.dateBorrowed).format('MM/DD/YYYY'),
                    dueDate: moment(borrow.dueDate).format('MM/DD/YYYY'),
                    dateReturned: moment(borrow.dateReturned).format('MM/DD/YYYY'),
                    status: <div className='active'>{borrow.status}</div>
                    
                })
            }
        })

        return data;
    }

    return (
        <Fragment>
            <Row>
                <Col sm= {2} className="admin-sidebar">
                    <UserSidebar/>
                </Col> 
                
                <Col sm={10}>
                
                { loading ? <LoaderAdmin/>:
                <div>

                <div className="table-admin">
                        <div className='d-flex align-items-start m-2'>
                            <h1>Borrow</h1>
                        </div>

                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[3]} 
                            entries={10} 
                            pagesAmount={4}
                            data={setData()} 
                            className='table px-4'
                            container-sm="true"/>
                </div>

                <div className="table-admin">
                        <div className='d-flex align-items-start m-2'>
                            <h1>Returned</h1>
                        </div>

                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={10} 
                            pagesAmount={4}
                            data={setDataReturn()} 
                            className='table px-4'
                            container-sm="true"/>
                </div>
                </div>
                }
                </Col>
            </Row>
        </Fragment>
    );
}

export default UserBorrow;