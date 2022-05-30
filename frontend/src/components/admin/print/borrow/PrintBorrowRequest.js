import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import LoaderAdmin from '../../../utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { getBorrow, clearErrors} from '../../../../redux/actions/borrowActions';
import AdminSidebar from '../../../layout/AdminSidebar'
import ReactToPrint from "react-to-print";
require('../../dashboard/print.css');

const PrintBorrowRequest = () => {
    const { loading, error, borrow } = useSelector(state => state.borrows)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();

    const [thisDepartment, setThisDepartment] = useState('')

    useEffect(() => {

        dispatch(getBorrow())

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

        
        
    }, [dispatch, alert, error, history, isLoggedInAdmin, admin])

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'Thesis',
                    field: 'thesis',
                    sort: 'desc'
                },
                {
                    label: 'TUPT ID',
                    field: 'user_tupid',
                    sort: 'desc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'desc'
                },
                {
                    label: 'Borrower',
                    field: 'user',
                    sort: 'desc'
                }
            ],
            rows: []
        }

        {
            admin.role ===  'Moderator' ?

            <> 
            {borrow && borrow.forEach(borrow => {
                if(borrow.status === 'Pending' && borrow.thesis.department === thisDepartment){
                    data.rows.push({
                        thesis: borrow.thesis.title,
                        user_tupid: borrow.user.tupid,
                        department:  borrow.thesis.department ,
                        user: borrow.user.fname + " " + borrow.user.lname,
                    
                    })
                }
            })}

            </> : <> 
            {borrow && borrow.forEach(borrow => {
            if(borrow.status === 'Pending'){
                data.rows.push({
                    thesis: borrow.thesis.title,
                    user_tupid: borrow.user.tupid,
                    department:  borrow.thesis.department ,
                    user: borrow.user.fname + " " + borrow.user.lname,
                    
                })
            }
            })}
            </>

        }

        return data;
    }
    const setDataDenied = () => { 
        const data = {
            columns: [
                {
                    label: 'Thesis',
                    field: 'thesis',
                    sort: 'desc'
                },
                {
                    label: 'TUPT ID',
                    field: 'user_tupid',
                    sort: 'desc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'desc'
                },
                {
                    label: 'Borrower',
                    field: 'user',
                    sort: 'desc'
                }
            ],
            rows: []
        }

        borrow && borrow.forEach(borrow => {
            if(borrow.status === 'Denied'){
                data.rows.push({
                    thesis: borrow.thesis.title,
                    user_tupid: borrow.user.tupid,
                    department:  borrow.thesis.department ,
                    user: borrow.user.fname + " " + borrow.user.lname,
                
                    
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
                            <h1 className='print'>Borrow Request</h1>
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
                                    <div className='d-flex align-items-start mx-5'>
                                    <h3>Requests</h3>
                                    </div>
        
                                    <MDBDataTableV5 
                                    hover 
                                    entriesOptions={[5, 10, 15, 25]} 
                                    entries={5} 
                                    pagesAmount={4}
                                    data={setData()} 
                                    className='table px-5'
                                    container-sm="true"/>
                                    
                                    <div className='d-flex align-items-start mx-5'>
                                    <h3>Denied</h3>
                                    </div>
        
                                    <MDBDataTableV5 
                                    hover 
                                    entriesOptions={[5, 10, 15, 25]} 
                                    entries={5} 
                                    pagesAmount={4}
                                    data={setDataDenied()} 
                                    className='table px-5'
                                    container-sm="true"/>
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

export default PrintBorrowRequest;