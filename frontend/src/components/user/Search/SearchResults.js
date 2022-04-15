import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
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
                    {subType ? <h5> <Link to={userDept && subType && userDept !== theses.department.deptname  && subType.status === "Pending"?  '#' : `/thesis/${theses._id}`} > {theses.title}</Link> </h5> : null}
                    {subTypeGuest ? <h5> <Link to={subTypeGuest && subTypeGuest.status === "Pending" ? '#' : `/thesis/${theses._id}`} > {theses.title}</Link> </h5>: null}
                    {!subTypeGuest && !subType? <h5> <Link to='#' > {theses.title}</Link> </h5>: null}
                    
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
        </Fragment>
    );
}

export default SearchResults;