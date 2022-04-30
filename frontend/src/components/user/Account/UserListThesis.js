import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../utils/Loader'
import { getStudentThesis } from '../../../redux/actions/thesisActions';
import moment from 'moment'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import UserSidebar from '../../layout/UserSidebar'

const UserListThesis = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const {user, isLoggedIn} = useSelector(state => state.authUser)
    const { loading, error, theses } = useSelector(state => state.studentThesis);


    const [thisId, setThisId] = useState('624560d8bf54d59b5a4f916e')

    useEffect(() => {
        
        (getStudentThesis(thisId))

        console.log(thisId)
        
    },[dispatch, alert, error, history, thisId, isLoggedIn, loading]);
    
    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
            <UserSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
                <div className="table-admin">
                    <div className='d-flex align-items-start m-2'>
                        <h1>Thesis</h1>
                    </div>
                    <div className='d-flex align-items-start mx-5 mt-3'>
                        <Button variant="success"><Link to="/admin/thesis/new">+ Add</Link></Button>
                    </div>

                {/* { loading? <Loader /> : null

                } */}
                    {/* <MDBDataTableV5 
                        hover 
                        entriesOptions={[5, 10, 15, 25]} 
                        entries={10} 
                        pagesAmount={4}
                        data={setData()} 
                        className='table'
                        container-sm="true"/> */}
                </div>
                </div>
            </Col>
        </Row>
        </Fragment>
    )
}
export default UserListThesis;