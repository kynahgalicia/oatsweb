import React, { Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom' 
import {Row, Col, Button, Card} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import UserSidebar from '../../layout/UserSidebar'
import profile from '../../img/profile.png'
const UserProfile = () => {

    const history = useHistory()

    const { isLoggedIn, user} = useSelector(state => state.authUser)


    useEffect(() => {

        if (!isLoggedIn) {
            history.push('/user/login');
        }
    },[ history, isLoggedIn]);
    return (

        <Fragment>

            <Row>
                    <Col sm= {2}>
                        <UserSidebar/>
                    </Col>  
                    <Col sm={10}>
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
                        <label> {user.user_contact}</label> <br />
                        <label> {user.user_department.deptname}</label><br />
                        <label> {user.user_course.coursecode}</label><br />
                        <Button className="btn-user">Edit Profile</Button>
                        </Col>
                    </Row>
                        </div>
                </div>
                </>: null}
            
                    <Row>
                        <Col sm={4}>
                            <Card className="user-stats">
                                <label>My Bookmarks</label>
                                <h1>1</h1>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card className="user-stats">
                                <label> My Files</label>
                                <h1>1</h1>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card className="user-stats">
                                <label>Borrowed Books</label>
                                <h1>10</h1>
                            </Card>
                        </Col>
                    </Row>
                    
                </div>
            </Col>
        </Row>
    
            
                
        </Fragment>
    );
}

export default UserProfile;