import {useState,React} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
 
  } from 'chart.js'; 
import { Card,CardTitle, CardBody,Row,Col,Button,ButtonGroup} from "reactstrap";
import '../../assets/css/styles.css'
import { useIntl } from 'react-intl';
import { LabelTemplate } from './LabelTemplate';
import {
    Chart, Series,ArgumentAxis, Label, CommonSeriesSettings,
  } from 'devextreme-react/chart';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
  );

  
export function PictureChart({dataset,title , source,onPointClick,disclaimer}) {
  const [showBy, setShowBy] = useState('ads');
  const [activeB1, setActiveB1] = useState(true)
  const [activeB2, setActiveB2] = useState(false)
  const [activeB3, setActiveB3] = useState(false)
  //console.log(dataset)
  const intl = useIntl();
    return (
        <>
        <ButtonGroup > 
                    <Button active={activeB1} onClick={() => {
                            setShowBy('ads') 
                            setActiveB2(false)
                            setActiveB3(false)
                            setActiveB1(true)
                    } }>{intl.formatMessage({ id: 'filterType1' })}</Button>
                    <Button active={activeB2} onClick={() => {
                            setShowBy('spending')
                            setActiveB3(false)
                            setActiveB1(false)
                            setActiveB2(true)
                    }}> {intl.formatMessage({ id: 'filterType2' })} </Button>
                    <Button active={activeB3} onClick={() => {
                            setShowBy('impressions')
                            setActiveB1(false)
                            setActiveB2(false)
                            setActiveB3(true)
                    }}>{intl.formatMessage({ id: 'filterType3' })} </Button>
        </ButtonGroup>
      
        <Card  className="shadow">
            <CardTitle >
             
                <Row style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)'}} >
                  <Col xl="8" sm="8">
              
                    <h5 style={{fontFamily:"Gotham", fontWeight:"bold"}}>
                   {showBy === 'ads' ? title[0] : showBy === 'spending' ?  title[1] : title[2]}
                    </h5>
                  </Col>
                
                </Row>

            </CardTitle>
            <CardBody>
                        <Chart 
                            id="chart"
                            rotated={true}
                            onPointClick={onPointClick}
                            dataSource={dataset}>
                            <CommonSeriesSettings 
                                type="bar" 
                                argumentField="candidate" 
                                cornerRadius={5}	
                                barPadding={0.1} >
                                <Label visible></Label>
                            </CommonSeriesSettings>
                            <Series
                                name={intl.formatMessage({ id: 'spend' })}
                                valueField= {showBy === 'ads' ?  "countAds" : showBy === 'spending' ? "spending" : "impressions"}
                                tagField = "party"
                                color="#8AC2E6" />
                            <ArgumentAxis>
                                <Label render={LabelTemplate}></Label>
                            </ArgumentAxis>
                        </Chart>
                        <h6 style={{fontSize:"14px", fontWeight:"bold", marginTop:"10px", color:"red"}}>
                                {disclaimer} 
                            </h6>
                
            </CardBody>
             <p style={{fontSize:"11px"}}>
                {source}   
             </p>
                    
        </Card>
        </>
    )
}





