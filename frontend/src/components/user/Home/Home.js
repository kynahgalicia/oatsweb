import React, {Fragment, useState, useEffect} from 'react'
import back from '../../img/back-red.png';
import { FaSearch } from 'react-icons/fa';
import Cards from './home-components/Cards';
import Department from './home-components/Department';
import { useHistory } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import { getThesisCount } from '../../../redux/actions/thesisActions';
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const { thesisCount } = useSelector(state => state.thesis);
    const {adminToken} = useSelector(state => state.authAdminToken)
    const { admin} = useSelector(state => state.authAdmin)
    useEffect(() => {

        // if (adminToken) {
        //     history.push('/admin/dashboard');
        // }
        dispatch(getThesisCount())
        console.log(thesisCount)
    }, [dispatch, history])
    
    const searchHandler = (e) => {
        
        if(keyword){
            console.log('no key')
        }
        e.preventDefault()
        if (keyword) {
            if (window.location.pathname === '/') {
                    history.push(`/search/${keyword}`)
            }

        } else {
            history.push('/')
        }
    }
    const [cards] = useState([
        { title: 'Integer consequat sed quam sit amet scelerisque.', author: 'Author 1', id: 1 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 2', id: 2 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 3', id: 3 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
    ])
    return (  
        <Fragment>
            {!adminToken ? <div className="content">
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
            <Cards cards={cards} title="Featured Thesis" />
            </div>
            <div className="category">
                <Department/>
            </div>
            <div className="section">

                <Cards cards={cards} title="Top Searches"></Cards>

            </div>
            
            
        </div> : null}
        {adminToken ? 
        <div className='wrapper'>
        Welcome Admin !
        </div> : null}
        </Fragment>
    );
}
export default Home;