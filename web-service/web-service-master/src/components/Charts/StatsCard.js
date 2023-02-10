import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

const StatsCard = ({ text , value  , textColor,icon }) => {

    return (
        <>
            <Card >
              <CardBody style={{padding:"6px"}}>
                <Row>
                  <Col>
                    <CardTitle className="text-uppercase text-muted">
                      {text}
                    </CardTitle>
                    <h2 style={{margin:"0px",fontSize:'20px', fontFamily:"Gotham", fontWeight:"bold", color:textColor}}>{value}</h2>

                  </Col>
                  <Col className="col-auto">
                    <div style={{width:"2.5em", height:"2.5em", display:"flex", justifyContent:"center", alignItems:"center"}} className={"icon icon-shape bg-dark text-white rounded-circle shadow"}>
                       {icon}
                    </div>
                  </Col>
                </Row>
             
              </CardBody>
            </Card>
        </>
    );
}

export default StatsCard;