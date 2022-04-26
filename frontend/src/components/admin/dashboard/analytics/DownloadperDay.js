
import { Chart, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables)

const DownloadperDay = () => {


    const customLabels = ['January','February', 'March', 'April','May','June','July'];
    const data = [3,4,10,12,7,5,9];

      const barData = {
        labels: customLabels,
        datasets: [
          {
            label: "Number of Downloads",
            data: data,
            backgroundColor: 'rgb(153, 38,38)',
            borderColor: 'rgb(255, 128, 128)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgb(255, 102,  102)',
            hoverBorderColor: 'rgb(153, 38, 38)',
          },
        ]
      };
  
    return (
      <>
        <div  >
        <h4 style= {{color: '#636059'}} > Downloads per Day</h4>
          <Bar data={barData} />
        </div>
      </>
    );
}
 
export default DownloadperDay;