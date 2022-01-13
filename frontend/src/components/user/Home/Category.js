import Banner from "./home-components/Banner";
import {Container, Row, Col} from 'react-bootstrap'
const Category = () => {
    return ( 

        <div className="wrapper">
            <Banner title="Category"/>
            <Container className="m-7">
            <Row className='text-body'> 
                <Col sm={9}> 
                <ul>
                    <h1>Lorem Ipsum</h1>
                    <li>
                    Dolor sit amet
                    </li>
                    <li>
                    Aenean eu quam
                    </li>
                    <li>
                    Consectetur adipiscing
                    </li>
                    <li>
                    Dolor sit amet
                    </li>
                    <li>
                    Consectetur adipiscing
                    </li>
                </ul>
                </Col>
                <Col sm={3} className='border-left'>

                </Col>
            </Row>
            </Container>

        </div>

        
    );
}

export default Category;