
import React from 'react'
import { Chart, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2';
// import {fetchViewLog} from '../../../../redux/actions/loggingActions'

Chart.register(...registerables)



const BarGraph = ({dataLog, title , legend, color}) => {
    
    const options = {
        responsive: true,
    plugins: {
        title: {
        display: false
        },
        tooltip:{
            callbacks: {
                title: (context) => {
                    return context[0].label.replaceAll(',',' ')
                }
            }
        }
    },
    scales: {
        x: {
            ticks: {
                maxRotation: 0,
                minRotation: 0
            }
        }
    }
    };

    const setBarData = () => {

        var dataContent = []
        var customLabels = []
        const barData = {
            labels: customLabels,
            datasets: [
                {
                label: legend,
                data: dataContent,
                backgroundColor: color,
                borderColor: '#F2F1F0',
                borderWidth: 2,
                hoverBackgroundColor: 'rgb(255, 102,  102)',
                hoverBorderColor: 'rgb(153, 38, 38)',
            },
            ]

        }
        
            dataLog && dataLog.forEach(views => {
            dataContent.push(views.count)

            let arr = views._id.split(' ')
            customLabels.push(arr)
        })
        console.log(legend)
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

export default BarGraph;