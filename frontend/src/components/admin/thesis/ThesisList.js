import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';

import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { getThesis, deleteThesis, clearErrors} from '../../../redux/actions/thesisActions'
import { DELETE_THESIS_RESET } from '../../../redux/constants/thesisConstants'

import AdminSidebar from '../../layout/AdminSidebar'

const ThesisList = () => {
    // const { loading, error, thesis } = useSelector(state => state.thesis)
    // const {  error: deleteError, isDeleted } = useSelector(state => state.course)
    const history = useHistory();
    const alert = useAlert();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getThesis())

        // if (error) {
        //     alert.error(error);
        //     dispatch(clearErrors())
        // }

        // if (deleteError) {
        //     alert.error(deleteError);
        //     dispatch(clearErrors())
        // }

    },[dispatch])

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Authors',
                    field: 'authors',
                    sort: 'asc'
                },
                {
                    label: 'Year',
                    field: 'publishedAt',
                    sort: 'desc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'desc'
                },
                {
                    label: 'Course',
                    field: 'course',
                    sort: 'desc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        // thesis.forEach(thesis => {
        //     data.rows.push({
        //         title: thesis.title,
        //         // authors: thesis.authors.fname + thesis.authors.lname,
        //         publishedAt: thesis.publishedAt,
        //         department: thesis.department.deptname,
        //         course: thesis.course.coursename,
        //         actions:
        //         <Fragment>
        //             <Link to={`/admin/thesis/edit/${thesis._id}`} className="decor-none block">
        //                 <Button variant="info">
        //                 <FaPencilAlt/>
        //                 </Button>
        //             </Link>

        //             <Button variant="danger" onClick={() => deleteThesisHandler(thesis._id)}>
        //                 <FaTrash/>
        //             </Button>
        //         </Fragment>
        //     })
        // })
    }

    const deleteThesisHandler = (id) => {
        // dispatch(deleteThesis(id))
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
                            {/* {loading ? <LoaderAdmin/>  :   */}
                                <>
                                    <div className='d-flex align-items-start m-2'>
                                        <h1>Thesis</h1>
                                    </div>

                                    <div className='d-flex align-items-start mx-5 mt-3'>
                                        <Button variant="success"><Link to="/admin/thesis/new">+ Add</Link></Button>
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
                            {/* } */}
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default ThesisList;