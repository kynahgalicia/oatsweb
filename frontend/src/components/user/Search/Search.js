import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams,useHistory} from 'react-router-dom'

import { Row, Col} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import ISODate from 'isodate'
import DatePicker from 'react-datepicker'
import { useAlert } from 'react-alert'
import SearchResults from './SearchResults'

import Loader from '../../layout/Loader'
// Redux Action
import {getThesis} from '../../../redux/actions/thesisActions'
import {getDepartment} from '../../../redux/actions/departmentActions1'

const Search = () => {
    let userDept = 'Civil and Allied' // Test Data for User

    const history = useHistory()
    const [thisKeyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [thisDepartment, setDepartment] = useState('')
    const [startDate, setStartDate] = useState(ISODate(new Date("1999/12/31").toISOString()));
    const [endDate, setEndDate] = useState(ISODate(new Date("2023/01/02").toISOString()));

    const alert = useAlert();
    const dispatch = useDispatch();


    const { loading, thesis, error} = useSelector(state => state.thesis)
    const { department} = useSelector(state => state.department)

    const {keyword} = useParams()

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        
        

        dispatch(getThesis(keyword, thisDepartment, startDate.toISOString(), endDate.toISOString()));
        dispatch(getDepartment())
    }, [dispatch, alert, error, keyword, currentPage,userDept, thisDepartment,startDate,endDate])

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
                    history.replace(`/user/search/${thisKeyword}`)

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
                    <div class="user-accordion accordion" id="accordionExample">
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
                                    onClick={() => setDepartment('')}
                            />

                            <Form.Check
                                inline
                                label="Open Access Only"
                                name="group1"
                                type="radio"
                                id="inline-radio-2"
                                onClick={() => setDepartment(userDept)}
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

                            
                            { department && department.map((departments) => (
                                
                                <li
                                    class="list-group-item"
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
                    {keyword ? (
                    <Fragment>
                        { thesis && thesis.map((theses) => (
                        <div className='thesis-result'>
                            <h5> <Link to="/user/search/details"> {theses.title}</Link> </h5>
                            <Link to="/"> <p><i> {theses.author} </i></p></Link>

                            <div>
                                <label> Year: <Link to="/">{theses.year}</Link> | Department: <Link to="/">{theses.department}</Link> | Course: <Link to="/">{theses.course}</Link></label>
                            </div>
                        </div>
                        
                    ))}
                    </Fragment>
                    ): null}
                
                
                </Col>
                <Col sm={2}>
                    
                </Col>
            </Row>
        </Fragment>
            
        </div>
        
        );
}

export default Search;