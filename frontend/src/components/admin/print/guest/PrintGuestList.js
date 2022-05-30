import React, { Fragment, useEffect, useRef } from 'react'
import {Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../../components/utils/LoaderAdmin'
import { getGuests } from '../../../../redux/actions/guestActions';
import AdminSidebar from '../../../layout/AdminSidebar'
import ReactToPrint from "react-to-print";
require('../../dashboard/print.css');

const PrintGuestList = () => {
    const { loading, error, guests } = useSelector(state => state.guests)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();

    useEffect(() => {

        if(adminToken){
            dispatch(getGuests(adminToken))
        }

        if (error) {
            alert.error(error);
            // dispatch(clearErrors())
        }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

        if (admin.role === 'Moderator') {
            history.push('/')
            alert.error('Restricted')
        }
    },[ dispatch, alert, error, history, isLoggedInAdmin,adminToken,admin]);

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'First Name',
                    field: 'guest_fname',
                    sort: 'desc'
                },
                {
                    label: 'Last Name',
                    field: 'guest_lname',
                    sort: 'desc'
                },
                {
                    label: 'Contact',
                    field: 'guest_contact',
                },
                {
                    label: 'Email',
                    field: 'guest_mail',
                },
                {
                    label: 'Profession',
                    field: 'guest_profession',
                },
                {
                    label: 'Company',
                    field: 'guest_company',
                },
                {
                    label: 'Company Address',
                    field: 'guest_company_address',
                },
                {
                    label: 'Status',
                    field: 'guest_status',
                }

            ],
            rows: []
        }

        guests && guests.forEach(guests => {
            if(guests.guest_status !== 'Deleted'){
                data.rows.push({
                    guest_fname: guests.guest_fname,
                    guest_lname: guests.guest_lname,
                    guest_contact: guests.guest_contact,
                    guest_mail: guests.guest_mail,
                    guest_profession: guests.guest_profession,
                    guest_company: guests.guest_company,
                    guest_company_address: guests.guest_company_address,
                    guest_status: <div className="active">{guests.guest_status}</div>,
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
                    <h1 className='print'>Guests</h1>
                </div >
                    {loading ? <LoaderAdmin/>  :  
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

export default PrintGuestList