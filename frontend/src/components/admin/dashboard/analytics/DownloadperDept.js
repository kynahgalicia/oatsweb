import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DownloadperDept = () => {
  const data = {
    labels: ['Civil & Allied', 'Electrical & Allied', 'Mechanical & Allied','Basic Arts & Sciences', 'Bachelor of Engineering'],
    datasets: [
  {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2],
    backgroundColor: [
      'rgb(255, 179, 179)',
      'rgb(102, 26, 0)',
      'rgb(255, 102, 102)',
      'rgb(217, 217, 217)',
      'rgb(236, 198, 198)',
    ],
    borderColor: [
      'rgb(255, 230, 230)',
      'rgb(255, 230, 230)',
      'rgb(255, 230, 230)',
      'rgb(255, 230, 230)',
      'rgb(255, 230, 230)',
      
    ],
    borderWidth: 1,
  },
],
};
      
      return (
        <div >
        <h4 style= {{color: '#636059'}} > Downloads per Department</h4>
        <Pie data={data} 
  
        />
      </div>
      );
}
 
export default DownloadperDept;