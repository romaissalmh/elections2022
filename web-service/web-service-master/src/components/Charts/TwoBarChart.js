import React, {useState,useRef} from 'react';

import { Card,CardTitle, CardBody,Col, Button,Row} from "reactstrap";
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
import { 
  Bar, 
  Line,
  getElementAtEvent} from 'react-chartjs-2';
import { BiBarChartAlt2, BiLineChart} from "react-icons/bi";
import { lineOptions } from './variables/chart';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function abbreviateNumber(number){
       var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0;

        // if zero, we don't need a suffix
        if(tier === 0) return number;

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }

export const options = {
  responsive: true,
  layout: {
    padding: 0
  },
  plugins: {
   
    legend: {
      display: false,
      position: 'top',
      font: {
        size: 12,
        family: 'Gotham'
    }
    },
    title: { 
      display: false,
      font: {
        size: 12,
        family: 'Gotham'
    },
    
    },
    datalabels: {
      display: false,
   }
  },
  scales: {
    x: 
      {
        display:true,
        position:'right',
        ticks: {
          font: {
            size: 14,
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
        ticks: {
          font: {
            size: 12,
            family: 'Gotham'
        },
        callback: function(value, index, values) {
                        return abbreviateNumber(value);
                    }
        ,

      },
        grid: {
          display: false,
          borderColor: 'transparent'
        },
      },
  },
  
};

export default function TwoBarChart({title,dataset1,dataset2,labels, source, loadAds,disclaimer}) {
   const chartRef = useRef();
  const onClick = (event) => {

    let datasetIndex = getElementAtEvent(chartRef.current, event)[0].datasetIndex
    let index = getElementAtEvent(chartRef.current, event)[0].index

    if(datasetIndex === 0){
      loadAds("female",labels[index])
    }
    else{
      loadAds("male",labels[index])

    }
  }
  const [bar, setBar] = useState(true)
   
  const data = {
  labels,
  padding:0,
  datasets: [
    {
      label: 'Female',
      data: dataset1,
      borderColor: bar ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 112, 139,1)'  ,
      fill: bar ? false : true,
      backgroundColor: bar ? 'rgba(255, 112, 139,1)' :'rgba(255, 112, 139,0.1)',
      borderRadius: 6,
      pointBorderColor: "#fff",
      pointBackgroundColor: "rgba(255, 112, 139,1)",
      pointStyle: 'circle',
    
    },
    {
      label: 'Male',
      data: dataset2,
      fill: bar ? false : true,
      borderColor: bar ? 'rgba(0, 0, 0, 0)': 'rgba(56, 56, 116, 1)' ,
      backgroundColor: bar ? 'rgba(56, 56, 116, 1)' :'rgba(56, 56, 116,0.1)',
      borderRadius: 6,
    
      pointBorderColor: "#fff",
      pointBackgroundColor: "rgba(56, 56, 116, 1)",
      pointStyle: 'circle',
     
    },
  ],
};

  return(
  
        <Card className="shadow">
        <Row style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)', paddingBottom:'10px'}}>
            <Col xl="8" sm="8" >
              <CardTitle tag="h5" style={{fontFamily:"Gotham", fontWeight:"bold"}}>
                {title}
              </CardTitle>  
            </Col>
            <Col xl="4" style={{display:"flex", justifyContent:"flex-end"}}>
                    {bar ? (
                         <div className="flex">
                         <Button style={{backgroundColor:'var(--night-blue)', borderStyle:'none'}}  type="button" onClick={() => setBar(true)}>
                            <BiBarChartAlt2 size={20}/>
                         </Button>
                         <Button style={{ backgroundColor:'var(--lavender)',  color:'var(--night-blue)', borderStyle:'none'}} type="button" onClick={() => setBar(false)}>
                            <BiLineChart size={20}/> 
                         </Button>
                       </div>
                      )
                      :
                      <div className="flex">
                        <Button style={{backgroundColor:'var(--lavender)',  color:'var(--night-blue)', borderStyle:'none'}}  type="button" onClick={() => setBar(true)}>
                            <BiBarChartAlt2 size={20}/>

                        </Button>
                        <Button style={{ backgroundColor:'var(--night-blue)', borderStyle:'none'}} className="shadow"   type="button" onClick={() => setBar(false)}>
                             <BiLineChart size={20}/> 
                        </Button>
                    </div>    
                    }
            </Col>
        </Row>
        <CardBody style={{padding:"6px"}}>
            {
              bar ?   <Bar  onClick={onClick}       ref={chartRef}

                     options={options} data={data} />
              :  <Line options={lineOptions} data={data} />
            }
            
          </CardBody>
          <h6 style={{fontSize:"14px", fontWeight:"bold", marginTop:"10px", color:"red"}}>
                {disclaimer}   
             </h6>
                    
          <p style={{fontSize:"11px"}}>
                {source}   
             </p>
                    
        </Card>
  )

}


