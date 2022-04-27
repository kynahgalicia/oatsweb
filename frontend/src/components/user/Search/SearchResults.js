import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Button, Card, CardGroup, Form} from 'react-bootstrap'
import {newBookmark, clearErrors} from '../../../redux/actions/bookmarkActions'
import { NEW_BOOKMARK_RESET } from '../../../redux/constants/bookmarkConstants';
// import moment from 'moment'
const SearchResults = ({userDept,thesis, thisId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const { success,error } = useSelector(state => state.newBookmark)
    const {subType} = useSelector(state => state.authUser)
    const {subTypeGuest} = useSelector(state => state.authGuest)

    const [thisUserId, setThisUserId] = useState('')
    const [sub, setSub] = useState(true)
    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        setThisUserId(thisId)

        if (success) {
            alert.success('Bookmarked!');
            dispatch({ type: NEW_BOOKMARK_RESET })
        }

        

    },[ dispatch, alert,history, success,error, thisId,subType,subTypeGuest,sub]);

    const bookmarkHandler = (id) => {

        const formData = new FormData();
        formData.set('user_id', thisUserId);
        formData.set('theses', id);

        dispatch(newBookmark(formData))
    }
    return ( 
        <Fragment>
            { thesis && thesis.map((theses) => (
                <div className='thesis-result'>

                <Row>
                    <Col>
                    {subType ? <h5> <Link to={`/thesis/${theses._id}`}> {theses.title}</Link> </h5> : null}
                    {subTypeGuest ? <h5> <Link to={`/thesis/${theses._id}`} > {theses.title}</Link> </h5>: null}
                    {!subTypeGuest && !subType? <h5> <Link to='/user/login'> {theses.title}</Link></h5>: null}
                    
                    </Col>
                    <Col> 
            { thisId ?<div className="icon-bookmark" onClick={() => bookmarkHandler(theses._id)} data-toggle="tooltip" data-placement="bottom" title="Bookmark">  <i class="fas fa-bookmark"></i>  <i class="far fa-bookmark" ></i></div>  : null}
            
            {  userDept && subType && userDept !== theses.department.deptname  && subType.status === "Pending" ? <i className="fas fa-lock"></i> :  null  }
            {  subTypeGuest && subTypeGuest.status === "Pending"   ?  <i className="fas fa-lock"></i>  : null  }
            {  !userDept && !subType && !subTypeGuest ?  <i className="fas fa-lock"></i>  : null  }
                    </Col>
                </Row>
                
                {
                    theses.authors.map((author) =>(
                        <Link><p><i> {author.fname.charAt(0)}. {author.lname} ;</i></p></Link>

                        ))
                } 
                <div>
                    <label> Published: <Link>{theses.publishedAt}</Link> | Department: <Link>{theses.department.deptname}</Link> | Course: <Link>{theses.course.coursecode}</Link></label>
                </div>

                
            </div>
            
        ))}

        {/* Subscription Modal */}
        <div className="modal fade" id="subscriptionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">OATS Thesis Archive Subscription</h5>
                                            
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <div className="modal-body text-start">
                                            <CardGroup>
                                                <Card>
                                                    <Card.Body>
                                                        <div className='cardTitle'>
                                                            <h1 className='d-inline'>₱50</h1><h3 className='d-inline'>/mo.</h3>
                                                        </div>
                                                        <br/>
                                                        <Card.Text>
                                                            Avail the subscription to access all of the thesis available in OATS.
                                                        </Card.Text>
                                                    </Card.Body>

                                                    <Card.Footer className='cardTitle'>
                                                        <Button type='submit'  data-backdrop="false" ><Link data-backdrop="" to="/user/payment" >Subscribe</Link></Button>
                                                    </Card.Footer>
                                                </Card>

                                                <Card>
                                                    <Card.Body>
                                                        <div className='cardTitle'>
                                                            <h1 className='d-inline'>₱140</h1><h3 className='d-inline'>/qtr.</h3>
                                                        </div>
                                                        <br/>
                                                        <Card.Text>
                                                            For 4 months, you can have access to the theses that has been archived in OATS.
                                                        </Card.Text>
                                                    </Card.Body>

                                                    <Card.Footer className='cardTitle'>
                                                        <Button>Subscribe</Button>
                                                    </Card.Footer>
                                                </Card>

                                                <Card>
                                                    <Card.Body>
                                                        <div className='cardTitle'>
                                                            <h1 className='d-inline'>₱550</h1><h3 className='d-inline'>/yr.</h3>
                                                        </div>
                                                        <br/>
                                                        <Card.Text>
                                                            Open access to ALL archived research in OATS for a whole year!
                                                        </Card.Text>
                                                    </Card.Body>

                                                    <Card.Footer className='cardTitle'>
                                                        <Button>Subscribe</Button>
                                                    </Card.Footer>
                                                </Card>
                                            </CardGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
        </Fragment>
    );
}

export default SearchResults;