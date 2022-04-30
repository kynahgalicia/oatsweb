import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import GuestSidebar from '../../layout/GuestSidebar'
import {Row, Col, Button, Card} from 'react-bootstrap'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBookmarks, deleteBookmark,clearErrors } from '../../../redux/actions/bookmarkActions';
import { FaTrash} from 'react-icons/fa';
import { DELETE_BOOKMARK_RESET } from '../../../redux/constants/bookmarkConstants'
const GuestBookmark = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [thisId, setThisId] = useState('')
    const { loading, error, bookmarks } = useSelector(state => state.bookmarks)
    const { error: deleteError, isDeleted } = useSelector(state => state.bookmark)
    const {guest, isLoggedInGuest, subType} = useSelector(state => state.authGuest)

    useEffect(() => {
        if(isLoggedInGuest){
            setThisId(guest._id)
        }

        if(thisId){
            dispatch(getUserBookmarks(thisId))
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            history.push('/guest/bookmark');
            alert.success('Deleted bookmark');
            dispatch({ type: DELETE_BOOKMARK_RESET })
        }
        


    }, [dispatch, alert, history, error, isLoggedInGuest, thisId,deleteError, isDeleted])

    const deleteHandler = (id) => {
        dispatch(deleteBookmark(id))
    }

    return (

        <Fragment>

            <Row>
                    <Col sm= {2} className="admin-sidebar">
                        <GuestSidebar/>
                    </Col>  
                    <Col sm={10}>
                    <h1 className='text-start m-4'>Bookmarks</h1>

<div className='bookmark-result'>
    { loading ? <LoaderAdmin/>:
    
    bookmarks && bookmarks.map((bookmark) => (
        <>
        <Card style={{ width: '18rem' }} >
            <Card.Body>
                <Card.Title className='text-start'><Link to={ subType && subType.status === "Active" ? `/thesis/${bookmark.thesis.id}` : '#'}> {bookmark.thesis.title}</Link></Card.Title>
                <Card.Text className='text-start'>
                    <label><i>{bookmark.thesis.publishedAt}</i></label><br/>   
                    {bookmark.thesis.abstract.substring(0, 100)}...
                </Card.Text>
            </Card.Body>

            <Card.Footer className="text-muted">
                    <Col>
                    </Col>
                    <Col className="text-end">
                    <Button variant="danger " onClick={() => deleteHandler(bookmark._id)} >
                    <FaTrash/>
                </Button>
                    </Col>
                </Card.Footer>
                
            </Card>   
        </>
    ))
    }

</div>
                    </Col>
        </Row>
    
            
                
        </Fragment>
    );
}

export default GuestBookmark;