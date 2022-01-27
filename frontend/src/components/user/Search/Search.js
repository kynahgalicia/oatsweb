import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import { Row, Col} from 'react-bootstrap'
import {Form, FormControl,Button} from 'react-bootstrap'
import ISODate from 'isodate'
import DatePicker from 'react-datepicker'

const Search = () => {
    const [thesis, setThesis] = useState([
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 1', id: 1 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 2', id: 2 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 3', id: 3 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 4', id: 4 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 5', id: 5 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 6', id: 6 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 7', id: 7 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'}
    ])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const departments = [ 
                        'Basic Arts & Science',
                        'Civil & Allied', 
                        'Electrical & Allied', 
                        'Mechanical & Allied', 
                        'Bachelor of Engineering'
                    ]
    return ( 
        <div className="wrapper">
            <Fragment>
                <Row className="searchbar-result">
                    <Col sm={3}></Col>
                    <Col sm={6}>
                    
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button><FaSearch/></Button>
                        </Form>

                    </Col>
                    <Col sm={3}></Col>
                </Row>
            <Row>

                <Col sm={3} border="dark">
                <div className='p-3'>
                    <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Show
                            </button>
                        </h2>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                        <div key="default-radio" className="mb-3 text-start">
                            <Form.Check
                                    inline
                                    label="All Results"
                                    name="group1"
                                    type="radio"
                                    id="inline-radio-1"
                                    checked
                                />
                                <Form.Check
                                    inline
                                    label="Open Access Only"
                                    name="group1"
                                    type="radio"
                                    id="inline-radio-2"
                                />
                        </div>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Year
                            </button>
                        </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body year">
                        <label> Start Date:</label>
                                <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(ISODate(new Date(date).toISOString()))}
                                selectsStart
                                startDate={new Date(startDate)}
                                endDate={new Date(endDate)}
                                />
                                <label> End Date:</label>
                                <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(ISODate(new Date(date).toISOString()))}
                                selectsEnd
                                startDate={startDate}
                                endDate={new Date(endDate)}
                                minDate={new Date(startDate)}
                                />
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Department
                            </button>
                        </h2>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                        <ul class="list-group text-start">
                            { departments && departments.map((department) => (
                                
                                <li class="list-group-item"><Link>{department}</Link></li>
                                
                            ))}
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
        

            </div>
                </Col>
                <Col sm={7} className='text-start'>
                    
                { thesis && thesis.map((theses) => (
                        <div className='thesis-result'>
                            <h5> <Link to="/user/search/details"> {theses.title}</Link> </h5>
                            <Link> <p><i> {theses.author} </i></p></Link>

                            <div>
                                <label> Year: <Link>{theses.year}</Link> | Department: <Link>{theses.department}</Link> | Course: <Link>{theses.course}</Link></label>
                            </div>
                        </div>
                        
                    ))}
                
                </Col>
                <Col sm={2}>
                    
                </Col>
            </Row>
        </Fragment>
            
        </div>
        
        );
}

export default Search;