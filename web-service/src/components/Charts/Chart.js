import {useState,React} from 'react'
import {Button,Card,CardText,CardTitle,CardBody,Nav,NavItem,NavLink,Col,Row,TabPane, TabContent} from 'reactstrap'

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
  
function Chart() {
  const [activeTab, setActiveTab] = useState('1')
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

    return (
        <>
            <div>
                <Nav tabs >
                  <NavItem>
                    <NavLink
                      className={activeTab == "1" ? "active" : ""}
                      onClick={() => { toggle('1') }}
                      >
                      Tab1
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab == "2" ? "active" : ""}
                      onClick={() => { toggle('2') }}
                      >
                      More Tabs
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                    <Col sm="12">
                        <Card body>
                          <CardTitle>
                            Special Title Treatment 1
                          </CardTitle>
                          <CardText>
                            With supporting text below as a natural lead-in to additional content.
                          </CardText>
                          <Button>
                            Go somewhere
                          </Button>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <Card body>
                          <CardTitle>
                            Special Title Treatment
                          </CardTitle>
                          <CardText>
                            With supporting text below as a natural lead-in to additional content.
                          </CardText>
                          <Button>
                            Go somewhere
                          </Button>
                        </Card>
                      </Col>
                    
                    </Row>
                  </TabPane>
                </TabContent>
              </div>
        </>
    )
}

export default Chart
