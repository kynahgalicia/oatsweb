import React, { Fragment, useEffect, useState, useRef} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import moment from 'moment'
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import LoaderAdmin from '../../../utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { getBorrow, clearErrors} from '../../../../redux/actions/borrowActions';
import AdminSidebar from '../../../layout/AdminSidebar'
import ReactToPrint from "react-to-print";
require('../../dashboard/print.css');
const PrintOverdueBorrowList = () => {
    const { loading, error, borrow } = useSelector(state => state.borrows)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    // const {adminToken} = useSelector(state => state.authAdminToken)

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

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
    }, [dispatch, alert, error, history,isLoggedInAdmin, admin])

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
                }
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
                    <h1 className='print'>Overdue Books</h1>
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

export default PrintOverdueBorrowList;