import React, {Fragment, useState} from 'react';
import {Form} from 'react-bootstrap'
import ISODate from 'isodate'
import DatePicker from 'react-datepicker'

const FilterBar = () => {

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
        <>
        <div className='m-5'>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Show
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                        <div key="default-radio" className="mb-3 text-start">
                            <Form.Check
                                    inline
                                    label="All Results"
                                    name="group1"
                                    type="radio"
                                    id="inline-radio-1"
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

                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Year
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                    <div class="accordion-body text-start">
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
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Department
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div class="accordion-body text-start">
                    { departments && departments.map((department) => (
                        <Link to={department}>{department}</Link>
                    ))}
                    </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Subject
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div class="accordion-body">
                    { departments && departments.map((department) => (
                        <li>{department}</li>
                    ))}
                    </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default FilterBar;