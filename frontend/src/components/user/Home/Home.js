import React, {Fragment} from 'react'
import back from '../../img/back-red.png';
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import Cards from './home-components/Cards';
import Department from './home-components/Department';
import {Link} from 'react-router-dom'



const Home = () => {
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

                <div className="search">
                
                <h1>Lorem ipsum dolor sit amet</h1>
                <h4>consectetur adipiscing elit</h4>

                <div className="searchbar">
                    <input type="text" />

                    <Link to="/user/search"> <button><i><FaSearch/></i> </button></Link>
                </div>
                    
                </div>
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