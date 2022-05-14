import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom' 
import {Row, Col, Button, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import UserSidebar from '../../layout/UserSidebar'
import profile from '../../img/profile.png'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { fetchStudentCount } from '../../../redux/actions/loggingActions'
const UserProfile = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const { isLoggedIn, user} = useSelector(state => state.authUser)
    const { borrowCount, bookmarksCount, thesisCount, overdueCount, loading} = useSelector(state => state.studentCount)

    useEffect(() => {

    if(user){    
        dispatch(fetchStudentCount(user._id))

        console.log(user._id)
    }

        if (!isLoggedIn) {
            history.push('/user/login');
        }
    },[ dispatch, history, isLoggedIn]);
    return (
        <Fragment>
            <Row>
            <Col sm= {2} className="admin-sidebar">
                    <UserSidebar/>
                </Col> 
                
                <Col sm={10}>
                { loading ? <LoaderAdmin/>:
                    <div className="user-wrapper">
                        { user ? 
                        <>
                        <div className="user-card">
                            <div className="user-cards">
                                <Row>
                                    <Col>
                                        { user.avatar ? null :<img src={profile} alt="logo" className="img-profile" />}
                                        <br/>
                                        <h5 className='m-2'>{user.user_tupid}</h5> <br />
                                    </Col >
                                    <Col className='text-start'>
                                        <h4>{user.user_fname} {user.user_lname}</h4>
                                        <label><i>{user.user_tupmail}</i></label>
                                        <br />
                                        <label> +63{user.user_contact}</label> <br />
                                        <label> {user.user_department.deptname}</label><br />
                                        <label> {user.user_course.coursecode}</label><br />
                                        <Link to='/user/profile/edit' ><Button className="btn-user">Edit Profile</Button></Link>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        </>: null}
                
                        <Row>
                            <Col className="mx-1">

                                <div className="card-box bg-peach">
                                <div className="inner">
                                <h3>{bookmarksCount}</h3>
                                <p> My Bookmarks </p>
                                </div>
                                <div className="icon">
                                <i className="fas fa-bookmark"></i>
                                </div>
                                <Link to="/user/bookmark"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                            </div>
                            </Col>
                            <Col className="mx-1">

                                <div className="card-box bg-peach2">
                                    <div className="inner">
                                    <h3> {thesisCount} </h3>
                                    <p> Thesis Files </p>
                                    </div>
                                    <div className="icon">
                                    <i className="fas fa-scroll"></i>
                                    </div>
                                    <Link to="/user/thesis"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                </div>
                            </Col>
                        </Row>        
                        <Row>
                            <Col className="mx-1">
                                <div className="card-box bg-pink">
                                    <div className="inner">
                                    <h3> {borrowCount} </h3>
                                    <p> Current borrowed Books </p>
                                    </div>
                                    <div className="icon">
                                    <i className="fas fa-book"></i>
                                </div>
                                <Link to="/user/borrow"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                </div>
                            </Col>
                            <Col className="mx-1">
                                <div className="card-box bg-rose">
                                    <div className="inner">
                                    <h3> {overdueCount} </h3>
                                    <p> Overdue Books </p>
                                    </div>
                                    <div className="icon">
                                    <i className="fas fa-exclamation-circle"></i>
                                </div>
                                <Link to="/user/borrow"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                                </div>
                            </Col>
                        </Row>
                            
                        
                    </div>
                }
                </Col>
            </Row>
    
            
                
        </Fragment>
    );
}

export default UserProfile;