import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const Cards = ({ cards, title}) => {
    return ( 
        <div className="home-cards">
            <h1>
                {title}
            </h1>
            <Container className="m-7">
            <Row> 
            {cards.map(card => ( 
                <Col className="my-2"> 
                <div className="home-card" key={card.id}>
                    <Link to="/"><h5>{ card.title }</h5></Link>
                    <label>
                        {card.author}
                    </label>
                    <Link to="/">Read More <BsFillArrowRightCircleFill size={20}/></Link>
                </div> 
                </Col> 
                ))}
            </Row>
            </Container>  
        </div>
    );
}

export default Cards;