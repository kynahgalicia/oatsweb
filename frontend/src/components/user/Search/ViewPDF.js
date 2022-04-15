import React, {useEffect, useState} from 'react'

import {Link, useParams, useHistory} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'

import { getThesisDetails, clearErrors } from '../../../redux/actions/thesisActions'

// Import the main component
import { Viewer, Worker} from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const ViewPDF = () => {

    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()
    
    const pdfContentType = 'application/pdf';

    const [thisPDF,setThisPDF] = useState('')
    const [viewPDF,setPDF] = useState('')

    
    const {loading, error, thesis } = useSelector(state => state.thesisDetails);

    useEffect(() => {
    
    return () => {
    
    }
    }, [])
    
    let {thesisId} = useParams()
    useEffect(() => {
        
        if(thesis && thesis._id !== thesisId){
            dispatch(getThesisDetails(thesisId))
        } else {
            setThisPDF(thesis.upload)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


        const url = URL.createObjectURL(baseConvert(thisPDF));
        setPDF(url)
        console.log(viewPDF)
        
    }, [dispatch, alert, error ,thesisId, thesis, thisPDF]);

    const baseConvert = (thisPDF) => {
        
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = thisPDF.substr(`data:${pdfContentType};base64,`.length);

        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);

        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }

        return new Blob([out], { type: pdfContentType });
    }

    return(

        <div className="wrapper">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                    <Viewer fileUrl={viewPDF}
                        plugins={[defaultLayoutPluginInstance]}
                        defaultScale={1}
                        isCompressed= {true} />
                </Worker>
        </div>
    )
}

export default ViewPDF;