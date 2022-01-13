import Banner from './home-components/Banner'
import {Container, Row, Col} from 'react-bootstrap'
const About = () => {
    return ( 
        <div className="wrapper">
            
            <Banner title="About"/>

            <Container className="m-7">
            <Row className='text-body'> 
                <Col sm={9}> 
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu quam porta, vehicula elit et,
                cursus dui. Nunc malesuada turpis diam, id porta justo sodales eget. In hac habitasse platea 
                dictumst. Quisque enim arcu, vulputate a neque a, placerat rhoncus risus. Etiam semper ex ut 
                consequat commodo. Praesent in elit dolor. Ut egestas consequat sem a elementum. 
                Curabitur dapibus tellus a imperdiet euismod.
                </p>
                </Col>
                <Col sm={3} className='border-left'>

                </Col>
            </Row>
            </Container>


        </div>
    );
}

export default About;