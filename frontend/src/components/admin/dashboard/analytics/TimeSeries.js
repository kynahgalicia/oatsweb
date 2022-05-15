import React from "react";
import "chartjs-adapter-moment";
import { Line, Chart } from "react-chartjs-2";
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



const TimeSeries = ({dataLog,time, title, legend, color}) => {

    var d = new Date();
    if(time === 'week'){
        d.setDate(d.getDate()-7)
    }
    if(time === 'month'){
        d.setDate(d.getDate()-30)
    }
    if(time === 'year'){
        d.setDate(d.getDate()-365)
    }
    if(time === 'day'){
        d = false
    }
    
    const options = {
        response: true,
        scales: {
            x: {
            type: "time",
            time: {
                unit: time
            },
            min: d ,
            max: Date.now(),
            },
            y:{
                min: 0
            }
        }
    };
    
    const setLineData = () => {
        const values = []
        
        const data = {
            datasets: [
                {
                data: values,
                label: legend,
                backgroundColor: color,
                borderColor: color,
                }
            ]
        };

        dataLog && dataLog.forEach(views => {
            values.push( {x: views._id , y : views.count})
        })

        console.log(values)
            return data;
    }
    
    return (
        <>
        <div  >
            <h4 style= {{color: '#636059'}} >{title}</h4>
            <Line options={options} data={setLineData()} />;
            </div>
        </>
    );
}

export default TimeSeries;
