import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../../layout/AdminSidebar'

import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';


const ThesisList = () => {
    // const { loading, error, thesis } = useSelector(state => state.thesis);

    // const setData = () => { 
    //     const data = {
    //         columns: [
    //             {
    //                 label: 'Title',
    //                 field: 'title',
    //                 sort: 'asc'
    //             },
    //             {
    //                 label: 'Code',
    //                 field: 'coursecode',
    //                 sort: 'desc'
    //             },
    //             {
    //                 label: 'Department',
    //                 field: 'department',
    //                 sort: 'desc'
    //             },
    //             {
    //                 label: 'Actions',
    //                 field: 'actions',
    //             },
    //         ],
    //         rows: []
    //     }

    //     theses.forEach(theses => {
    //         data.rows.push({
    //             // id: course._id,
    //             coursename: course.coursename,
    //             coursecode: course.coursecode,
    //             department: course.department.deptname,
    //             actions: 
    //             <Fragment>
    //                 <Link to={`/admin/course/edit/${course._id}`} className="decor-none block">
    //                     <Button variant="info">
    //                     <FaPencilAlt/>
    //                     </Button>
    //                 </Link>

    //                 <Button variant="danger" onClick={() => deleteCourseHandler(course._id)}>
    //                     <FaTrash/>
    //                 </Button>
    //             </Fragment>
    //         })
    //     })

    //     return data;
    // }

    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
            <h1>Thesis</h1>
            </div>
            </Col>
        </Row>
            <div className="admin-wrapper">
                <h1>Thesis</h1>
                <button><Link to="/admin/thesis/new">Add Thesis</Link></button>

                {/* <MDBDataTableV5 
                    hover 
                    entriesOptions={[5, 10, 15, 25]} 
                    entries={10} 
                    pagesAmount={4}
                    data={setData()} 
                    className='table'
                    container-sm="true"/> */}
            </div>
        </Fragment>
    )
}

export default ThesisList;