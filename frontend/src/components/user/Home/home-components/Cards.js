import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import {Container, Row, Col} from 'react-bootstrap'

const Cards = ({ cards, title}) => {
    return ( 
        <div className="cards">
            <h1>
                {title}
            </h1>
            <Container className="m-7">
            <Row> 
            {cards.map(card => ( 
                <Col className="my-2"> 
                <div className="card" key={card.id}>
                    <h2>{ card.title }</h2>
                    <label>
                        {card.body}
                    </label>
                    <p>{ card.author }</p>
                    <a href="/">Read More <BsFillArrowRightCircleFill size={20}/></a>
                </div> 
                </Col> 
                ))}
            </Row>
            </Container>  
        </div>
    );
}

export default Cards;