import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../layout/AdminSidebar'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { getThesis } from '../../../redux/actions/thesisActions';
import moment from 'moment'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';

const ThesisList = () => {
    const { loading, error, thesis } = useSelector(state => state.thesis);

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {

        if(!thesis._id){
            dispatch(getThesis())
        }
    
    },[ dispatch, alert, error, history]);

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
                title: thesis.title,
                publishedAt: thesis.publishedAt,
                // authors: authorlist + "",
                // keywords: keylist + "",
                abstract: thesis.abstract.substring(0, 100),
                department: thesis.department.deptname,
                course: thesis.course.coursecode,
                status: thesis.status,
                createdAt: moment(thesis.createdAt).format('MM/DD/YYYY'),
                actions: 
                <Fragment>
                    <Link to={`/admin/course/edit/`} className="decor-none block">
                        <Button variant="info">
                        <FaPencilAlt/>
                        </Button>
                    </Link>

                    <Button variant="danger">
                        <FaTrash/>
                    </Button>
                </Fragment>
            })
        })

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
                <div className="table-admin">
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
                        className='table'
                        container-sm="true"/>
                </div>
                </div>
            </Col>
        </Row>
        </Fragment>
    )
}

export default ThesisList;