import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({dataLog, title }) => {
       
    const setPieData = () => {
        var dataContent = []
        var customLabels = []

        const pieData = {
            labels: customLabels,
            datasets: [
                {
                    label: '# of Votes',
                    data: dataContent,
                    backgroundColor: [
                        '#ff6464',
                        '#ce4559',
                        '#9d2a4a',
                        '#851d41',
                        '#d9534f',
                    ],
                    borderColor: [
                        '#ff6464',
                        '#ce4559',
                        '#9d2a4a',
                        '#851d41',
                        '#d9534f',
                        
                    ],
                    borderWidth: 1,
                },
            ],
        }

        dataLog && dataLog.forEach(views => {
            dataContent.push(views.count)
            customLabels.push(views._id)
        })


        return pieData;
    }
        
    return (
        <div>
            <h4 style= {{color: '#636059'}} > {title}</h4>
            <Pie  data={setPieData()} />
        </div>
    );
}

export default PieChart;