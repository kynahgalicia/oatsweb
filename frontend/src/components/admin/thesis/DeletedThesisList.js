import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../layout/AdminSidebar'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getAdminThesis, restoreThesis } from '../../../redux/actions/thesisActions';
import moment from 'moment'

import { RESTORE_THESIS_RESET} from '../../../redux/constants/thesisConstants'

const DeletedThesisList = () => {
    const { loading, error: thesisError, thesis } = useSelector(state => state.thesis);
    const{error:restoreError, isRestored} = useSelector(state=>state.thesisAdmin)
    const { isLoggedInAdmin,admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [thisDepartment, setThisDepartment] = useState('')
    useEffect(() => {

            dispatch(getAdminThesis())
        
            if(admin){
                setThisDepartment(admin.admin_department.deptname)
            }
            
            if (restoreError) {
                alert.error(restoreError)
            }

            if (isRestored) {
                history.push('/admin/thesis/deleted');
                alert.success('Restored');
                dispatch({ type: RESTORE_THESIS_RESET })
            }

            if (!isLoggedInAdmin) {
                history.push('/admin/login');
            }
            
    
    },[ dispatch, alert, restoreError, history, isLoggedInAdmin,admin,adminToken,isRestored, thisDepartment]);

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
    
        {admin.role === 'Moderator' ? 
        <>  
        {
            thesis && thesis.forEach(thesis => {
                if(thesis.department.deptname === thisDepartment && thesis.status === 'Deleted'){
                    data.rows.push({
                    title: <Link className='table-list' to={`/thesis/${thesis._id}`}> {thesis.title}</Link>,
                    publishedAt: thesis.publishedAt,
                    // authors: authorlist + "",
                    // keywords: keylist + "",
                    abstract: thesis.abstract.substring(0, 100),
                    department: thesis.department.deptname,
                    course: thesis.course.coursecode,
                    createdAt: moment(thesis.createdAt).format('MM/DD/YYYY'),
                    status: thesis.status,
                    actions: 
                    <Fragment>
                        <Button className="m-1" variant="danger" data-toggle="modal" data-target={'#restoreModal' + thesis._id}>
                    <i class="fas fa-undo"></i>
                    </Button>

                    <div className="modal fade" id={"restoreModal" + thesis._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                            Are you sure you want to restore this data?
                            </div>
                            <div className="modal-footer">
                                <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => restoreHandler(thesis._id)}>Yes</Button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </Fragment>
                })
                }
            })
        }
        </> :
        
        <>  

        {thesis && thesis.forEach(thesis => {
            if(thesis.status === 'Deleted'){
            data.rows.push({
                title: <Link className='table-list' to={`/thesis/${thesis._id}`}> {thesis.title}</Link>,
                publishedAt: thesis.publishedAt,
                // authors: authorlist + "",
                // keywords: keylist + "",
                abstract: thesis.abstract.substring(0, 100),
                department: thesis.department.deptname,
                course: thesis.course.coursecode,
                createdAt: moment(thesis.createdAt).format('MM/DD/YYYY'),
                status: thesis.status,
                actions: 
                <Fragment>
                    <Button className="m-1" variant="danger" data-toggle="modal" data-target={'#restoreModal' + thesis._id}>
                    <i class="fas fa-undo"></i>
                    </Button>

                    <div className="modal fade" id={"restoreModal" + thesis._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                            Are you sure you want to restore this data?
                            </div>
                            <div className="modal-footer">
                                <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => restoreHandler(thesis._id)}>Yes</Button>
                            </div>
                            </div>
                        </div>
                        </div>
                </Fragment>
            })
        }
        })}
        </>

        }

        

        return data;
}
    
    const restoreHandler = (id) => {
        const formData = new FormData();
        formData.set('status', 'Active');
        dispatch(restoreThesis(id,formData,adminToken))
    }

    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
                <div className='back-button text-start px-5 py-2'>
                        <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                        </div>
                <div className="table-admin">
                    <div className='d-flex align-items-start m-2'>
                        <h1>Deleted Thesis</h1>
                    </div>
                

                { loading ? <LoaderAdmin /> :
                <>
                    <MDBDataTableV5 
                        hover 
                        entriesOptions={[5, 10, 15, 25]} 
                        entries={10} 
                        pagesAmount={4}
                        data={setData()} 
                        className='table'
                        container-sm="true"
                        searchTop
                        searchBottom={false}/>
                </>
                }
                </div>
                </div>
            </Col>
        </Row>
        </Fragment>
    )
}

export default DeletedThesisList;