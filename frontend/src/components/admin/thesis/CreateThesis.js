import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Form, FloatingLabel, Row, Col, Container, Button, TextField} from 'react-bootstrap'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Tesseract from 'tesseract.js';
import AdminSidebar from '../../layout/AdminSidebar'

import FileBase64 from 'react-file-base64';
import  {newThesis,getThesisDetails} from '../../../redux/actions/thesisActions'
import {getDepartment} from '../../../redux/actions/departmentActions'
import {getCourse} from '../../../redux/actions/courseActions'

const CreateThesis = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();
    
    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };
    
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };

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
    const [thisCourse, setCourse] = useState('')

    //UPLOAD PDF
    const [upload, setUploadFile] = useState('');
    const [uploads, setUploadFiles] = useState([]);

    const [test,setTest] = useState([])

    //multiple input fields
    const [authors, setAuthors] = useState([
        {author: ''}
    ])

    //keywords
    const [tags, setTags] = useState([])

    useEffect(() => {

        dispatch(getDepartment())
        if(thisDepartment){
            dispatch(getCourse(thisDepartment))
            console.log(thisDepartment)
        }

        // const fetchData = async () => {
        //     const result = await getThesisDetails();
        //     console.log('fetch data;m', result)
        //     setUploadFiles(result)
        // }
        //     fetchData()
        
        }, [dispatch,alert,history, thisDepartment])

    // Scan to text convert
    const handleSubmit = () => {
        // setIsLoading(true);
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
                // setIsLoading(false);
            });
    };

    // Author Textbox
    const handleChangeInput = (index, event) => {
        const values = [...authors]
        values[index][event.target.name] = event.target.value
        setAuthors(values)
    }

    //Form Submit
    const handleFormSubmit  = (e) => {
        e.preventDefault()
        // const result = newThesis(upload);
        // setUploadFiles({...uploads,result});
        let thisAuthors = []
        authors.map((author1) => (                            
            thisAuthors.push(author1.author)
                
        ))
        const formData = new FormData();
        formData.set("title", title)
        formData.set("publishedAt", publishedAt)
        formData.set("abstract", abstract)
        formData.set("departments", thisDepartment)
        formData.set("courses", thisCourse)
        formData.set("upload", upload)
        tags.forEach(keyword => {
            formData.append('thisKey',keyword)
            
        });
        
        thisAuthors.forEach(authors =>{
            formData.append('thisAuthors', authors)
        })

        dispatch(newThesis(formData))



        // console.log(thisKeyword)
        // console.log(authors)
        // console.log(tags)
        // console.log("title:", title)
        // console.log("publishedAt:", publishedAt)
        // console.log("abstract:", abstract)
        // console.log("departments:", thisDepartment)
        // console.log("courses:", thisCourse)
        // console.log("InputFields", authors) 
        // console.log("Keywords", tags)
        // console.log("PDF", upload)
    }

    // Add Author
    const handleAddFields = () => {
        setAuthors([...authors, {author: ''}])
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

    // const uploadFile = async (e) => {
        
    //     e.preventDefault();
    //     const result = await newThesis(upload);
    //     setUploadFiles([...uploads,result]);
    //     // const file = e.target.files[0];
    //     // const base64 = await convertBase64(file);
        
    //     // setBaseImage(base64);
    // }



    return(
        <Fragment>
            <Row>
                <Col sm={2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col>

                <Col sm={10}>
                    <Container>
                    <div className="admin-wrapper">
                        <div className="form-admin-wrapper-two text-start">
                            <div className="wrapper my-5">
                                <Row>
                                    <h1>Create Thesis</h1>
                                    <Col sm={6}>
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
                                                                name="author"
                                                                label="author"
                                                                value={inputField.author}
                                                                className="d-inline w-75 my-2"
                                                                onChange={event => handleChangeInput(index, event)}
                                                            />

                                                            <Button 
                                                                variant ="outline" 
                                                                className='mx-2'
                                                                onClick={() => handleAddFields()}
                                                            >
                                                                <i class="fas fa-plus"></i>
                                                            </Button>
                                                                
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
                                            <Form.Group className="mb-3">
                                                <Form.Label>Department</Form.Label><br/>
                                                <Form.Select id="department_field" placeholder="" className="d-inline w-75 my-2"  value={thisDepartment} onChange={(e) => setDepartment(e.target.value)}>
                                                <option> -- SELECT Department --</option>
                                                
                                                {/* value={thisDepartment} onChange={(e) => setDepartment(e.target.value)} */}

                                                    { department && department.map((departments) => (
                                                                
                                                            <option value={departments._id}>{departments.deptname}</option>
                                                                
                                                        ))}
                                                </Form.Select>
                                            </Form.Group>

                                            {/* Course Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Course</Form.Label><br/>
                                                <Form.Select id="department_field" placeholder="" className="d-inline w-75 my-2" value={thisCourse} onChange={(e) => setCourse(e.target.value)}>
                                                <option> -- SELECT Course --</option>

                                                {/* value={thisCourse} onChange={(e) => setCourse(e.target.value)} */}

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
                                                        placeholder='Press enter to add keywords'
                                                        onKeyUp={e => e.key == "Enter" ? addTags(e): null}
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
                                                <pre>{JSON.stringify(upload, null, '\t')}</pre>
                                                    <form action="" onSubmit={handleFormSubmit}> 
                                                    <FileBase64
                                                        type="file"
                                                        multiple={false}
                                                        onDone={({ base64 }) => setUploadFile(base64)}
                                                    />
                                                </form>
                                            </div>

                                            {/* <input
                                                type="file"
                                                onChange={(e) =>
                                                setImage(URL.createObjectURL(e.target.files[0]))
                                                }
                                                className="form-control w-75 my-1"
                                            /> */}

                                            <Button 
                                                className='my-3'
                                                variant="primary" 
                                                type="submit"
                                                oonClick={handleFormSubmit}
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    </Col>

                                    <Col sm={6}>
                                        <h3>Scan to text</h3>

                                        <p>
                                            Disclaimer:
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
                                                placeholder="Leave a comment here"
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

export default CreateThesis