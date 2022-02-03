import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment'
const SearchResults = ({thesis}) => {
    return ( 
        <Fragment>
            { thesis && thesis.map((theses) => (
            <div className='thesis-result'>
                <h5> <Link to={`/user/search/details/${theses._id}`}> {theses.title}</Link> </h5>
                
        
                { theses.authors.map((x) => (
                    <Link><p><i> {x.author}</i></p></Link>
                ))}
            

                <div>
                    <label> Published: <Link>{moment(theses.publishedAt).format('MMMM D YYYY')}</Link> | Department: <Link>{theses.department.deptname}</Link> | Course: <Link>{theses.course.coursecode}</Link></label>
                </div>
            </div>
            
        ))}
        </Fragment>
    );
}

export default SearchResults;