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
                The Online Archiving Thesis System (OATS) is a website that has a catalog of all the theses of graduated students from the Technological 
                University of the Philippines Taguig (TUP-Taguig). The website will provide the title and the abstract of the study for guest users. If 
                guest users want to access the full copy of the research, they will have to register on the website and make a payment for the thesis they 
                want to access through a GCash API that is integrated in the website. If you are a TUP-Taguig student, you only have to register and you will 
                be able to access the full text of the research that is created by similar or related courses and you can view it on the website or by 
                downloading a PDF copy of the research. Only students of similar or related courses can view the full copy. The system will also have a 
                copy-paste citation feature for users to conveniently use to cite in the study. It will be available in APA, IEEE, and MLA. Additionally, the 
                website is going to oversee the borrowing and returning logs of the physical copy of the theses in their respective technology.
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