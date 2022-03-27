import React, {Fragment, useState,useEffect} from 'react'
import { useHistory,useParams } from 'react-router-dom' 
import {Row, Col, Form, Button} from 'react-bootstrap';
import { useAlert } from 'react-alert'
import AdminSidebar from '../../layout/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux';
import {getDepartment} from '../../../redux/actions/departmentActions'
import { getAdminDetails,updateAdmin, clearErrors} from '../../../redux/actions/adminActions';
import { UPDATE_ADMIN_RESET } from '../../../redux/constants/adminConstants';

const EditAdmin = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const [admin_tupid, setID] = useState('')
    const [admin_fname, setFname] = useState('')
    const [admin_lname, setLname] = useState('')
    const [admin_contact, setContact] = useState('')
    const [thisDepartment, setDepartment] = useState('')

    const{isUpdated,error} =useSelector(state=>state.admin)
    const {admin} =useSelector(state => state.adminDetails)
    const {adminToken} = useSelector(state => state.authAdminToken)
    const {department} = useSelector(state => state.department)

    const {adminId} = useParams()

    useEffect(() => {
        if (isUpdated) {
            history.push('/admin/admins');
            alert.success('Admin updated successfully!');
            dispatch({ type: UPDATE_ADMIN_RESET })
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(( admin && admin._id) !== adminId){
            dispatch(getAdminDetails(adminId,adminToken))
        }else {
            setID(admin.admin_tupid)
            setFname(admin.admin_fname)
            setLname(admin.admin_lname)
            setContact(admin.admin_contact)
        }
        
        dispatch(getDepartment())

        

    }, [dispatch, alert, history, isUpdated, thisDepartment, adminToken, adminId, error])

    const submitHandler = (e) => {

        const formData = new FormData();
        formData.set('admin_tupid', admin_tupid);
        formData.set('admin_fname', admin_fname);
        formData.set('admin_lname', admin_lname);
        formData.set('admin_contact', admin_contact);
        formData.set('departments', thisDepartment);
        dispatch(updateAdmin(admin._id, formData,adminToken))
    }

    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="form-admin-wrapper">
            <h1>Edit Admin</h1>

            <Form className="form-group auth-signup" onSubmit={submitHandler} encType='application/json'>
            {/* {error && showErrMsg(error)} */}

            <h5>Personal Information</h5>
            <Form.Group className="mb-3">
                <Form.Label>TUP ID</Form.Label>
                <Form.Control type="text" placeholder="TUPT_XXXX" value={admin_tupid} onChange={(e) => setID(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="" value={admin_fname} onChange={(e) => setFname(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="" value={admin_lname} onChange={(e) => setLname(e.target.value)}/>
            </Form.Group>
    
            <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="" value={admin_contact} onChange={(e) => setContact(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select id="department_field" placeholder="" value={thisDepartment} onChange={(e) => setDepartment(e.target.value)} >
                <option> -- SELECT DEPARTMENT --</option>
                    { department && department.map((departments) => (
                                
                            <option value={departments._id}>{departments.deptname}</option>
                                
                        ))}
                </Form.Select>
            </Form.Group>

            <Button className="w-100 btn-login" type="submit" id="submitButton">
                continue
            </Button>
            
            </Form> 
            </div>
            </Col>
        </Row>
        </Fragment>
    )
}
export default EditAdmin;