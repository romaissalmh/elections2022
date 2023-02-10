import React, {useRef}  from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {pieOptions} from './variables/chart'

import { Pie, 
    getElementAtEvent } from "react-chartjs-2";

import {
  Card,
  Row,
  Col
} from "reactstrap";

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ title, labels, dataset, colors, loadAds}) => {
    const chartRef = useRef();
    const onClick = (event) => {
        let index = getElementAtEvent(chartRef.current, event)[0].index
        loadAds(labels[index])
       
      } 
    const pieData = {
        labels: labels,
        datasets: [{
            data: dataset,
            backgroundColor: colors,
            hoverBorderColor:'#383874'
        }]
    }
    return (
        <>
            <Card className=" shadow">
                <Row  style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)', paddingBottom:'10px'}}>
                    <Col>
                            <h5 style={{marginTop:"5px"}} >
                                 {title} 
                            </h5>
                    </Col>
                   
                </Row>
                <Row style={{widht:"100%"}} >
                        <Pie    data={pieData}
                                options={pieOptions}
                                height={450}
                                width={450}
                                onClick={onClick}
                                ref={chartRef} 
                                />
                </Row>
            </Card>
        </>
    );
}
export default PieChart;
