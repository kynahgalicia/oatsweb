import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../../layout/AdminSidebar'
import LoaderAdmin from '../../../../components/utils/LoaderAdmin'
import { getAdminThesis} from '../../../../redux/actions/thesisActions';
import moment from 'moment'
import ReactToPrint from "react-to-print";
require('../../dashboard/print.css');

const PrintThesisList = () => {
    const { loading, error: thesisError, thesis } = useSelector(state => state.thesis);
    const { isLoggedInAdmin,admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    let componentRef = useRef();

    const [thisDepartment, setThisDepartment] = useState('')
    useEffect(() => {

            dispatch(getAdminThesis())
        
            if(admin.role === 'Moderator'){
                setThisDepartment(admin.admin_department.deptname)
            }
            

            if (!isLoggedInAdmin) {
                history.push('/admin/login');
            }
    
    },[ dispatch, alert, history, isLoggedInAdmin,admin,adminToken,thisDepartment]);

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
                    label: 'Created At',
                    field: 'createdAt',
                }
            ],
            rows: []
        }
    
        {admin.role === 'Moderator' ? 
        <>  
        {
            thesis && thesis.forEach(thesis => {
                if(thesis.department.deptname === thisDepartment && thesis.status != 'Deleted'){
                
    
                data.rows.push({
                    title: <Link className='table-list' to={`/thesis/${thesis._id}`}> {thesis.title}</Link>,
                    publishedAt: thesis.publishedAt,
                    // authors: authorlist + "",
                    // keywords: keylist + "",
                    abstract: thesis.abstract.substring(0, 100),
                    department: thesis.department.deptname,
                    course: thesis.course.coursecode,
                    createdAt: moment(thesis.createdAt).format('MM/DD/YYYY'),
                    status: <div className={thesis.status === 'Active'? "active" : "denied"}>{thesis.status}</div>,
                
                })
                }
            })
        }
        </> :
        
        <>  

        {thesis && thesis.forEach(thesis => {

            if(thesis.status != 'Deleted'){
            data.rows.push({
                title: <Link className='table-list' to={`/thesis/${thesis._id}`}> {thesis.title}</Link>,
                publishedAt: thesis.publishedAt,
                // authors: authorlist + "",
                // keywords: keylist + "",
                abstract: thesis.abstract.substring(0, 100),
                department: thesis.department.deptname,
                course: thesis.course.coursecode,
                createdAt: moment(thesis.createdAt).format('MM/DD/YYYY'),
                status: <div className={thesis.status === 'Active'? "active" : "denied"}>{thesis.status}</div>,
            })
        }
        })}
        </>

        }

        

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
                    <h1 className='print'>Thesis</h1>
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
                        searchBottom={false}/>
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

export default PrintThesisList;