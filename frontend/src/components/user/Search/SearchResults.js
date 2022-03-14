import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment'
const SearchResults = ({userDept,thesis}) => {

    return ( 
        <Fragment>
            { thesis && thesis.map((theses) => (
            <div className='thesis-result'>

                <div className="row">
                    <div className="col">
                    <h5> <Link to={`/thesis/${theses._id}`}> {theses.title}</Link> </h5>
                    </div>
                    <div className="col">
            { userDept !== theses.department.deptname ? <i className="fas fa-lock"></i> :  null  }
                    </div>
                </div>
                
                <Link><p><i> {theses.authors[0].author + ' ...'} </i></p></Link>
                {/* { theses.authors.map((x) => (
                    <Link><p><i> {x.author}</i></p></Link>
                ))}
             */}

                <div>
                    <label> Published: <Link>{theses.publishedAt}</Link> | Department: <Link>{theses.department.deptname}</Link> | Course: <Link>{theses.course.coursecode}</Link></label>
                </div>

                
            </div>
            
        ))}
        </Fragment>
    );
}

export default SearchResults;