import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../utils/Loader'
import { getStudentThesis } from '../../../../redux/actions/thesisActions';
import moment from 'moment'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import UserSidebar from '../../../layout/UserSidebar'

const UserThesisList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const {user, isLoggedIn} = useSelector(state => state.authUser)
    const { loading, error, theses} = useSelector(state => state.studentThesis);


    const [thisId, setThisId] = useState('')

    useEffect(() => {
        
        if(isLoggedIn){
            setThisId(user._id)
        }
        
        if(thisId){
            dispatch(getStudentThesis(thisId))
        }

        console.log(thisId)
        
    },[dispatch, alert,error, history, thisId, isLoggedIn]);

    const setData = () => { 
        
        const data = {
            columns: [
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Published',
                    field: 'publishedAt',
                    sort: 'desc'
                },
                // {
                //     label: 'Authors',
                //     field: 'authors'
                // },
                // {
                //     label: 'Keywords',
                //     field: 'keywords'
                // },
                {
                    label: 'Abstract',
                    field: 'abstract'
                },
                {
                    label: 'Department',
                    field: 'department'
                },
                {
                    label: 'Course',
                    field: 'course'
                },
                {
                    label: 'Status',
                    field: 'status'
                },
                {
                    label: 'Created At',
                    field: 'createdAt',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }
    
            theses.length && theses.forEach(theses => {
                data.rows.push({
                    title: theses.title,
                    publishedAt: theses.publishedAt,
                    abstract: theses.abstract.substring(0, 100),
                    department: theses.department.deptname,
                    course: theses.course.coursecode,
                    status: theses.status,
                    createdAt: moment(theses.createdAt).format('MM/DD/YYYY'),
                    actions: 
                    <Fragment>
                        {/* <Link to={`/admin/course/edit/`} className="decor-none block">
                            <Button variant="info">
                            <FaPencilAlt/>
                            </Button>
                        </Link>
    
                        <Button variant="danger">
                            <FaTrash/>
                        </Button> */}
                    </Fragment>
                })
            })
        

        return data;
    }

    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
            <UserSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
                <div className="table-admin">

                { loading? <Loader /> :
                <>
                <div className='d-flex align-items-start m-2'>
                        <h1>Thesis</h1>
                    </div>
                    <div className='d-flex align-items-start mx-5 mt-3'>
                        <Button variant="success"><Link to="/user/thesis/new">+ Add</Link></Button>
                    </div>

                    <MDBDataTableV5 
                    hover 
                    entriesOptions={[5, 10, 15, 25]} 
                    entries={10} 
                    pagesAmount={4}
                    data={setData()} 
                    className='table'
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

export default UserThesisList;