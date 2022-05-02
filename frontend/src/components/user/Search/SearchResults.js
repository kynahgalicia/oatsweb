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
    const {subType, isLoggedIn} = useSelector(state => state.authUser)
    const {subTypeGuest, isLoggedInGuest} = useSelector(state => state.authGuest)

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

        

    },[ dispatch, alert,history, success,error, thisId,subType,subTypeGuest,sub, isLoggedIn,isLoggedInGuest]);

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
                    { isLoggedIn ?  <h5> <Link to={`/thesis/${theses._id}`}> {theses.title} </Link> </h5>: null}
                    { isLoggedInGuest &&  !subTypeGuest ? <h5> <Link to='#' data-target='#subscriptionModal' data-toggle="modal"> {theses.title} </Link> </h5> : null}
                    { isLoggedInGuest &&  (subTypeGuest && subTypeGuest.status === 'Active') ? <h5> <Link to={`/thesis/${theses._id}`}> {theses.title} </Link> </h5> : null}
                    { isLoggedInGuest &&  (subTypeGuest && subTypeGuest.status === 'Pending') ? <h5> <Link to='#' data-target={isLoggedInGuest &&  (subTypeGuest && subTypeGuest.status === 'Pending') ? '#subscriptionModal' : null} data-toggle="modal"> {theses.title} </Link> </h5> : null}
                    {!isLoggedInGuest && !isLoggedIn  ? <h5> <Link to='/user/login'> {theses.title}</Link></h5>: null}
                    
                    </Col>
                    
                    <Col> 
                        { thisId ?<div className="icon-bookmark" onClick={() => bookmarkHandler(theses._id)} data-toggle="tooltip" data-placement="bottom" title="Bookmark">  <i class="fas fa-bookmark"></i>  <i class="far fa-bookmark" ></i></div>  : null}
                        
                        {  userDept && userDept !== theses.department.deptname  && (!subType || (subType && subType.status === "Pending")) ? <i className="fas fa-lock"></i> :  null  }
                        {  isLoggedInGuest && (subTypeGuest && subTypeGuest.status === "Pending" )  ?  <i className="fas fa-lock"></i>  : null  }
                        {  isLoggedInGuest && !subTypeGuest ?  <i className="fas fa-lock"></i>  : null  }
                        {  !userDept && !isLoggedIn && !isLoggedInGuest ?  <i className="fas fa-lock"></i>  : null  }
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
          <div className="modal fade" id="subscriptionModal" aria-hidden="true" data-backdrop="false">
                                <div className="modal-dialog modal-dialog-centered modal-dialog modal-lg">
                                    <div className="modal-content subscription">
                                        {/* <div className="modal-header">
                                            <h5 className="modal-title">OATS Thesis Archive Subscription</h5>
                                            
                                            
                                        </div> */}
                                        <button type="button" class="close text-right" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                        <div className="sub-card-pdf" id="subscriptionModal" aria-hidden="true">
                                            <h5>Subscribe for full access of the text! <br/>Check out the plans available below.</h5>
                                            <br/>
                                            <Card className= "sub-card-pdf text-start">
                                                <Card.Header> <h1 className="text-start">₱50/day</h1></Card.Header>

                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                            <p>Access all of the thesis titles available for 1 day.</p>
                                                        </Col>

                                                        <Col>
                                                            <ul >
                                                                <li><i class="fas fa-check"></i> View Full Text</li>
                                                                <li><i class="fas fa-check"></i> Download Full PDF</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                    <Link to='#'><Button>Subscribe</Button></Link>
                                                </Card.Body>
                                            </Card>

                                            <Card className= "sub-card-pdf text-start">
                                                <Card.Header><h1 className="text-start">₱325/week</h1></Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                        <p>
                                                        Open access to ALL archived research in OATS for 7 days
                                                        </p>
                                                        </Col>
                                                        <Col>
                                                        <ul >
                                                        <li><i class="fas fa-check"></i> View Full Text</li>
                                                        <li><i class="fas fa-check"></i> Download Full PDF</li>
                                                        </ul>
                                                        </Col>
                                                        <Link to='#'><Button>Subscribe</Button></Link>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div> 
                                    </div>
                                </div>
                            </div>
        </Fragment>
    );
}

export default SearchResults;