
import React from 'react'
import "chartjs-adapter-moment";
import { Chart, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2';
// import {fetchViewLog} from '../../../../redux/actions/loggingActions'

Chart.register(...registerables)



const TimeSeriesBar = ({dataLog,time, title, legend}) => {

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
        responsive: true,
    plugins: {
        title: {
        display: false
        }
    },
    scales: {
        x: {
        type: "time",
        time: {
            unit: time
        },
        min: d ,
        max: Date.now(),
        }
    }
    };

    const setBarData = () => {

        
        const values = [{
            x: '2021-11-06',
            y: 10
        },];
        const barData = {
            datasets: [
                {
                label: legend,
                data: values,
                backgroundColor:'#d9534f',
                borderColor: '#d9534f',
                borderWidth: 2,
                hoverBackgroundColor: 'rgb(255, 102,  102)',
                hoverBorderColor: 'rgb(153, 38, 38)',
            },
            ]

        }
        
        dataLog && dataLog.forEach(views => {
            values.push( {x: views._id , y : views.count})
        })
            return barData;

}


    return (
        <>
        <div  >
            <h4 style= {{color: '#636059'}} >{title}</h4>
            <Bar options= {options} data={setBarData()} />
            </div>
        </>
    );
}

export default TimeSeriesBar;