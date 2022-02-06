import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'

const DeptList = () => {
    // const [departments, setDepartments] = useState([
    //     {'id': 1 , 'name' :'Basic Arts & Sciences'},
    //     {'id': 2 , 'name' :'Civil & Allied'},
    //     {'id': 3 , 'name' :'Electrical & Allied'},
    //     {'id': 4 , 'name' :'Mechanical & Allied'},
    //     {'id': 5 , 'name' :'Bachelor of Engineering'}
    // ])
    const { loading, error, dept } = useSelector(state => state.dept);

    const setData = () => { 
        const data = {
        columns: [
            {
                label: 'ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Department Name',
                field: 'deptname',
                sort: 'asc'
            },
            {
                label: 'Code',
                field: 'deptcode',
                sort: 'asc'
            },
            {
                label: 'Actions',
                field: 'actions',
            },
        ],
        rows: []
        
    }

    dept.forEach(dept => {
        data.rows.push({
            id: dept.id,
            name: dept.name,
            actions: 
            <Fragment>
                <Button variant="danger">
                    <FaTrash/>
                </Button>
                <Link to="/" className="decor-none block">
                    <Button variant="info">
                    <FaPencilAlt/>
                    </Button>
                </Link>
            </Fragment>
        })
    })

    return data;
}

    return(
        <Fragment>
            <div className="admin-wrapper">
            <h1>Departments</h1>
            <button><Link to="/admin/dept/new">Add Department</Link></button>

            <MDBDataTableV5 
                hover 
                entriesOptions={[5, 10, 15, 25]} 
                entries={10} 
                pagesAmount={4}
                data={setData()} 
                className='table'
                container-sm="true"/>
            </div>
                    
                
        </Fragment>
    )
}

export default DeptList;