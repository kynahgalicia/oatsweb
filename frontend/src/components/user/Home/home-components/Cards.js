import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const Cards = ({ cards, title}) => {

    const {subType, isLoggedIn} = useSelector(state => state.authUser)
    const {subTypeGuest, isLoggedInGuest} = useSelector(state => state.authGuest)

    useEffect(() => {

    }, [subType, subTypeGuest, isLoggedIn, isLoggedInGuest])
    
    return ( 
        <div className="home-cards">
            <h1>
                {title}
            </h1>
            <Container className="m-7">
            <Row> 
            {cards && cards.map(card => ( 
                <Col className="my-2"> 
                <div className="home-card" key={card.id}>
                    <Link to="/"><h5>{ card.title }</h5></Link>

                    {card.authors.map((author) =>(
                        <label className='d-inline'>{author.fname.charAt(0)}. {author.lname} ;</label>

                    ))}
                    
                    {(subType && subType.status === 'Active')  || (subTypeGuest && subTypeGuest.status === 'Active')  ? <Link className='d-block' to={`/thesis/${card._id}`} >Read More <BsFillArrowRightCircleFill size={20}/></Link> : null}
                    {!subType  && !subTypeGuest ? <Link className='d-block' to="#" >Read More <BsFillArrowRightCircleFill size={20}/></Link> : null}
                    
                </div> 
                </Col> 
                ))}
            </Row>
            </Container>  
        </div>
    );
}

export default Cards;