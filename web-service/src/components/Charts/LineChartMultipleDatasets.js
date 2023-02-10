import React, {useEffect, useState} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from 'chart.js';

import { default as ReactSelect } from "react-select";

import { Line } from 'react-chartjs-2';
import { Card,CardTitle, CardBody,Row,Col,Button} from "reactstrap";
import '../../assets/css/styles.css'
import { components } from "react-select";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );


  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };


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
   
function LineChartMultipleDatasets({datasets,labels,title,stacked , source, candidatesOptions}) {

  const [optionSelected, setOptionSelected] = useState([
    candidatesOptions[0],
    candidatesOptions[1],
    candidatesOptions[2],
    candidatesOptions[3],
  ])
  const [dataList, setDataList] = useState([
      {
        label:candidatesOptions[0].label,
        data: datasets[0].data,
        borderColor: candidatesOptions[0].color,
        fill: true,
        backgroundColor:stacked ? candidatesOptions[0].color : "transparent", 
        borderRadius: 1,
        BarThickness: 40,
        pointBorderWidth:3,
        pointBorderColor: "#fff",
        pointBackgroundColor: candidatesOptions[0].color,
        pointStyle: 'circle',
        pointRadius:6,
        tension: 0.2,
     
      },
       {
        label:candidatesOptions[1].label,
        data:datasets[1].data,
        borderColor: candidatesOptions[1].color,
        fill:  true ,
        backgroundColor: stacked ? candidatesOptions[1].color : "transparent", 
        borderRadius: 1,
        BarThickness: 40,
        pointBorderWidth:3,
        pointBorderColor: "#fff",
        pointBackgroundColor: candidatesOptions[1].color,
        pointStyle: 'circle',
        pointRadius:6,
        tension: 0.2,
      },
       {
        label:candidatesOptions[2].label,
        data: datasets[2].data,
        borderColor: candidatesOptions[2].color,
        fill: true,
        backgroundColor: stacked ? candidatesOptions[2].color : "transparent", 
        borderRadius: 1,
        BarThickness: 40,
        pointBorderWidth:3,
        pointBorderColor: "#fff",
        pointBackgroundColor: candidatesOptions[2].color,
        pointStyle: 'circle',
        pointRadius:6,
        tension: 0.2,
     
      },
       {
        label:candidatesOptions[3].label,
        data: datasets[3].data,
        borderColor:candidatesOptions[3].color,
        fill: true,
        backgroundColor: stacked ? candidatesOptions[3].color : "transparent" ,
        borderRadius: 2,
        BarThickness: 40,
        pointBorderWidth:3,
        pointBorderColor: "#fff",
        pointBackgroundColor: candidatesOptions[3].color,
        pointStyle: 'circle',
        pointRadius:6,
        tension: 0.2,
     
      },
    
    ],)

    React.useEffect(() => {
      setDataList([
        {
          label:candidatesOptions[0].label,
          data: datasets[0].data,
          borderColor: candidatesOptions[0].color,
          fill: true,
          backgroundColor:stacked ? candidatesOptions[0].color : "transparent", 
          borderRadius: 1,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: candidatesOptions[0].color,
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
       
        },
         {
          label:candidatesOptions[1].label,
          data:datasets[1].data,
          borderColor: candidatesOptions[1].color,
          fill:  true ,
          backgroundColor:  stacked ? candidatesOptions[1].color : "transparent", 
          borderRadius: 1,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: candidatesOptions[1].color,
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
        },
         {
          label:candidatesOptions[2].label,
          data: datasets[2].data,
          borderColor: candidatesOptions[2].color,
          fill: true,
          backgroundColor: stacked ? candidatesOptions[2].color : "transparent", 
          borderRadius: 1,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: candidatesOptions[2].color,
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
       
        },
         {
          label:candidatesOptions[3].label,
          data: datasets[3].data,
          borderColor:candidatesOptions[3].color,
          fill: true, 
          backgroundColor: stacked ? candidatesOptions[3].color : "transparent", 
          borderRadius: 2,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: candidatesOptions[3].color,
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
       
        },
      
      ])
    }, [datasets]);

  const options = {    
    scales:{
      y:{
        ticks: {
          beginAtZero: true,
          font: {
            size: 12,
            family: 'Gotham-Light'
        },
          callback: function(value, index, values) {
            return abbreviateNumber(value);
        }

      }
    },
    x : {
      ticks: {
        font: {
          size: 12,
          family: 'Gotham-Light'
      },
        

    }
    }
              
      
    },
    plugins: {
      legend: {
          display:true,
          labels: {
              //display:false,
              // This more specific font property overrides the global property
              font: {
                  size: 14,
                  family: 'Gotham'
              }
          }
      },
      datalabels: {
        display: false,
        color: '#383874',
        font: {
         size: 14,
         family: 'Gotham',
        }
     }
    },

  };



  const onChangeSelected = (selected) => {
    setOptionSelected(selected)
    let list = []
      for(let s in selected) {
        list.push({
          label: candidatesOptions[selected[s].value].label,
          data:  datasets[selected[s].value].data,
          borderColor: candidatesOptions[selected[s].value].color,
          fill: true,
          backgroundColor: "transparent",
          borderRadius: 1,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: candidatesOptions[selected[s].value].color,
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
        })
      }
      setDataList(list)
  }
    const data = {
      labels,
      datasets: dataList,
    };
    return (
        <>
       
          <Card className="shadow">
            <CardTitle >
                <Row style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)'}} >
                  <Col xl="8" sm="8">
                    <h5 style={{fontFamily:"Gotham", fontWeight:"bold"}}>
                   {title} 
                    </h5>
                  </Col>
                </Row>       
            </CardTitle>
             <CardBody>
                      <ReactSelect
                      options={candidatesOptions}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        Option
                      }}
                      onChange={ (selected ) => {onChangeSelected(selected)}}
                      allowSelectAll={true}
                      value={optionSelected}
                    />
                    <br/>
                    <div className="chart">
                        <Line options={options} data={data} />
                    </div>

            </CardBody>
             <p style={{fontSize:"11px"}}>
                {source}   
             </p>
                    
        </Card>
        </>
    )
}

export default LineChartMultipleDatasets




