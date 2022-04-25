
import React, { Fragment, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { Chart, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import {fetchViewLog} from '../../../../redux/actions/loggingActions'

Chart.register(...registerables)



const MostSearched = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const { viewsLog } = useSelector(state => state.viewLog)

    useEffect(() => {

                dispatch(fetchViewLog())

    }, [dispatch, history])
    
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
                label: "Views",
                data: dataContent,
                backgroundColor: 'rgb(153, 38,38)',
                borderColor: 'rgb(255, 128, 128)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgb(255, 102,  102)',
                hoverBorderColor: 'rgb(153, 38, 38)',
            },
            ]

        }

        viewsLog && viewsLog.forEach(views => {
            dataContent.push(views.count)

            let arr = views._id.split(' ')
            customLabels.push(arr)

        })
        // console.log(customLabels)
            return barData;

}


    return (
        <>
        <div  >
            <h4 style= {{color: '#636059'}} > Most Viewed Thesis</h4>
            <Bar options= {options} data={setBarData()} />
            </div>
        </>
    );
}

export default MostViewed;