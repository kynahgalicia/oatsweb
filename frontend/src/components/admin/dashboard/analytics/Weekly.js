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



const Weekly = () => {
    
    const options = {
        response: true,
        scales: {
            x: {
            type: "time",
            time: {
                unit: "month"
            }
            }
        }
    };
    
    const values = [
        {
            x: new Date("2020-01-01"),
            y: 100.2
        },
        {
            x: new Date("2020-01-02"),
            y: 102.2
        },
        {
            x: new Date("2020-01-03"),
            y: 105.3
        },
        {
            x: new Date("2020-01-11"),
            y: 104.4
        }
    ];
    
    const data = {
        datasets: [
            {
            data: values
            }
        ]
    };
    return (
        <>
        <Line options={options} data={data} />;
        </>
    );
}

export default Weekly;
