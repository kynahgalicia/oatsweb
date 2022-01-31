import React, {Fragment, useState} from 'react'
import back from '../../img/back-red.png';
import { FaSearch } from 'react-icons/fa';
import Cards from './home-components/Cards';
import Department from './home-components/Department';
import {Link, useHistory } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'



const Home = () => {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');
    const searchHandler = (e) => {
        if(keyword){
            console.log('no key')
        }
        e.preventDefault()
        if (keyword) {
            if (window.location.pathname === '/') {
                    history.push(`/user/search/${keyword}`)
            }

        } else {
            history.push('/')
        }
    }
    const [cards, setCards] = useState([
        { title: 'Integer consequat sed quam sit amet scelerisque.', author: 'Author 1', id: 1 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 2', id: 2 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
        { title: 'Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor', abstract: 'Lorem ipsum dolor sit amet consectetur adipiscing elit In tempus, velit semper ullamcorper rhoncus', author: 'Author 3', id: 3 , year: 2022, department: 'Electrical & Allied', course: 'BSIT'},
    ])
    return (  
        <Fragment>
            
            <div className="content">
            <div className="landingpage">
                <img src={back} alt="logo" className="img-bg" />

                <Row>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                    <div className="search">
                
                        <h1>Lorem ipsum dolor sit amet</h1>
                        <h4>consectetur adipiscing elit</h4>

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
                                        <i className="fa fa-search" aria-hidden="true"></i>
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
            
            
        </div>
        </Fragment>
    );
}
export default Home;