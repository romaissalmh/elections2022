import React from 'react';
import { Card,CardTitle, CardBody,Col } from "reactstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const options = {
  responsive: true,
  //maintainAspectRatio:false,

  layout: {
    padding: 0
  },
  plugins: {
   
    legend: {
      display: false,
      position: 'top',
    
    },
    title: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
      backgroundColor: 'red',
    },
    line: {
      tension: 0.1, 
      borderWidth: 4,
      borderColor: 'red',
      backgroundColor: 'transparent',
      borderCapStyle: "rounded"
    },
    rectangle: {
      backgroundColor: 'red'
    },
    arc: {
      backgroundColor: 'red',
      borderColor: 'red',
      borderWidth: 4
    }
  },
};



export default function VerticalBarChart({title,dataset,labels}) {
    const data = {
        labels,
        padding:10,
        datasets: [
          {
          
            data: dataset,
            backgroundColor: '#5541D8',
            borderRadius: 6,
            barThickness:40,
            borderWidth:4,
            borderColor: 'rgba(0, 0, 0, 0)',
      
           
      
          },
         
        ],
      };
      
  return(
  <>
      <Col className="mb-5 mb-xl-0">
        <Card className=" shadow">
          <CardBody>
            <CardTitle tag="h5">
                {title}
            </CardTitle>
            <div className="">   
                <Bar options={options} data={data} /> 
            </div>
          </CardBody>
        </Card>
      </Col>
    </>)  
}

//  
