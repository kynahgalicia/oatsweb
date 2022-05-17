import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../layout/AdminSidebar'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getAdminThesis, deactivateThesis, activateThesis, deleteThesis } from '../../../redux/actions/thesisActions';
import moment from 'moment'

import { DEACTIVATE_THESIS_RESET, ACTIVATE_THESIS_RESET, DELETE_THESIS_RESET} from '../../../redux/constants/thesisConstants'

const ThesisList = () => {
    const { loading, error: thesisError, thesis } = useSelector(state => state.thesis);
    const{error: deleteError,isDeactivated, isActivated, isDeleted, msg} = useSelector(state=>state.thesisAdmin)
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
            
            if (deleteError) {
                alert.error(deleteError)
            }

            if (isDeleted) {
                history.push('/admin/thesis');
                alert.success('Deleted');
                dispatch({ type: DELETE_THESIS_RESET })
            }
            if (isDeactivated) {
                history.push('/admin/thesis');
                alert.success('Deactivated');
                dispatch({ type: DEACTIVATE_THESIS_RESET })
            }
    
            if (isActivated) {
                history.push('/admin/thesis');
                alert.success('Activated');
                dispatch({ type: ACTIVATE_THESIS_RESET })
            }
    
    },[ dispatch, alert, deleteError, history, isDeactivated, isActivated, isLoggedInAdmin,admin,adminToken,isDeleted, thisDepartment]);

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
                },
                {
                    label: 'Status',
                    field: 'status'
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
                    actions: 
                    <Fragment>
                        { thesis.status === "Deactivated" ? 
                        <Button variant="success" data-toggle="modal" data-target={"#activateModal" + thesis._id}> 
                        <i className="fas fa-user-check"></i>
                        </Button>
                        : 
                        <Button className='m-1' variant="secondary" data-toggle="modal" data-target={"#deactivateModal" + thesis._id}> 
                        <i className="fas fa-user-times"></i>
                        </Button>}
    
                        <Button className="m-1 danger" variant="danger" data-toggle="modal" data-target={'#deleteModal' + thesis._id}>
                        <i className="fas fa-trash"></i>
                        </Button>
    
                        <div className="modal fade" id={'deleteModal' +  thesis._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Delete Thesis?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => deleteHandler(thesis._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="modal fade" id={"deactivateModal" + thesis._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Deactivate Thesis?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => deactivateHandler(thesis._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                            </div>
                        <div className="modal fade" id={"activateModal" + thesis._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Activate Thesis?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => activateHandler(thesis._id)}>Yes</Button>
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
                actions: 
                <Fragment>
                    { thesis.status === "Deactivated" ? 
                    <Button variant="success" data-toggle="modal" data-target={"#activateModal" + thesis._id}> 
                    <i className="fas fa-user-check"></i>
                    </Button>
                    : 
                    <Button className='m-1' variant="secondary" data-toggle="modal" data-target={"#deactivateModal" + thesis._id}> 
                    <i className="fas fa-user-times"></i>
                    </Button>}

                    <Button className="m-1 danger" variant="danger" data-toggle="modal" data-target={'#deleteModal' + thesis._id}>
                    <i className="fas fa-trash"></i>
                    </Button>

                    <div className="modal fade" id={'deleteModal' +  thesis._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Delete Thesis?
                            </div>
                            <div className="modal-footer">
                                <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => deleteHandler(thesis._id)}>Yes</Button>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id={"deactivateModal" + thesis._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Deactivate Thesis?
                            </div>
                            <div className="modal-footer">
                                <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => deactivateHandler(thesis._id)}>Yes</Button>
                            </div>
                            </div>
                        </div>
                        </div>
                    <div className="modal fade" id={"activateModal" + thesis._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-body">
                                Activate Thesis?
                            </div>
                            <div className="modal-footer">
                                <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => activateHandler(thesis._id)}>Yes</Button>
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
    
    const deactivateHandler = (id) => {
        const formData = new FormData();
        formData.set('status', 'Deactivated');
        dispatch(deactivateThesis(id,formData,adminToken))
    }
    const activateHandler = (id) => {
        const formData = new FormData();
        formData.set('status', 'Active');
        dispatch(activateThesis(id, formData, adminToken))
    }
    const deleteHandler = (id) => {
        const formData = new FormData();
        formData.set('status', 'Deleted');
        dispatch(deleteThesis(id, formData, adminToken))
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
                    <div className='d-flex align-items-start m-2'>
                        <h1>Thesis</h1>
                    </div>
                

                { loading ? <LoaderAdmin /> :
                <>
                    <div className='d-flex align-items-start mx-5 mt-3'>
                        <Button variant="success" className="success mx-1"><Link className='link-admin' to="/admin/thesis/new">+ Add</Link></Button>
                        <Button variant="danger" className="danger"><Link className='link-admin' to="/admin/thesis/deleted"><i class="fas fa-trash"></i> Trash Bin</Link></Button>
                    </div>
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

export default ThesisList;