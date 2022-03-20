import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams,useHistory} from 'react-router-dom'

import { Row, Col} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
// import ISODate from 'isodate'
// import DatePicker from 'react-datepicker'
import { useAlert } from 'react-alert'
import SearchResults from './SearchResults'

import Loader from '../../utils/Loader'
// Redux Action
import {getThesis} from '../../../redux/actions/thesisActions'
import {getDepartment} from '../../../redux/actions/departmentActions'

const Search = () => {
    // Test Data for User
    let userDept = null 
    // let userDept = 'Basic Arts and Science' 

    const history = useHistory()
    const [thisKeyword, setKeyword] = useState('');
    // const [currentPage, setCurrentPage] = useState(1)
    const [thisDepartment, setDepartment] = useState('')
    const [startDate, setStartDate] = useState(1999);
    const [endDate, setEndDate] = useState(2023);

    const alert = useAlert();
    const dispatch = useDispatch();


    const { loading, thesis, error} = useSelector(state => state.thesis)
    const { department} = useSelector(state => state.department)

    const {keyword} = useParams()

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        
    
        dispatch(getThesis(keyword, thisDepartment, startDate, endDate));
        dispatch(getDepartment())
    }, [dispatch, alert, error, keyword,userDept, thisDepartment,startDate,endDate])

    // function setCurrentPageNo(pageNumber) {
    //     setCurrentPage(pageNumber)
    // }

    // let count = thesisCount;
    // if (keyword) {
    //     count = filteredthesisCount
    // }


    const searchHandler = (e) => {
        if(thisKeyword){
            console.log('no key')
        }
        e.preventDefault()
        if (thisKeyword) {
                    history.replace(`/search/${thisKeyword}`)

        } else {
            history.push('/')
        }
    }

    
    return ( 
        <div className="wrapper">
            <Fragment>
                <Row className="searchbar-result">
                    <Col sm={3}></Col>
                    <Col sm={6}>
                    <div className="">
                    <form onSubmit={searchHandler}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="search_field"
                                    className="form-control "
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button id="search_btn" className="btn">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            <Row>

                <Col sm={3} border="dark">
                <div className='p-3'>
                    <div className="user-accordion accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Show
                            </button>
                        </h2>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                        <div key="default-radio" className="mb-3 text-start">
                            <Form.Check
                                    inline
                                    label="All Results"
                                    name="group1"
                                    type="radio"
                                    id="inline-radio-1"
                                    checked
                                    onClick={() => setDepartment('')}
                            />

        {
            userDept ? <Form.Check
            inline
            label="Open Access Only"
            name="group1"
            type="radio"
            id="inline-radio-2"
            onClick={() => setDepartment(userDept)}
            />
            : null
        }
                            
                        </div>
                        </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Year
                            </button>
                        </h2>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="card-body">
                        <label> Start Date:</label>
                                <input
                                    type="number"
                                    id="coursename_field"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                        <label> End Date:</label>
                                <input
                                    type="number"
                                    id="coursename_field"
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                {/* <DatePicker
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
                                /> */}
                        </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Department
                            </button>
                        </h2>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div className="card-body">
                        <ul className="list-group text-start">

                            
                            { department && department.map((departments) => (
                                
                                <li
                                    className="list-group-item"
                                    key={departments._id}
                                    onClick={() => setDepartment(departments.deptname)}
                                >
                                    {departments.deptname}
                                </li>
                                
                            ))}
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
        

            </div>
                </Col>
                <Col sm={7} className='text-start'>
                {loading ? <Loader /> : (
                    keyword ? (
                    <SearchResults userDept={userDept} thesis={thesis}></SearchResults>
                    ): null
                )}
                </Col>
                <Col sm={2}>
                    
                </Col>
            </Row>
        </Fragment>
            
        </div>
        
        );
}

export default Search;