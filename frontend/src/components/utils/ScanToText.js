import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Form, FloatingLabel, Button, ProgressBar} from 'react-bootstrap'
import Tesseract from 'tesseract.js';
const ScanToText = () => {
    const history = useHistory();

    //Scan to text declaration
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [progress, setProgress] = useState(0);
    const [showPercent, setShowPercent] = useState(false)

    useEffect(() => {


    }, [history, image, text, progress, showPercent])

    // Scan to text convert
    const handleSubmit = () => {
        setShowPercent(true)
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

    return ( 
        <div>
                        <div className='back-button text-start px-3 py-2'>
                        <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                        </div>
                    <div className="scan-to-text">
                        <div className="scan-wrapper">
                                        <h2>Scan to text</h2>
                                        <br />
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
                                                <li>Image should be legible for accurate results</li>
                                            </ul>
                                        </p>
                                        
                                        <div className='preview'>
                                            { image ? <img src={image} alt='Convert Image'/> : null}
                                        </div>

                                        <div className="form-imageUP">
                                            <input
                                                type="file"
                                                onChange={(e) =>
                                                setImage(URL.createObjectURL(e.target.files[0]))
                                                }
                                                className="form-control mt-5"
                                            />
                                                <Button 
                                                    onClick={handleSubmit}
                                                    className={ !image ? "d-none" : "success mt-2 w-100"}
                                                    value="Convert"
                                                >
                                                    Convert
                                                </Button>
                                        

                                        
                                        
                                        <div className={showPercent ? 'mt-3' : 'd-none'}>

                                            <ProgressBar striped animated={progress === 100 ? false : true} className="progress-bar" variant="success" now={progress} label={`${progress}%`} />

                                        </div>
                                        </div>
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
                        </div>
                    </div>
    </div>
    );
}

export default ScanToText;