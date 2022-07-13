import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Doughnut } from 'react-chartjs-2'
import { showErrMsg } from './Notification'
import { getThesisPlagiarism, clearErrors } from '../../redux/actions/thesisActions'


const PlagiarismChecker = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert()

    const { loading, error, success, percentage } = useSelector(state => state.thesisPlagiarism);

    const [abstract, setAbstract] = useState('')
    const [showPercent, setShowPercent] = useState(0)
    const [textUnique, setTextUnique] = useState(0)
    useEffect(() => {

        // if (error) {
        //     alert.error(error);
        //     dispatch(clearErrors())
        // }

        if(success){
            setShowPercent(percentage)
            setTextUnique(100 - percentage)
            console.log(textUnique)
            console.log(showPercent)
        }
    }, [dispatch,alert, history, error, success,showPercent, textUnique])

    // Scan to text convert
    const handleSubmit = (e) => {

        e.preventDefault()
        const formData = new FormData();
        formData.set("input", abstract)

        dispatch(getThesisPlagiarism(formData))
        
    };

    const options = {
        legend: {
            display: true,
            position: "bottom",
            align: "center"
        }
    }

    const plugins = [{
            beforeDraw: function(chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
                ctx.restore();
                var fontSize = (height / 440).toFixed(2);
                ctx.font = fontSize + "strong sans-serif";
                ctx.textBaseline = "top";
                var text = percentage.toFixed(2) + "% Plagiarized",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
                ctx.fillStyle = '#FF6962';
                ctx.fillText(text, textX, textY);
                ctx.save();
            } 
      }]

    const setDonutData = () => {
        const donutData = {
            labels: [
            'Plagiarized',
            'Unique',        ],
        datasets: [{
            label: 'My First Dataset',
            data: [percentage,textUnique],
            backgroundColor: [
            '#FF6962',
            '#6cc16b',
            ],
            hoverOffset: 4
        }]
        };

        return donutData;
    }

    return ( 
        <div>
                        <div className='back-button text-start px-3 py-2'>
                        <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                        </div>
                    <div className="plagiarism-checker">

                    <h2>Abstract Plagiarism Checker</h2>
                    <Row>
                        <Col sm={8} >
                        <div className="plagiarism-text">
                       
                        <Form.Group className="mb-3 text-start">
                            <Form.Label>Check Abstract</Form.Label>
                            <Form.Control
                                className='p-1'
                                as="textarea"
                                rows={15}
                                type="abstract"
                                id="inputAbstract"
                                aria-describedby="abstract"
                                value={abstract}
                                onChange={(e) => setAbstract(e.target.value)}
                            />
                        </Form.Group>
                        {error && showErrMsg(error)}
                        <Button 
                            className='mb-3 mt-1 success w-100'
                            variant="info" 
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading ? true : false}
                        >
                            CHECK
                        </Button>
                        </div>

                        </Col>
                        <Col sm={4} className="border-col">

                        {loading ? <h5>Checking...</h5> :
                            (success ?
                            <div className="w-75 plagiarism-chart">
                            <Doughnut options={options} data={setDonutData() } plugins={plugins} />
                            </div>
                        : null)}
                        </Col>
                    </Row>
                        

                        </div>
    </div>
    );
}

export default PlagiarismChecker;