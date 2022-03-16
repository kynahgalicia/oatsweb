import { BsFillBookFill } from 'react-icons/bs';
import { FaHardHat } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';
import { GiElectric } from 'react-icons/gi';
import { GoGear } from 'react-icons/go';
import {Container, Row, Col} from 'react-bootstrap'

const Departments = () => {
    return ( 
        <div className="department">
            <h1>Departments</h1>
            <Container>
            <Row> 
                <Col> 
                <div className="dept-items">
                <i><BsFillBookFill/></i><br />
                <a href="/"> Basic Arts & Sciences</a>
                </div>
                
                </Col>

                <Col> 
                <div className="dept-items">
                <i><FaHardHat/></i><br />
                <a href="/"> Civil & Allied</a>

                </div>
                </Col>

                <Col> 
                <div className="dept-items">

                <i><GiElectric/></i><br />
                <a href="/"> Electrical & Allied</a>
                </div>
                </Col>

                <Col> 
                <div className="dept-items">
                    
                <i><GoGear/></i><br />
                <a href="/"> Mechanical & Allied</a>
                </div>
                </Col>

                <Col> 
                <div className="dept-items">
                <i><FaWrench/></i><br />    
                <a href="/"> Bachelor of Engineering</a>
                </div>
                </Col>
            </Row>
            </Container>
            
        </div>
    );
}

export default Departments;