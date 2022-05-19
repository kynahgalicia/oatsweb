import React, { Fragment, useEffect } from 'react'
import {Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getGuests , restoreGuest} from '../../../redux/actions/guestActions';
import AdminSidebar from '../../layout/AdminSidebar'

import { RESTORE_GUEST_RESET } from '../../../redux/constants/guestConstants'
const DeletedGuestList = () => {
    const { loading, error, guests } = useSelector(state => state.guests)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)
    const{error:deleteError,isRestored} = useSelector(state=>state.guest)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {

        if(adminToken){
            dispatch(getGuests(adminToken))
        }

        if (error) {
            alert.error(error);
            // dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
        }

        if (isRestored) {
            history.push('/admin/guests/deleted');
            alert.success('Restored');
            dispatch({ type: RESTORE_GUEST_RESET })
        }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
        if (admin.role === 'Moderator') {
            history.push('/')
            alert.error('Restricted');
        }
    },[ dispatch, alert, error, history, isLoggedInAdmin, admin, adminToken, deleteError, isRestored]);

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
            if(guests.guest_status === 'Deleted'){
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
    
                        <Button className="m-1 danger" variant="danger" data-toggle="modal" data-target={"#restoreModal" + guests._id}>
                        <i class="fas fa-undo"></i>
                        </Button>
    
                        <div className="modal fade" id={"restoreModal" + guests._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Are you sure you want to restore this data?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => restoreGuestHandler(guests._id)}>Yes</Button>
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

    const restoreGuestHandler = (id) => {
        const formData = new FormData();
        formData.set('guest_status', 'Active');
        dispatch(restoreGuest(id,formData,adminToken))
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
                    <div className='d-flex align-items-start m-2 px-5'>
                        <h1>Deleted Guests</h1>
                    </div>
                    {loading ? <LoaderAdmin/>  :  
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

export default DeletedGuestList