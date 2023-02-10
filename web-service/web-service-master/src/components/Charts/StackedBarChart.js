import React, { useState} from 'react'
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card,CardTitle, CardBody,Row,Col} from "reactstrap";
import '../../assets/css/styles.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
  
export function StackedBarChart({datasets,labels,title,source,options, currency}) {
    //console.log(datasets)
     
  const chartOptions = {
    //indexAxis: 'y', 
    plugins: {
      title: {
        display: false,
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
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 12,
            family: 'Gotham-Bold'
        },
      },
      },
      y: {
        stacked: true,
        ticks: {
          font: {
            size: 12,
            family: 'Gotham-Light'
        }, 
          callback: function(value, index, values) {
            return abbreviateNumber(value)+currency;
        }
      },
    },
  }
  }


    const [optionSelected, setOptionSelected] = useState([
        options[0],
        options[1],
        options[2],
        options[3],
        options[4],
        options[5],
        options[6],
        options[7],
        options[8],
        options[9],
        options[10],
        options[11],
        options[12],
        options[13],
        options[14],
      ])
    const [dataList, setDataList] = useState(
        datasets
    )
    React.useEffect(() => {
        setDataList(datasets)

    }, [datasets])
    const data = {
        labels,
        datasets:dataList
      };

    const onChangeSelected = (selected) => {
        setOptionSelected(selected)
        let list = []
          for(let s in selected) {
            list.push({
              label: options[selected[s].value].label,
              data:  datasets[selected[s].value].data,
              backgroundColor: datasets[selected[s].value].backgroundColor,
            })
          }
          setDataList(list)
      }
    return <>
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
                            options={options}
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
                            <Bar options={chartOptions} data={data} />
                        </div>

                </CardBody>
                <p style={{fontSize:"11px"}}>
                    {source}   
                </p>
                    
            </Card>
        </>
        
            
}
