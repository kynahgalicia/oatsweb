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
    const {user} = useSelector(state => state.authUser)

    useEffect(() => {

            const formData = new FormData();
            formData.set("user", user.user_tupid)

            dispatch(getStudentBorrow(formData))
    }, [dispatch, alert, error])

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
            // if(borrow.dateReturned === null){
                data.rows.push({
                    thesis: borrow.thesis.title,
                    dateBorrowed: ( borrow.dateBorrowed === null ? "Pending" : moment(borrow.dateBorrowed).format('MM/DD/YYYY')),
                    dueDate: ( borrow.dateBorrowed === null ? "Pending" :  moment(borrow.dueDate).format('MM/DD/YYYY')),
                    status: borrow.status
                    
                })
            // }
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
                <div className="table-admin">
                        <div className='d-flex align-items-start m-2'>
                            <h1>Borrow</h1>
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
                        
    }
                </Col>
            </Row>
        </Fragment>
    );
}

export default UserBorrow;