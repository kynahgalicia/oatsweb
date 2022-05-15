import React, { Fragment, useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom' 
import {Row, Col, Button, Form} from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux'
import profile from '../../img/profile.png'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import AdminSidebar from '../../layout/AdminSidebar'
import BarGraph from './analytics/BarGraph'
import PieChart from './analytics/PieChart'
import TimeSeries from './analytics/TimeSeries'
import {fetchLog} from '../../../redux/actions/loggingActions'
import {fetchDataCount} from '../../../redux/actions/loggingActions'
// require('./dashboard.css');


const AdminDashboard = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [thisDepartment, setThisDepartment] = useState('')
    const { loading,isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {dataCount} = useSelector(state => state.dataCount)
    const { viewsLog, searchLog, downloadLog, subscription, thesisDept, borrowTop ,
            beng ,civil, basd,mech,elec,bengB ,civilB, basdB,mechB,elecB,
            bengD ,civilD, basdD,mechD,elecD,
            subspday,subspdayX, borrowspday, returnedpday,overduepday} = useSelector(state => state.logs)

    const[thesisCount,setThisThesis] = useState('')
    const[userCount,setThisUser] = useState('')
    const[adminCount,setThisAdmin] = useState('')
    const[guestCount,setThisGuest] = useState('')
    const[subCountP,setThisSubP] = useState('')
    const[subCountEx,setThisSubEx] = useState('')
    const[subCountAct,setThisSubAct] = useState('')
    const[subCount,setThisSub] = useState('')
    const[borrowCount,setThisBorrow] = useState('')
    const[borrowCountP,setThisBorrowP] = useState('')
    const[borrowCountR,setThisBorrowR] = useState('')
    const[borrowCountOD,setThisBorrowOD] = useState('')

    const[timeSeries,setTimeSeries] = useState('day')
    const[timeSeriesX,setTimeSeriesX] = useState('day')
    const[timeSeriesBorrow,setTimeSeriesBorrow] = useState('day')
    const[timeSeriesReturned,setTimeSeriesReturned] = useState('day')
    const[timeSeriesOverdue,setTimeSeriesOverdue] = useState('day')

    useEffect(() => {
        if(admin){
            setThisDepartment(admin.admin_department.deptname)
        }
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }

        if(!dataCount){
            dispatch(fetchDataCount())
        }else{
            setThisThesis(dataCount.thesisCount)
            setThisUser(dataCount.userCount)
            setThisAdmin(dataCount.adminCount)
            setThisGuest(dataCount.guestCount)
            setThisSub(dataCount.subCount)
            setThisSubP(dataCount.subCountP)
            setThisSubEx(dataCount.subCountEx)
            setThisSubAct(dataCount.subCountAct)
            setThisBorrow(dataCount.borrowCount)
            setThisBorrowP(dataCount.borrowCountP)
            setThisBorrowR(dataCount.borrowCountR)
            setThisBorrowOD(dataCount.borrowCountOD)
        }

        dispatch(fetchLog())

    },[dispatch,history, isLoggedInAdmin,thisDepartment, admin, dataCount]);

    const handleChangeBorrow = (e) => {

        switch(e.target.value){
            case('All Time'):
            setTimeSeriesBorrow('day')
                break;
            case('Week'):
            setTimeSeriesBorrow('week')
                break;
            case('Month'):
            setTimeSeriesBorrow('month')
                break;
            case('Year'):
            setTimeSeriesBorrow('year')
                break;
            default:
                return null
                break;
        }
    }   
    const handleChangeOverdue = (e) => {

        switch(e.target.value){
            case('All Time'):
            setTimeSeriesOverdue('day')
                break;
            case('Week'):
            setTimeSeriesOverdue('week')
                break;
            case('Month'):
            setTimeSeriesOverdue('month')
                break;
            case('Year'):
            setTimeSeriesOverdue('year')
                break;
            default:
                return null
                break;
        }
    }   
    const handleChangeReturned = (e) => {

        switch(e.target.value){
            case('All Time'):
            setTimeSeriesReturned('day')
                break;
            case('Week'):
            setTimeSeriesReturned('week')
                break;
            case('Month'):
            setTimeSeriesReturned('month')
                break;
            case('Year'):
            setTimeSeriesReturned('year')
                break;
            default:
                return null
                break;
        }
    }   
    const handleChange = (e) => {

        switch(e.target.value){
            case('All Time'):
                setTimeSeries('day')
                break;
            case('Week'):
                setTimeSeries('week')
                break;
            case('Month'):
                setTimeSeries('month')
                break;
            case('Year'):
                setTimeSeries('year')
                break;
            default:
                return null
                break;
        }
    }   
    const handleChangeX = (e) => {

        switch(e.target.value){
            case('All Time'):
                setTimeSeriesX('day')
                break;
            case('Week'):
                setTimeSeriesX('week')
                break;
            case('Month'):
                setTimeSeriesX('month')
                break;
            case('Year'):
                setTimeSeriesX('year')
                break;
            default:
                return null
                break;
        }
    }   
    return (
        <Fragment>
            <Row>
                <Col sm= {2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col>  

                <Col sm={10}>
                    { loading ? <LoaderAdmin/>  :  
                        <>
                        <div className="user-wrapper">
                            { admin ? 
                            <>
                                <div className="user-card">
                                    <div className="user-cards">
                                        <Row>
                                            <Col>
                                                { admin.avatar ? null :<img src={profile} alt="logo" className="img-profile" />}
                                                <br/>
                                                <h5 className='m-2'>{admin.admin_tupid}</h5> <br />
                                            </Col >
                                            <Col className='text-start'>
                                                <h4>{admin.admin_fname} {admin.admin_lname}</h4>
                                                <label><i>{admin.admin_tupmail}</i></label>
                                                <br />
                                                <label> {admin.admin_contact}</label> <br />
                                                <label> {thisDepartment}</label><br />
                                                <Button className="btn-user">Edit Profile</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </>: null}



                            <div>
                                <div className="container" >
                                    <Row className="mx-5">
                                        <Col className="mx-1">
                                            <div className="card-box bg-peach">
                                                <div className="inner">
                                                    <h3>{userCount}</h3>
                                                    <p> Students </p>
                                                </div>
                                                <div className="icon">
                                                    <i class="fas fa-id-card-alt"></i>
                                                </div>
                                                <Link to="/admin/users"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>

                                        <Col className="mx-1">
                                            <div className="card-box bg-peach2">
                                                <div className="inner">
                                                    <h3> {guestCount} </h3>
                                                    <p> Guests </p>
                                                </div>
                                                <div className="icon">
                                                    <i className="fa fa-users" aria-hidden="true" />
                                                </div>
                                                <Link to="/admin/guests"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>

                                        
                                    </Row>

                                    <Row className="mx-5 mb-5">
                                    <Col className="mx-1">
                                            <div className="card-box bg-pink">
                                                <div className="inner">
                                                    <h3> {adminCount} </h3>
                                                    <p> Admin </p>
                                                </div>
                                                <div className="icon">
                                                    <i class="fas fa-user-lock"></i>
                                                </div>
                                                <Link to="/admin/admins"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                        <Col className="mx-1">
                                            <div className="card-box bg-rose">
                                                <div className="inner">
                                                    <h3> {thesisCount} </h3>
                                                    <p> Thesis </p>
                                                </div>
                                                <div className="icon">
                                                    <i class="fas fa-scroll"></i>
                                                </div>
                                                <Link to="/admin/thesis"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>

                                    </Row>
  {/* ------------------------------ BORROWS ------------------------------------ */}
                                    <Row className="mx-5">
                                        <h3>Borrow</h3>
                                        <hr />
                                        <Col className="mx-1">
                                            <div className="card-box bg-peach">
                                                <div className="inner">
                                                    <h3> {borrowCountP} </h3>
                                                    <p> Pending </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-spinner"></i>
                                                </div>
                                                <Link to="/admin/borrow/request"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>

                                        <Col className="mx-1">
                                            <div className="card-box bg-peach2">
                                                <div className="inner">
                                                    <h3> {borrowCount} </h3>
                                                    <p> Active </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-check-circle"></i>
                                                </div>
                                                <Link to="/admin/borrow"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mx-5 mb-5">
                                        <Col className="mx-1">
                                            <div className="card-box bg-pink">
                                                <div className="inner">
                                                    <h3> {borrowCountR} </h3>
                                                    <p> Returned </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-exchange-alt"></i>
                                                </div>
                                                <Link to="/admin/return"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>

                                        <Col className="mx-1">
                                            <div className="card-box bg-rose">
                                                <div className="inner">
                                                    <h3> {borrowCountOD} </h3>
                                                    <p> Overdue </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-exclamation-circle"></i>
                                                </div>
                                                <Link to="/admin/borrow"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                    </Row>
{/* ------------------------------ SUBSCRIPTIONS ------------------------------------ */}
                                    <Row className="mx-5 mb-5">
                                        <h3>Subscriptions</h3>
                                        <hr />
                                        <Col className="mx-1">
                                            <div className="card-box bg-peach">
                                                <div className="inner">
                                                    <h3> {subCountP} </h3>
                                                    <p> Pending </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-spinner"></i>
                                                </div>
                                                <Link to="/admin/subscription/request"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>

                                        <Col className="mx-1">
                                            <div className="card-box bg-peach2">
                                                <div className="inner">
                                                    <h3> {subCountAct} </h3>
                                                    <p> Active </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-check-circle"></i>
                                                </div>
                                                <Link to="/admin/subscription/list"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>

                                        <Col className="mx-1">
                                            <div className="card-box bg-pink">
                                                <div className="inner">
                                                    <h3> {subCountEx} </h3>
                                                    <p> Expired </p>
                                                </div>
                                                <div className="icon">
                                                <i class="fas fa-times"></i>
                                                </div>
                                                <Link to="/admin/subscription/list"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                    </Row>

{/* --------------------------------------TOP VIEWS ------------------------------------------ */}
                                <Row className='px-5'>
                                        <br />
                                        <h2>Top Views</h2>
                                        <hr />
                                    <Row className='px-5'>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={viewsLog} title={"Top Viewed Thesis"} legend={"Views"} color={'#ff6464'}/>
                                            </div>
                                        </Col>

                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={basd} title={"Top Viewed Thesis (BASD)"} legend={"Views"}  color={'#e7545f'}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='px-5'>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={beng} title={"Top Viewed Thesis (BEng)"} legend={"Views"} color={'#ce4559'}/>
                                            </div>
                                        </Col>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={civil} title={"Top Viewed Thesis (Civil)"} legend={"Views"} color={'#b63752'}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='px-5'>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={elec} title={"Top Viewed Thesis ( Electrical)"} legend={"Views"} color={'#9d2a4a'}/>
                                            </div>
                                        </Col>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={mech} title={"Top Viewed Thesis (Mechanical)"} legend={"Views"} color={'#851d41'}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>
{/* -----------------------------------------TOP SEARCHED ------------------------------------- */}
                                <Row className='px-5'>
                                    <hr />
                                    <Row className='px-5'>
                                        {/* <Col className="p-2"> */}
                                            <div className="card-box bg-cream">
                                                
                                                <BarGraph dataLog={searchLog} title={"Top Searched Keywords"} legend={"Keywords"} color={'#ff6464'}/>
                                            </div>
                                        {/* </Col>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={mech} title={"Top Viewed Thesis (Mechanical)"} legend={"Views"} color={'#b63752'}/>
                                            </div>
                                        </Col> */}
                                    </Row>
                                </Row>
{/* --------------------------------------------------TOP DOWNLOADS------------------------------------------ */}
                                <Row className='px-5'>
                                    <br />
                                    <h2> Top Downloads</h2>
                                    <hr />
                                    <Row className='px-5'>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={downloadLog} title={"Top Downloaded Thesis"} legend={"Downloads"} color={'#ff6464'}/>
                                            </div>
                                        </Col>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={basdD} title={"Top Downloaded Thesis (BASD)"} legend={"Downloads"}  color={'#e7545f'}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='px-5'>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={bengD} title={"Top Downloaded Thesis (BEng)"} legend={"Downloads"} color={'#ce4559'}/>
                                            </div>
                                        </Col>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={civilD} title={"Top Downloaded Thesis (Civil)"} legend={"Downloads"} color={'#b63752'}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='px-5'>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={elecD} title={"Top Downloaded Thesis ( Electrical)"} legend={"Downloads"} color={'#9d2a4a'}/>
                                            </div>
                                        </Col>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={mechD} title={"Top Downloaded Thesis (Mechanical)"} legend={"Downloads"} color={'#851d41'}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>
{/* -----------------------------------------------TOP BORROWS ----------------------------------------------------- */}
                                <Row className='px-5'>
                                    <br />
                                    <h2> Top Borrows</h2>
                                    <hr />
                                    <Row className='px-5'>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={borrowTop} title={"Top Borrowed Thesis"} legend={"Borrows"} color={'#ff6464'}/>
                                            </div>
                                        </Col>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={basdB} title={"Top Borrowed Thesis (BASD)"} legend={"Borrows"}  color={'#e7545f'}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='px-5'>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={bengB} title={"Top Borrowed Thesis (BEng)"} legend={"Borrows"} color={'#ce4559'}/>
                                            </div>
                                        </Col>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={civilB} title={"Top Borrowed Thesis (Civil)"} legend={"Borrows"} color={'#b63752'}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='px-5'>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={elecB} title={"Top Borrowed Thesis ( Electrical)"} legend={"Borrows"} color={'#9d2a4a'}/>
                                            </div>
                                        </Col>
                                        <Col className="p-2">
                                            <div className="card-box bg-cream">
                                                <BarGraph dataLog={mechB} title={"Top Borrowed Thesis (Mechanical)"} legend={"Borrows"} color={'#851d41'}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>

{/* --------------------------------------TIMELINES---------------------------------------------------------- */}
                            <Row className='px-5'>
                                    <Row className='px-5 mb-5'>
                                        <br />
                                        <h2> Timeline</h2>
                                        <hr />

                                        <br />
                                        <h4> Subscriptions</h4>
                                        <Col className="bg-cream p-4 m-1">
                                        <Form.Group className="mb-2 w-50">
                                            <Form.Select id="format_field" onChange={handleChange}>
                                                <option> All Time </option>
                                                <option> Week</option>
                                                <option> Month</option>
                                                <option> Year</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <div className="card-box">
                                        
                                                <TimeSeries dataLog={subspday} time={timeSeries} title={'Subscriptions'} legend={'Subscriptions'} color={'#ff6464'} />
                                            </div>
                                        </Col>

                                        <Col className="bg-cream p-4 m-1">
                                        <Form.Group className="mb-2 w-50">
                                            <Form.Select id="format_field" onChange={handleChangeX}>
                                                <option> All Time </option>
                                                <option> Week</option>
                                                <option> Month</option>
                                                <option> Year</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <div className="card-box ">
                                                <TimeSeries dataLog={subspdayX} time={timeSeriesX} title={'Expired Subscriptions'} legend={'Subscriptions'} color={'#e7545f'}/>
                                            </div>
                                        </Col>
                                        
                                </Row>
                            
                                <Row className='px-5'>          
                                        <br />
                                        <h4> Books</h4>
                                    <Col className="bg-cream p-4 m-1">
                                    <Form.Group className="mb-2 w-50">
                                        <Form.Select id="format_field" onChange={handleChangeBorrow}>
                                            <option> All Time </option>
                                            <option> Week</option>
                                            <option> Month</option>
                                            <option> Year</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <div className="card-box ">
                                            <TimeSeries dataLog={borrowspday} time={timeSeriesBorrow} title={'Borrowed Books'} legend={'Books'} color={'#ff6464'}/>
                                        </div>
                                    </Col>
                                    

                                    <Col className="bg-cream p-4 m-1">
                                    <Form.Group className="mb-2 w-50">
                                        <Form.Select id="format_field" onChange={handleChangeReturned}>
                                            <option> All Time </option>
                                            <option> Week</option>
                                            <option> Month</option>
                                            <option> Year</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <div className="card-box ">
                                            <TimeSeries dataLog={returnedpday} time={timeSeriesReturned} title={'Returned Books'} legend={'Books'} color={'#e7545f'}/>
                                        </div>
                                    </Col>
                                    
                                </Row>
                                <Row className='px-5'>       
                                    <Col  className="bg-cream p-4 m-1">
                                    <Form.Group className="mb-2 w-50">
                                        <Form.Select id="format_field" onChange={handleChangeOverdue}>
                                            <option> All Time </option>
                                            <option> Week</option>
                                            <option> Month</option>
                                            <option> Year</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <div className="card-box ">
                                            <TimeSeries dataLog={overduepday} time={timeSeriesOverdue} title={'Overdue Books'} legend={'Books'} color={'#ce4559'}/>
                                        </div>
                                    </Col>
                                    <Col className="p-4 m-1"> 
                                    {/* <Form.Group className="mb-2 w-50">
                                        <Form.Select id="format_field" onChange={handleChangeReturned}>
                                            <option> All Time </option>
                                            <option> Week</option>
                                            <option> Month</option>
                                            <option> Year</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <div className="card-box ">
                                            <TimeSeries dataLog={returnedpday} time={timeSeriesReturned} title={'Returned Books'} legend={'Books'} color={'#e7545f'}/>
                                        </div> */}
                                    </Col>
                                    
                                </Row>
                            </Row>
{/* --------------------------------------PIE CHARTS---------------------------------------------------------- */}
                                <Row className='px-5'>
                                    <Col className="p-2">
                                        <div className="card-box bg-cream p-5">
                                            <PieChart dataLog={thesisDept} title={"Thesis per Department"}/>
                                        </div>
                                    </Col>
                                    <Col className="p-2">
                                    <div className="card-box bg-cream p-5">
                                            <PieChart dataLog={subscription} title={"Total Subscriptions"}/>
                                        </div>
                                    </Col>
                                </Row>

                                    


                                </div>
                            </div>
                        </div> 
                        </>
                    }
                </Col>
            </Row>
        </Fragment>
    );
}

export default AdminDashboard;