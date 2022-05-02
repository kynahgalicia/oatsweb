import React, { Fragment, useEffect } from 'react'
import {useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getGuests , deactivateGuest, deleteGuest} from '../../../redux/actions/guestActions';
import AdminSidebar from '../../layout/AdminSidebar'

import { DEACTIVATE_GUEST_RESET, DELETE_GUEST_RESET } from '../../../redux/constants/guestConstants'
const GuestList = () => {
    const { loading, error, guests } = useSelector(state => state.guests)
    const { isLoggedInAdmin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)
    const{isDeactivated, isDeleted, msg} = useSelector(state=>state.guest)
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const deactivate ="Deactivated"
    const activate = "Active"

    useEffect(() => {

        if(adminToken){
            dispatch(getGuests(adminToken))
        }

        if (error) {
            alert.error(error);
            // dispatch(clearErrors())
        }

        // if (deleteError) {
        //     alert.error(deleteError);
        //     dispatch(clearErrors())
        // }

        if (isDeleted) {
            history.push('/admin/guests');
            alert.success(msg);
            dispatch({ type: DELETE_GUEST_RESET })
        }

        if (isDeactivated) {
            history.push('/admin/guests');
            alert.success('Changed status');
            dispatch({ type: DEACTIVATE_GUEST_RESET })
        }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');

        }
    },[ dispatch, alert, error, history, isLoggedInAdmin,adminToken, isDeactivated, isDeleted, msg]);

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
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },

            ],
            rows: []
        }

        guests.forEach(guests => {
            data.rows.push({
                guest_fname: guests.guest_fname,
                guest_lname: guests.guest_lname,
                guest_contact: guests.guest_contact,
                guest_mail: guests.guest_mail,
                guest_profession: guests.guest_profession,
                guest_company: guests.guest_company,
                guest_company_address: guests.guest_company_address,
                guest_status: guests.guest_status,
                actions: 
                <Fragment>
                    {/* <Link to={`/admin/guests/edit/${guests._id}`} className="decor-none block m-1">
                        <Button variant="primary" data-toggle="tooltip" data-placement="bottom" title="Edit">
                        <i className="fas fa-pencil-alt"></i>
                        </Button>
                    </Link> */}

                    { guests.guest_status === "Deactivated" ? 
                    <Button variant="success" data-toggle="modal" data-target={"#activateModal" + guests._id}> 
                    <i className="fas fa-user-check"></i>
                    </Button>
                    : 
                    <Button className='m-1' variant="secondary" data-toggle="modal" data-target={"#deactivateModal" + guests._id}> 
                    <i className="fas fa-user-times"></i>
                    </Button>}

                    <Button className="m-1" variant="danger" data-toggle="modal" data-target={"#deleteModal" + guests._id}>
                    <i className="fas fa-trash"></i>
                    </Button>

                    <div className="modal fade" id={"deleteModal" + guests._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    Delete Guest Permanently?
                                </div>
                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => deleteGuestHandler(guests._id)}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id={"deactivateModal" + guests._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Deactivate Guest?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => deactivateGuestHandler(guests._id)}>Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    <div className="modal fade" id={"activateModal" + guests._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Activate Guest?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => activateGuestHandler(guests._id)}>Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                </Fragment>
            })
            console.log('test')
        })

        return data;
    }

    const deactivateGuestHandler = (id) => {
        const formData = new FormData();
        formData.set('guest_status', deactivate);
        dispatch(deactivateGuest(id,formData,adminToken))
    }
    const activateGuestHandler = (id) => {
        const formData = new FormData();
        formData.set('guest_status', activate);
        dispatch(deactivateGuest(id,formData,adminToken))
    }

    const deleteGuestHandler = (id) => {
        dispatch(deleteGuest(id,adminToken))
        console.log('deleted' , id)
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
                    {loading ? <LoaderAdmin/>  :  
                    <>
                    <div className='d-flex align-items-start m-2'>
                        <h1>Guests</h1>
                    </div>
                        <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={10} 
                            pagesAmount={4}
                            data={setData()} 
                            className='table px-4'
                            container-sm="true"/>
                    </>
                    }
                
                </div>
                </div>
            </Col>
        </Row>
        </Fragment>
    )

}

export default GuestList