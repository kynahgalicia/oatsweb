import logo from '../img/logo.png'
import {Link} from 'react-router-dom'
const Footer = () => {
    return ( 
        <div>
            <div className="left">
            
            <h2 className="d-inline"> <img src={logo} alt="logo" className="img-logo d-inline mx-2 my-1" /> Online Archiving Thesis System (OATS)</h2>
            
            <p>Technological University of the Philippines - Taguig</p>
            <p>Km. 14 East Service Road, Western Bicutan, Taguig, 1630, Philippines</p>
            <p>(02) 823 2457</p>
            <p>oatstupt2122@gmail.com</p>

            </div>
            
            <div className="right">
                <p>Copyright 2021</p>

                <Link to='/terms' > <p>Terms and Conditions</p></Link>
                
                <p>Online Thesis Archiving System (OATS)</p>
                <p>Technological University of the Philippines - Taguig</p>
            </div>
        </div>
            
    
    );
}

export default Footer;