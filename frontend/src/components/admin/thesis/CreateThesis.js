import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Form, FloatingLabel, Row, Col, Container, Button} from 'react-bootstrap'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Tesseract from 'tesseract.js';

const CreateThesis = () => {
    // const [baseImage, setBaseImage] = useState("");

    // const uploadImage = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertBase64(file);
        
    //     setBaseImage(base64);
    // };

    
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

    // const [isLoading, setIsLoading] = React.useState(false);
    const [image, setImage] = React.useState('');
    const [text, setText] = React.useState('');
    const [progress, setProgress] = React.useState(0);

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

    return(
        <Fragment>
            <div className='createthesis'>
                <div className="wrapper my-5">
                    <Container>
                        <Row>
                            <h1>Create Thesis</h1>

                            <Col>
                                <p>pepe</p>
                            </Col>

                            <Col>
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

                                <progress className="form-control" value={progress} max="100">
                                    {progress}%{' '}
                                </progress>{' '}

                                <p className="text-center py-0 my-0">Converting:- {progress} %</p>

                                <input
                                    type="file"
                                    onChange={(e) =>
                                    setImage(URL.createObjectURL(e.target.files[0]))
                                    }
                                    className="form-control mt-5 mb-2"
                                />

                                <input
                                    type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-primary mt-5"
                                    value="Convert"
                                />

                                {/* <img src={baseImage} height="200px" /> */}
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
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateThesis