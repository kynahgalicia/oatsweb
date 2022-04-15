import React, { Fragment, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom' 
import {Row, Col, Button, Card} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import profile from '../../img/profile.png'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import AdminSidebar from '../../layout/AdminSidebar'
const AdminDashboard = () => {

    const history = useHistory()

    const [thisDepartment, setThisDepartment] = useState('')
    const { loading,isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)


    useEffect(() => {
        if(admin){
            setThisDepartment(admin.admin_department.deptname)
            // console.log(thisAdmin)
        }
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
    },[ history, isLoggedInAdmin,thisDepartment, admin]);
    return (

        <Fragment>

            <Row>
                    <Col sm= {2} className="admin-sidebar">
                        <AdminSidebar/>
                    </Col>  
                    <Col sm={10}>
                    {loading ? <LoaderAdmin/>  :  
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
                </>
                    }
            </Col>
        </Row>
    
            
                
        </Fragment>
    );
}

export default AdminDashboard;