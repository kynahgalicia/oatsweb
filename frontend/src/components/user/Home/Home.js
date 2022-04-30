import React, {Fragment, useState, useEffect} from 'react'
import back from '../../img/back-red.png';
import { FaSearch } from 'react-icons/fa';
import Cards from './home-components/Cards';
import Department from './home-components/Department';
import { useHistory } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import { getThesisCount } from '../../../redux/actions/thesisActions';
import { searchLog, fetchHomeCount, fetchFeaturedCount} from '../../../redux/actions/loggingActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/utils/Loader'


const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const { thesisCount, loading} = useSelector(state => state.thesis);
    const {adminToken} = useSelector(state => state.authAdminToken)
    const {homeCount} = useSelector(state => state.homeCount)
    const {featuredCount} = useSelector(state => state.featuredCount)

    useEffect(() => {

        dispatch(getThesisCount())

        // if(!topViewed && !featuredThesis){
            dispatch(fetchHomeCount())
            dispatch(fetchFeaturedCount())
        // }else{
        //     setThisTopView(homeCount)
        //     setThisFeaturedThesis(featuredCount)
        // }
        
        console.log(thesisCount)
    }, [dispatch, history])
    
    const searchHandler = (e) => {
        
        if(!keyword){
            console.log('no key')
        }
        e.preventDefault()
        if (keyword) {
            const formData = new FormData();
            formData.set('keyword', keyword.toLowerCase());
            dispatch(searchLog(formData))
            
            if (window.location.pathname === '/') {
                    history.push(`/search/${keyword}`)
            }

            

        } else {
            history.push('/')
        }
    }
    return (  
        <Fragment>
            {!adminToken ? 
            loading ? <Loader/> :
            <div className="content">
                <div className="landingpage">
                    <img src={back} alt="logo" className="img-bg" />

                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={10}>
                        <div className="search">
                    
                                <h1>Preserving the past, opening the future.</h1>
                                <h4>Search {thesisCount} items</h4>

                                <form onSubmit={searchHandler} className='searchbar ' >
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            id="search_field"
                                            className="form-control "
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button id="search_btn" className="btn">
                                            <FaSearch></FaSearch>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </Col>
                        <Col sm={1}></Col>
                    </Row>
                </div>

                <div className="section">
                <Cards cards={featuredCount} title="Featured Thesis" />
                </div>
                <div className="category">
                    <Department/>
                </div>
                <div className="section">
                    <Cards cards={homeCount} title="Top Viewed"></Cards>
                </div>

        </div> 
        : null}
        {adminToken ? 
        <div className='wrapper'>
        Welcome Admin !
        </div> : null}
        </Fragment>
    );
}
export default Home;