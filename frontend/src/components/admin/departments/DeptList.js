import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';


const DeptList = () => {

    const [departments, setDepartments] = useState([
        {'id': 1 , 'name' :'Basic Arts & Sciences'},
        {'id': 2 , 'name' :'Civil & Allied'},
        {'id': 3 , 'name' :'Electrical & Allied'},
        {'id': 4 , 'name' :'Mechanical & Allied'},
        {'id': 5 , 'name' :'Bachelor of Engineering'}
    ])

    const setData = () => { 
        const data = {
        columns: [
            {
                label: 'ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc'
            },
            {
                label: 'Actions',
                field: 'actions',
            },
        ],
        rows: []
        
    }

    departments.forEach(department => {
        data.rows.push({
            id: department.id,
            name: department.name,
            actions: 
            <Fragment>
                <Button variant="danger">
                    <FaTrash/>
                </Button>
                <Link className="decor-none block">
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