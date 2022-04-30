import React, { Fragment, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom' 
import {Container,Row, Col, Button, Card} from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux'
import profile from '../../img/profile.png'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import AdminSidebar from '../../layout/AdminSidebar'

import BarGraph from './analytics/BarGraph'
import DownloadperDept from './analytics/DownloadperDept'
import DownloadperDay from './analytics/DownloadperDay'
import Thesis from './analytics/Thesis'
import {fetchLog} from '../../../redux/actions/loggingActions'
import {fetchDataCount} from '../../../redux/actions/loggingActions'
// require('./dashboard.css');


const AdminDashboard = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [thisDepartment, setThisDepartment] = useState('')
    const { loading,isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {dataCount} = useSelector(state => state.dataCount)
    const { viewsLog, searchLog, downloadLog} = useSelector(state => state.logs)

    const[thesisCount,setThisThesis] = useState('')
    const[userCount,setThisUser] = useState('')
    const[adminCount,setThisAdmin] = useState('')
    const[guestCount,setThisGuest] = useState('')
    const[subCount,setThisSub] = useState('')
    const[borrowCount,setThisBorrow] = useState('')

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
            setThisBorrow(dataCount.borrowCount)
        }

        dispatch(fetchLog())

    },[dispatch,history, isLoggedInAdmin,thisDepartment, admin, dataCount]);
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
                                <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a>
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
                                <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a>
                            </div>
                        </Col>

                        <Col className="mx-1">
                            <div className="card-box bg-pink">
                                <div className="inner">
                                <h3> {adminCount} </h3>
                                <p> Admin </p>
                                </div>
                                <div className="icon">
                                <i class="fas fa-user-lock"></i>
                                </div>
                                <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a>
                            </div>
                        </Col>
                </Row>
                <Row className="mx-5">
                        <Col className="mx-1">
                        <div className="card-box bg-rose">
                            <div className="inner">
                            <h3> {thesisCount} </h3>
                            <p> Thesis </p>
                            </div>
                            <div className="icon">
                            <i class="fas fa-scroll"></i>
                            </div>
                            <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a>
                        </div>
                        </Col>

                        <Col className="mx-1">
                        <div className="card-box bg-maroon">
                            <div className="inner">
                            <h3> {subCount} </h3>
                            <p> Subscriptions </p>
                            </div>
                            <div className="icon">
                            <i class="fas fa-credit-card"></i>
                            </div>
                            <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a>
                        </div>
                        </Col>

                        <Col className="mx-1">
                        <div className="card-box bg-darkMaroon">
                            <div className="inner">
                            <h3> {borrowCount} </h3>
                            <p> Borrowed </p>
                            </div>
                            <div className="icon">
                            <i className="fa fa-book" />
                            </div>
                            <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a>
                        </div>
                        </Col>
                </Row>
                {/* <Row className="mx-5">
                        <Col className="mx-1">
                        <div className="card-box bg-red">
                        <div className="inner">
                        <h3> 7 </h3>
                        <p> Borrow Request </p>
                        </div>
                        <div className="icon">
                        <i className="fa fa-plus" />
                        </div>
                        <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a>
                    </div>
                        </Col>

                        <Col className="mx-1">
                        <div className="card-box bg-red">
                        <div className="inner">
                        <h3> 3 </h3>
                        <p> Borrowed </p>
                        </div>
                        <div className="icon">
                        <i className="fas fa-books"></i>
                        </div>
                        <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a>
                    </div>
                        </Col>

                        <Col className="mx-1">
                        <div className="card-box bg-red">
                        <div className="inner">
                        <h3> 8 </h3>
                        <p> Returned </p>
                        </div>
                        <div className="icon">
                        <i className="fa fa-sync" />
                        </div>
                        <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a>
                    </div>
                        </Col>
                </Row> */}

                <Row className='px-5'>
                    <Col className="p-2">
                    <div className="card-box bg-cream">
                    <BarGraph dataLog={viewsLog} title={"Most Viewed Thesis"} legend={"Views"} color={'#ff6464'}/>
                    </div>
                    </Col>
                    <Col className="p-2">
                    <div className="card-box bg-cream">
                    <BarGraph dataLog={searchLog} title={"Top Searched"} legend={"Keywords"} color={'#ce4559'}/>
                    </div>
                    </Col>
                </Row>
                <Row className='px-5'>
                    <Col className="p-2">
                    <div className="card-box bg-cream">
                    <BarGraph dataLog={downloadLog} title={"Most Downloaded Thesis"} legend={"Downloads"} color={'#9d2a4a'}/>
                    </div>
                    </Col>
                    <Col className="p-2">
                    {/* <div className="card-box bg-cream">
                    <BarGraph dataLog={searchLog} title={"Top Searched"} legend={"Keywords"} />
                    </div> */}
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