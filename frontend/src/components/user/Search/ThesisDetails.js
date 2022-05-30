import React, {useEffect, useState} from 'react'
import { Link as Link2} from "react-scroll"
import {Link as Link1, useParams, useHistory} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Button, Card, CardGroup, Form} from 'react-bootstrap'
import Loader from '../../utils/Loader'
import { getThesisDetails, clearErrors } from '../../../redux/actions/thesisActions'
import { studentBorrow} from '../../../redux/actions/borrowActions'
import {viewLog} from '../../../redux/actions/loggingActions'
import { STUDENT_BORROW_RESET } from '../../../redux/constants/borrowConstants'

const ThesisDetails = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    const [userDept, setUserDept] = useState('')
    const [id, setThisID] = useState('')
    const [title, setTitle] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [abstract, setAbstract] = useState('')
    const [keywords, setKeyword] = useState('')
    const [authors, setAuthor] = useState('')
    const [thisDepartment,setThisDepartment] = useState('')
    const [thisCourse,setThisCourse] = useState('')
    const [thesisID,setThesisID] = useState('')

    const {subType, user, isLoggedIn} = useSelector(state => state.authUser)
    const {subTypeGuest, isLoggedInGuest} = useSelector(state => state.authGuest)
    const {isLoggedInAdmin} = useSelector(state => state.authAdmin)
    const {loading, thesis, availBook } = useSelector(state => state.thesisDetails);
    const [format, setFormat] = useState('')
    const [copyFormat, setCopyFormat] = useState('')

    const {success, msg, error} = useSelector(state => state.newBorrow)
    let {thesisId} = useParams()
    useEffect(() => {
        
        if(thesis && thesis._id !== thesisId){

            const formData = new FormData();
            formData.set("thesis_id", thesisId)

            dispatch(getThesisDetails(thesisId))
            dispatch(viewLog(formData))
        } else {
            setTitle(thesis.title)
            setPublishedAt(thesis.publishedAt)
            setAbstract(thesis.abstract)
            setKeyword(thesis.keywords)
            setAuthor(thesis.authors)
            setThisDepartment(thesis.department)
            setThisCourse(thesis.course)
            setThisID(thesis._id)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(isLoggedIn){
            setUserDept(user.user_department.deptname)
        }

        if(success){
            alert.success('Your request has been sent!');
            dispatch({ type: STUDENT_BORROW_RESET })
        }
    }, [dispatch, alert, error ,thesisId, thesis, availBook, format, copyFormat,subType, subTypeGuest, success, msg, isLoggedIn, isLoggedInGuest, isLoggedInAdmin]);

    const handleChange = (e) => {
        var authString = ''
        var authFString = ''

        authors.map((x) => (
            authString = authString + x.lname + ', ' + x.fname.charAt(0) + '. '
        ))

        authors.map((x) => (
            authFString = authFString + x.fname.charAt(0) + '. ' + x.lname + ', '
        ))
        
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        
        const date = new Date()
        var  months =  monthNames[date.getMonth()]

        switch(e.target.value){
            case('IEEE'):
                console.log(e.target.value)
                setFormat(
                    '[1]     ' + authFString
                    + '"' + title + '," '
                    + publishedAt + '. [Online]. ' 
                    + 'Available: ' + window.location.origin + '/. '
                )

                setCopyFormat(
                    '[1]     ' + authFString + ', '
                    + '"' + title + '," '
                    + publishedAt + '. [Online]. ' 
                    + 'Available: ' + window.location.origin + '/. '
                )
                break;
            
            case('APA'):
                console.log(e.target.value)
                setFormat(
                    authString + '(' + publishedAt + '). ' 
                    + title + '. ' 
                    + 'Retrieved from OATS: '
                    + window.location.origin + '/'
                )

                setCopyFormat(
                    authString + '(' + publishedAt + '). ' 
                    + title + '. ' 
                    + 'Retrieved from OATS: '
                    + window.location.origin + '/'
                )
                break;
            
            case('MLA'):
                setFormat(
                    authors[0].lname 
                    + ', ' + authors[0].fname  
                    + ', et al. ' 
                    + title + '. '
                    + publishedAt + '. '
                    + window.location.origin + '/.'
                )

                setCopyFormat(
                    authors[0].lname 
                    + ', ' + authors[0].fname  
                    + ', et al. ' 
                    + title + '. '
                    + publishedAt + '. '
                    + window.location.origin + '/.'
                )
                console.log(e.target.value)
                break;
            default:
                return null
                break;
        }
    }   

    const userPayment = () => {
        
        history.push('/user/payment')
    }

    const borrowRequest = () => {
        
        const formData = new FormData();
        formData.set('user', user.user_tupid);
        formData.set('theses', id);

        dispatch(studentBorrow(formData))
    }

    

    return ( 
        <div className="wrapper">
            {loading ? <Loader /> : (
            <Row>
                <Col sm={9}>
                <div className='back-button text-start px-3 py-2'>
                            <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                        </div>
                    {/* Header */}
                    <div className="details-title text-start mx-5">
                        <h5 className="m-3">{title}</h5>
                        
                        <div className="m-3">
                            <label> Published: <Link1>{publishedAt}</Link1> | Department:<Link1> {thisDepartment.deptname}</Link1> | Course: <Link1>{thisCourse.coursecode}</Link1> 
                            </label>
                        </div>
                        <div className='details-button'>
                        
                        { userDept && userDept !== thisDepartment.deptname ? 
                                <> 
                                <Link1 to={!subType || (subType && subType.status !== "Active") ? '#' : `/view/${id}`} className='m-1' > 
                                    <Button  data-placement="bottom" title="Download PDF" data-target={!subType || (subType && subType.status === "Pending") ? '#subscriptionModal' : null} data-toggle="modal" >
                                        <i className="fas fa-file-pdf"></i> PDF
                                        {!subType || (subType && subType.status !== "Active") ? <i className="fas fa-lock mx-1"></i> : null}
                                    </Button>
                                </Link1>
                                </>
                                :
                                null
                        }
                        { userDept && userDept === thisDepartment.deptname ? 
                                <> 
                                <Link1 to={`/view/${id}`} className='m-1'> 
                                    <Button data-toggle="tooltip" data-placement="bottom" title="Download PDF">
                                        <i className="fas fa-file-pdf"></i> PDF
                                    </Button>
                                </Link1>
                                </>
                                :
                                null
                        }
                        { isLoggedInGuest ? 
                                <> 
                                <Link1 to= {`/view/${id}`} className='m-1' > 
                                    <Button  data-placement="bottom" title="Download PDF"  >
                                        <i className="fas fa-file-pdf"></i> PDF
                                    </Button>
                                </Link1>
                                </>
                                :
                                null
                        }
                        { isLoggedInAdmin ? 
                            <> 
                            <Link1 to= {`/view/${id}`} className='m-1' > 
                                <Button  data-placement="bottom" title="Download PDF"  >
                                    <i className="fas fa-file-pdf"></i> PDF
                                </Button>
                            </Link1>
                            </>
                            :
                            null
                        }

                            <Button data-toggle="tooltip" data-placement="bottom" title="Citation Tool">
                                <Link1 data-toggle="modal"  data-target={"#citationModal"}><i class="fas fa-pen-nib"></i> Citation Tool  </Link1>
                            </Button>

                            { isLoggedIn ? <Button data-toggle="tooltip" data-placement="bottom" title={ availBook? "Request to borrow the physical book" : "Book is Unavailable" } disabled={ availBook ? false : true}
                                className={ availBook ? 'm-1' : 'm-1 grey'} onClick={() => borrowRequest()}> 
                                <i class="fas fa-book"></i> { availBook ? 'Borrow Book' : 'Unavailable'}
                            </Button> : null}
                        </div>
                    </div>
            
            
                    <Row>
                        {/* Sidebar */}
                        <Col sm={3}>
                            <ul className="list-group p-5">
                            <li className="list-group-item">
                                <Link2
                                    activeClass="active"
                                    to="abstract"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    Abstract
                                </Link2>
                                </li>
                                <li className="list-group-item">
                                <Link2
                                    activeClass="active"
                                    to="authors"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                Authors
                                </Link2>
                                </li>
                                <li className="list-group-item">
                                <Link2
                                    activeClass="active"
                                    to="keywords"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    Keywords
                                </Link2>
                                </li>
                            
                            </ul>
                        </Col>

                        {/* Body */}
                        <Col sm={9}>
                            {/* Abstract */}
                            <div className="text-start m-1 my-5 abstract">
                                <h5 id="abstract">Abstract</h5>
                                <p className="text-justify">{abstract}</p>
                            </div>

                            {/* Subscription Modal */}
                            <div className="modal fade" id="subscriptionModal" aria-hidden="true" data-backdrop="false">
                                <div className="modal-dialog modal-dialog-centered modal-dialog modal-lg">
                                    <div className="modal-content subscription">
                                        {/* <div className="modal-header">
                                            <h5 className="modal-title">OATS Thesis Archive Subscription</h5>
                                            
                                            
                                        </div> */}
                                        <button type="button" class="close text-right" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                        <div className="sub-card-pdf" id="subscriptionModal" aria-hidden="true">
                                            <h5>Subscribe for full access of the text! <br/>Check out the plans available below.</h5>
                                            <br/>
                                            <Card className= "sub-card-pdf text-start">
                                                <Card.Header> <h1 className="text-start">₱50/day</h1></Card.Header>

                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                            <p>Access all of the thesis titles available for 1 day.</p>
                                                        </Col>

                                                        <Col>
                                                            <ul >
                                                                <li><i class="fas fa-check"></i> View Full Text</li>
                                                                <li><i class="fas fa-check"></i> Download Full PDF</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                    <Link1 to={`/user/subscription`}><Button>Subscribe</Button></Link1>
                                                </Card.Body>
                                            </Card>

                                            <Card className= "sub-card-pdf text-start">
                                                <Card.Header><h1 className="text-start">₱325/week</h1></Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                        <p>
                                                        Open access to ALL archived research in OATS for 7 days
                                                        </p>
                                                        </Col>
                                                        <Col>
                                                        <ul >
                                                        <li><i class="fas fa-check"></i> View Full Text</li>
                                                        <li><i class="fas fa-check"></i> Download Full PDF</li>
                                                        </ul>
                                                        </Col>
                                                        <Link1 to={`/user/subscription`}><Button>Subscribe</Button></Link1>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            {/* Accordion */}
                            <div className='p-3'>
                                <div className="user-accordion accordion" id="accordionExample">
                                    <div className="card">
                                        <div className="card-header" id="headingOne">
                                            <h2 className="mb-0">
                                                <button id="authors" className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Authors
                                                </button>
                                            </h2>
                                        </div>

                                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div className="card-body text-start">
                                                { authors && authors.map((x) => (
                                                    <li>{x.fname} {x.lname}</li>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header" id="headingTwo">
                                            <h2 className="mb-0">
                                                <button id="keywords" className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Keywords
                                                </button> 
                                            </h2>
                                        </div>

                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div className="card-body text-start">
                                                { keywords && keywords.map((x) => (
                                                    <li>{x.keyword}</li>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col sm={2}>
                    {/* Citation Tool Modal*/}
                    <div className="modal fade" id="citationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Citation Generator Tool</h5>
                                    
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body text-start">
                                    <Form.Group className="mb-2">
                                        <Form.Select id="format_field" onChange={handleChange}>
                                            <option> Select a format </option>
                                            <option> IEEE</option>
                                            <option> APA</option>
                                            <option> MLA</option>
                                        </Form.Select>
                                        <div className="citation">
                                        { format !== '' ? <Button className="float-right" variant="light"  data-toggle="tooltip" data-placement="bottom" title="Copy to Clipboard" 
                                            onClick={() =>  navigator.clipboard.writeText( copyFormat )}
                                            >
                                            <i class="fas fa-copy"></i>
                                        </Button>   :null } 
                                        <div dangerouslySetInnerHTML={{ __html: format }} >
                                        </div>
                                        </div>


                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

    
            )}
            
        </div>
        
    );
}

export default ThesisDetails;