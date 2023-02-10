import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

export default function CustomHorizontalBarChart({title,dataset,labels}) {
  const options = {
    responsive: true,
    //maintainAspectRatio: false,
    indexAxis: 'y', 
    layout: {
      padding: 0
    },
    scales: {
      x: 
        {
          display:false,
          position:'right',
          ticks: {
              
            font: {
              
              size: 14,
              weight:'bold',
              family: 'Gotham'

          }
          
        },
          grid: {
            display: false,
            borderColor: 'transparent'
          },
         
        }
      ,
      y: 
        {
          
          display:true,
          // stacked: true,
          ticks: {
           
            padding:2,
            mirror: true,
            z:10,
            color:'white',
            font: {
          
              size: 14,
              weight:'bold',
              family: 'Gotham'
          }
        },
          grid: {
            display: false,
            borderColor: 'transparent'
          },
          
        },
    },
    plugins: {
      tooltip: {
        callbacks: {  
          label: (context) => {
            return context.dataset.data[context.dataIndex] + context.dataset.labelSuffix
          }
        }
      },
      legend: {
          display:false,
          labels: {
              display:false,
              font: {
                  size: 16,
                  family: 'Gotham'
              }
          }
      },

        datalabels: {
           display: true,
           color: 'black',
           anchor:'end', 
           align:'start',
           clamp:true,
           font: {
            size: 14,
            family: 'Gotham',
            weight:'bold'
        }
        },
    
    
  },
  }
    const data = {
        labels,
        datasets: [
          {
            labels:labels,
            data: dataset,
            borderRadius: 20,
            borderSkipped:false,
          
            borderColor: 'rgba(0, 0, 0, 0)',
            maxBarThickness: 50,
            barPercentage: 0.95,
            categoryPercentage: 0.95,
            labelSuffix: "  ads",
           /* showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",*/
            ticks: {
              min: 0,
            },
            backgroundColor:['#8675FF','#8675FF','#FF9065','#FF9065','#FFCB41','#5eff5a']
          },
         
        ],
      };
     
  return(
       
  <>      
    <div style={{width:"100%"}} className="BarChart" >
              <h6 >{title}</h6>  
              <Bar options={options} data={data} style={{width:"100%", margin:'0px'}} />
    </div>
  </>)
  
}

//  
