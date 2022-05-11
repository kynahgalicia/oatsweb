import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../layout/AdminSidebar'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getAdminThesis, deactivateThesis, activateThesis } from '../../../redux/actions/thesisActions';
import moment from 'moment'

import { DEACTIVATE_THESIS_RESET, ACTIVATE_THESIS_RESET } from '../../../redux/constants/thesisConstants'

const ThesisList = () => {
    const { loading, error, thesis } = useSelector(state => state.thesis);
    const{error: deleteError,isDeactivated, isActivated, msg} = useSelector(state=>state.thesisAdmin)
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {

            dispatch(getAdminThesis())
        
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
    
    },[ dispatch, alert, error, history, isDeactivated, isActivated]);

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
    

        if(thesis){ 
            thesis.forEach(thesis => {
            const authorlist = []
            thesis.authors.forEach(name => {
                authorlist.push(name.lname)
            })

            const keylist = []
            thesis.keywords.forEach( tag => {
                keylist.push(tag.keyword)
            })

            console.log(authorlist)
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
                    { thesis.status === "Deactivated" ? 
                    <Button variant="success" data-toggle="modal" data-target={"#activateModal" + thesis._id}> 
                    <i className="fas fa-user-check"></i>
                    </Button>
                    : 
                    <Button className='m-1' variant="secondary" data-toggle="modal" data-target={"#deactivateModal" + thesis._id}> 
                    <i className="fas fa-user-times"></i>
                    </Button>}

                    <Button className="m-1" variant="danger" data-toggle="modal" data-target={'#deleteModal' + thesis._id}>
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
                                <Button  className="btn btn-danger" data-dismiss="modal">Yes</Button>
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
        })

        return data;
    }}
    
    const deactivateHandler = (id) => {
        dispatch(deactivateThesis(id))
    }
    const activateHandler = (id) => {
        dispatch(activateThesis(id))
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
                        <Button variant="success"><Link className='link-admin' to="/admin/thesis/new">+ Add</Link></Button>
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

export default ThesisList;