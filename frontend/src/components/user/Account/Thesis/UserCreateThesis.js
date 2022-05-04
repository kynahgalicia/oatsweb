import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Form, FloatingLabel, Row, Col, Container, Button} from 'react-bootstrap'
import { showErrMsg} from '../../../utils/Notification';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Tesseract from 'tesseract.js';
import FileBase64 from 'react-file-base64';
import  {newThesis, clearErrors} from '../../../../redux/actions/thesisActions'
import {getDepartment} from '../../../../redux/actions/departmentActions'
import {getCourse} from '../../../../redux/actions/courseActions'
import { NEW_THESIS_RESET } from '../../../../redux/constants/thesisConstants'

import UserSidebar from '../../../layout/UserSidebar'

const UserCreateThesis = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, error, success } = useSelector(state => state.newThesis);
    const { user } = useSelector(state => state.authUser);

    //Dropdown Data
    const {department} = useSelector(state => state.department)
    const {course} = useSelector(state => state.courses)

    //Scan to text declaration
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [progress, setProgress] = useState(0);

    
    // Thesis Details
    const [title, setTitle] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [abstract, setAbstract] = useState('')
    const [thisDepartment, setDepartment] = useState('')
    const [nameDepartment, setNameDepartment] = useState('')
    const [thisCourse, setCourse] = useState('')

    //UPLOAD PDF
    const [upload, setUploadFile] = useState('')

    //multiple input fields
    const [authors, setAuthors] = useState([
        {fname: '', lname:''}
    ])

    //keywords
    const [tags, setTags] = useState([])

    useEffect(() => {

        
        if (success) {
            history.push('/user/thesis');
            alert.success('thesis created successfully');
            dispatch({ type: NEW_THESIS_RESET })
        }

        if(user){
            setDepartment(user.user_department.departments)
            setNameDepartment(user.user_department.deptname)
        }

        dispatch(getDepartment())

        if(thisDepartment){
            dispatch(getCourse(thisDepartment))
            
        }


        }, [dispatch, alert, error, success, history, thisDepartment])

    // Scan to text convert
    const handleSubmit = () => {
        Tesseract.recognize(image, 'eng', {
            logger: (m) => {
                console.log(m);
                if (m.status === 'recognizing text') {
                    setProgress(parseInt(m.progress * 100));
                }
            },
        })
            .catch((err) => {
                console.error(err);
            })
            .then((result) => {
                console.log(result.data.text);
                setText(result.data.text);
            });
    };

    // Author Textbox
    const handleChangeInput = (index, event) => {
        const values = [...authors]
        values[index][event.target.name] = event.target.value
        setAuthors(values)

        // let nAuthor = event.target.value
        // let arr = authors.concat(nAuthor)
    } 

    //Form Submit
    const handleFormSubmit  = (e) => {
        e.preventDefault()
        // setUploadFiles({...uploads,result});
        const formData = new FormData();
        formData.set("title", title)
        formData.set("publishedAt", publishedAt)
        formData.set("abstract", abstract)
        formData.set("departments", thisDepartment)
        formData.set("courses", thisCourse)
        formData.set("upload", upload)
        formData.set("role", "student")
        formData.set("uploadedId", user._id)


        tags.forEach(keyword => {
            formData.append('thisKey',keyword)
        });

        formData.append('thisAuthors', JSON.stringify(authors))

        dispatch(newThesis(formData))

        // console.log(thisKeyword)
        // console.log(thisAuthors)
        // console.log(authors)
        // console.log(tags)
        // console.log("title:", title)
        // console.log("publishedAt:", publishedAt)
        // console.log("abstract:", abstract)
        // console.log("departments:", thisDepartment)
        // console.log("courses:", thisCourse)
        // console.log("authors", thisAuthors) 
        // console.log("Keywords", tags)
        // console.log("PDF", upload)
    }

    // Add Author
    const handleAddFields = () => {
        setAuthors([...authors, {fname: '', lname:''}])
    }

    // Remove Author
    const handleRemoveFields = (index) => {
        const values = [...authors]
        if(index !== 0){
            values.splice(index, 1)
            setAuthors(values)
        }
        else{
            
        }
    }

    //Keyword add tags
    const addTags = event => {
        if(event.target.value !== ""){
            setTags([...tags, event.target.value])
            event.target.value = ""
        }
    }

    //Keyword remove tags
    const removeTags = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove))
    }

    return(
        <Fragment>
            <Row>
            <Col sm= {2} className="admin-sidebar">
                        <UserSidebar/>
                    </Col>  

                <Col sm={10}> 
                    <Container>
                    <div className="admin-wrapper ">
                        <div className="form-admin-wrapper-two text-start">
                            <div className="wrapper my-5">
                                <Row>
                                    <h1>Create Thesis</h1>
                                    <Col sm={6} className='pr-5'>

                                        
                                        <Form action="" onSubmit={handleFormSubmit}>

                                            {/* Title Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    className='w-75 my-1'
                                                    type="title"
                                                    id="inputTitle"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </Form.Group>

                                            {/* Year Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Year Published</Form.Label>
                                                <Form.Control
                                                    className='w-75 my-1'
                                                    type="year"
                                                    id="inputYear"
                                                    aria-describedby="year"
                                                    value={publishedAt}
                                                    onChange={(e) => setPublishedAt(e.target.value)}
                                                />
                                                <Form.Text id="year" muted>
                                                    Only input the year the thesis was published.
                                                </Form.Text>
                                            </Form.Group>

                                            {/* Author Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Author/s</Form.Label>
                                                <div className='d-inline'>
                                                    {authors.map((inputField, index) => (
                                                        <div key={index}>
                                                            <Form.Control
                                                                name="fname"
                                                                label="fname"
                                                                placeholder='First Name'
                                                                value={inputField.fname}
                                                                className="d-inline w-25 my-2"
                                                                onChange={event => handleChangeInput(index, event)}
                                                            />
                                                            <Form.Control
                                                                name="lname"
                                                                label="lname"
                                                                placeholder='Last Name'
                                                                value={inputField.lname}
                                                                className="d-inline w-25 m-2"
                                                                onChange={event => handleChangeInput(index, event)}
                                                            />

                                                            {/* Add Author Button */}
                                                            <Button 
                                                                variant ="outline" 
                                                                className='mx-2'
                                                                onClick={() => handleAddFields()}
                                                            >
                                                                <i class="fas fa-plus"></i>
                                                            </Button>
                                                            
                                                            {/* Remove Author Button */}
                                                            <Button 
                                                                variant ="outline"
                                                                onClick={() => handleRemoveFields(index)}
                                                            >
                                                                <i class="fas fa-minus"></i>
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Form.Text id="author" muted>
                                                    Input the full name of the author/s.
                                                </Form.Text>
                                            </Form.Group>

                                            {/* Department Input */}
                                            {/* <Form.Group className="mb-3">
                                                <Form.Label>Department</Form.Label><br/>
                                                <Form.Select id="department_field" placeholder="" className="d-inline w-75 my-2"  value={thisDepartment} onChange={(e) => setDepartment(e.target.value)}>
                                                <option> -- SELECT Department --</option>
                                                
                                                    { department && department.map((departments) => (
                                                                
                                                            <option value={departments._id}>{departments.deptname}</option>
                                                                
                                                        ))}
                                                </Form.Select>
                                            </Form.Group> */}

                                            <Form.Group className="mb-3">
                                                <Form.Label>Department</Form.Label>
                                                <Form.Control
                                                    className='w-75 my-1'
                                                    type="year"
                                                    id="inputYear"
                                                    aria-describedby="year"
                                                    value={nameDepartment}
                                                    disabled
                                                />
                                                <Form.Text id="year" muted>
                                                    Only input the year the thesis was published.
                                                </Form.Text>
                                            </Form.Group>

                                            {/* Course Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Course</Form.Label><br/>
                                                <Form.Select id="department_field" placeholder="" className="d-inline w-75 my-2" value={thisCourse} onChange={(e) => setCourse(e.target.value)}>
                                                <option> -- SELECT Course --</option>
                                                
                                                {thisDepartment && course && course.map((courses) => (
                                                
                                                                <option value={courses._id}>{courses.coursecode} ({courses.coursename})</option>
                                                                    
                                                ))}
                                                </Form.Select>
                                            </Form.Group>

                                            {/* Keywords Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Keyword/s</Form.Label>
                                                <div className='tags-input'>
                                                    <ul id="tags">
                                                        {tags.map((tag, index) => (
                                                            <li key={index} className="tag">
                                                                <span className='pr-2'>{tag}</span>
                                                                <i 
                                                                    class="fas fa-times-circle"
                                                                    onClick={() => removeTags(index)}
                                                                ></i>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    
                                                    <Form.Control
                                                        className='d-inline w-75 my-1 keywordInput'
                                                        type="text"
                                                        placeholder='Press space to add keywords'
                                                        onKeyUp={e => e.key == " " ? addTags(e): null}
                                                        // onChange={event => handleChangeInputKeywords(index, event)}
                                                    />
                                                </div>
                                            </Form.Group>

                                            {/* Abstract Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Abstract</Form.Label>
                                                <Form.Control
                                                    className='w-75 my-1'
                                                    as="textarea"
                                                    rows={15}
                                                    type="abstract"
                                                    id="inputAbstract"
                                                    aria-describedby="abstract"
                                                    value={abstract}
                                                    onChange={(e) => setAbstract(e.target.value)}
                                                />
                                            </Form.Group>

                                            {/* Upload PDF */}
                                            <Form.Label>Thesis PDF</Form.Label>
                                            
                                            <div className="container">
                                                <label><i>Note: Only PDF files below 500KB can be uploaded</i></label>
                                                {/* <pre>{JSON.stringify(upload, null, '\t')}</pre> */}
                                                    <form action="" onSubmit={handleFormSubmit}> 
                                                    <FileBase64
                                                        type="file"
                                                        multiple={false}
                                                        onDone={({ base64 }) => setUploadFile(base64)}
                                                    />
                                                </form>
                                            </div>
                                            <br />
                                            {error && showErrMsg(error)}
                                       
                                            <Button 
                                                className='my-3 success'
                                                variant="primary" 
                                                type="submit"
                                                onClick={handleFormSubmit}
                                                disabled={loading ? true : false}
                                            >
                                                Submit
                                            </Button>
                                            
                                        </Form>
                                    </Col>

                                    <Col sm={6}>
                                        <h3>Scan to text</h3>
                                        
                                        <p>
                                            Notes:
                                            <ul>
                                                <li>You are only allowed to upload image formats:</li>
                                                    <ul>
                                                        <li>.jpeg</li>
                                                        <li>.jpg</li>
                                                        <li>.gif</li>
                                                        <li>.webp</li>
                                                        <li>.png</li>
                                                    </ul>
                                                <li>Special characters are not recognized by the system.</li>
                                            </ul>
                                        </p>

                                        <input
                                            type="file"
                                            onChange={(e) =>
                                            setImage(URL.createObjectURL(e.target.files[0]))
                                            }
                                            className="form-control mt-5 mb-2"
                                        />
                                        <img src={image} width="660px"/>

                                        <progress className="form-control" value={progress} max="100">
                                            {progress}%{' '}
                                        </progress>{' '}

                                        <p className="text-center py-0 my-0">Converting:- {progress} %</p>

                                        <input
                                            type="button"
                                            onClick={handleSubmit}
                                            className="btn btn-primary mt-5"
                                            value="Convert"
                                        />
                                        <hr/>

                                        {/* Text Box */}
                                        <FloatingLabel controlId="floatingTextarea2" label="Result">
                                            <Form.Control
                                                id="teks" 
                                                name="teks" 
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                as="textarea"
                                                style={{ height: '200px' }}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                        
                    </Container>
                </Col>
            </Row>
        </Fragment>
    )
}

export default UserCreateThesis