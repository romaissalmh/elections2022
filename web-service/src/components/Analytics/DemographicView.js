import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner} from 'reactstrap'
import HorizontalBarChart from '../Charts/HorizontalBarChart'
//apis call 
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl';

const DemographicView = () => {
    const intl = useIntl();

    const [demographicBreakdown,setDemographicBreakdown] = useState({
        data : [],
        age:'18-24',
        gender:'male',
        loading:true,
        labels: []

    })
  
    useEffect(() => {
        loadDemographicBreakdown('18-24','male')
      
    }, [])
 

     const loadDemographicBreakdown = useCallback(async (age,gender) => {
        setDemographicBreakdown({
            data:[],
            loading:true,
            age:age,
            gender:gender,
            labels:[],

        })
        const data = await fetchDemographicBreakdown(age,gender)
       let pages = data.map(
            a => a.page_name 
        )
        let impressions = data.map(
            a => Math.round(parseInt(a.reach)) 
        )

          setDemographicBreakdown({
            data:impressions,
            loading:false,
            age:age,
            gender:gender,
            labels:pages,

        })

    })
    // fetching data from the server

    const fetchDemographicBreakdown =  async (age,gender) => {
        let stats 
        await api.get(`api/demographicDistribution/pageReachByGenderAge/`+age+`/`+gender)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }


	return (

		 <Container className="analytics">
            <br/> 
            <Row style={{padding:"30px"}}>     
            <h6> {intl.formatMessage({ id: 'analyticsSubTitle2' })} </h6>         
            <div style={{display:"flex","justify-content":"space-around"}}> 
                    <select value={demographicBreakdown.gender} onChange={(event) => loadDemographicBreakdown(demographicBreakdown.age,event.target.value)}>
                         <option value="female">{intl.formatMessage({ id: 'female' })} </option>
                         <option value="male">{intl.formatMessage({ id: 'male' })} </option>
                    </select>
                    <select  value={demographicBreakdown.age} onChange={(event) => loadDemographicBreakdown(event.target.value,demographicBreakdown.gender)}>
                            <option value="13-17">13-17</option>
                            <option value="18-24">18-24</option>
                            <option value="25-34">25-34</option>
                            <option value="35-44">35-44</option>
                            <option value="45-54">45-54</option>
                            <option value="55-64">55-64</option>
                            <option value="65+">65+</option>
                    </select>
            </div> 
            <Col xl="12"  sm="12" >  
                 {
                     demographicBreakdown.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <HorizontalBarChart 
                     title= {intl.formatMessage({ id: 'demoPlotTitle1' }) +demographicBreakdown.age+ intl.formatMessage({ id: 'demoPlotTitle2' }) +demographicBreakdown.gender+ intl.formatMessage({ id: 'demoPlotTitle3' })} 
                    labels = {demographicBreakdown.labels} 
                    dataset={demographicBreakdown.data}

                    // color="rgba(255, 186, 105, 1)"
                    // colorOpacity="rgba(255, 186, 105, 0.1)"
                      source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 targeting french regions. This chart is displaying number of people reached by some Facebook pages"
                     />  

                   }      
                
            </Col>              
            </Row>  
        </Container>
            )
}


export default DemographicView ;