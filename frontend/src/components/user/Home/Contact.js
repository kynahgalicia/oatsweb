import Banner from './home-components/Banner'
import {Container, Row, Col, Card} from 'react-bootstrap'
import shek from '../../img/shekinah.jpg';
import li from '../../img/leslie.jpg';
import vince from '../../img/vince.jpg';
import rods from '../../img/rods.jpg';

const Contact = () => {
    return (
        <div className="wrapper">
            
            <Banner title="Contact"/>

            <Container className="m-7">
            

            <Row className='text-body'>
                <Col sm={3}>
                    <Row xs={1} md={1} className="g-4">
                        <Card className="p-3">
                            <Card.Img variant="top" src={li} />

                            <Card.Body>
                                <Card.Title>Leslie Jayne Ayacocho</Card.Title>

                                <Card.Text>
                                    <p>Bachelor of Science in Information Technology</p>
                                    <p>Technological University of the Philippines Taguig</p>
                                    <p>lesliejayne.ayacocho@tup.edu.ph</p>
                                </Card.Text>
                            </Card.Body>

                            
                        </Card>
                    </Row>
                </Col>

                <Col sm={3}>
                    <Row xs={1} md={1} className="g-4">
                        <Card className="p-3">
                                <Card.Img variant="top" src={shek} />

                                <Card.Body>
                                <Card.Title>Shekinah Bless O. Galicia</Card.Title>

                                <Card.Text>
                                    <p>Bachelor of Science in Information Technology</p>
                                    <p>Technological University of the Philippines Taguig</p>
                                    <p>shekinahbless.galicia@tup.edu.ph</p>
                                </Card.Text>
                            </Card.Body>

                                
                            </Card>
                    </Row>
                </Col>
                
                <Col sm={3}>
                    <Row xs={1} md={1} className="g-4">
                        <Card className="p-3">
                            <Card.Img variant="top" src={vince} />

                            <Card.Body>
                                    <Card.Title>Vince Michael M. Lingon</Card.Title>

                                    <Card.Text>
                                        <p>Bachelor of Science in Information Technology</p>
                                        <p>Technological University of the Philippines Taguig</p>
                                        <p>vincemichael.lingon@tup.edu.ph</p>
                                    </Card.Text>
                                </Card.Body>

                        </Card>
                    </Row>
                </Col>

                <Col sm={3}>
                    <Row xs={1} md={1} className="g-4">
                        <Card className="p-3">
                            <Card.Img variant="top" src={rods} />

                            <Card.Body>
                                <Card.Title>Rodralyn D. Lopez</Card.Title>

                                <Card.Text>
                                    <p>Bachelor of Science in Information Technology</p>
                                    <p>Technological University of the Philippines Taguig</p>
                                    <p>rodralyn.lopez@tup.edu.ph</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
{/* 
                <Col sm={4} className='border-left'>

                </Col> */}
            </Row>
            </Container>
        </div>
    );
}

export default Contact;