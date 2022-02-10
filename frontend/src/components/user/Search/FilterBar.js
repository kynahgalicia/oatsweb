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
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Show
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div className="accordion-body">
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

                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Year
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                    <div className="accordion-body text-start">
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

                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Department
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div className="accordion-body text-start">
                    { departments && departments.map((department) => (
                        <Link to={department}>{department}</Link>
                    ))}
                    </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Subject
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div className="accordion-body">
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