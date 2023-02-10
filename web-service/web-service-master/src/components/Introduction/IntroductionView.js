import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner,Button} from 'reactstrap'
import { MdDoubleArrow } from "react-icons/md";
import LineChart from '../Charts/LineChart'
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl';

import { Link } from 'react-router-dom'

function IntroductionView({rtl}) {
    const intl = useIntl();

    const [adsPerMonth,setAdsPerMonth] = useState({ 
        data : [],
        loading:true,
        labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022','Feb2022','Mar2022']
    })

    useEffect(() => {
        loadAdsPerMonth()
    }, [])

    const loadAdsPerMonth = useCallback(async () => {
        setAdsPerMonth({
            loading:true
        })
        const result = await fetchAdsPerMonth()
        if(result !== undefined){
            let transform = []
            result.map((ad)=>(
                transform.push(parseInt(ad.countAds))
            ))
            setAdsPerMonth({
                data:transform,
                loading:false,
                labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022','Feb2022','Mar2022']

            })
        }
       
    
   
    }, [])
     // fetching data from the server 
     const fetchAdsPerMonth = async () => {
        let stats 
        await api.get(`api/general/numberOfEntitiesByMonth`)
         .then ( res => {
             stats = res
             console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }

    return (
        <Container className="intro">
            <Row style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>    
                <Col xl="6" sm="12"  style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", padding:"20px"}} > 
                    <p style={{padding:"20px"}} >    {intl.formatMessage({ id: 'description' })} </p>  <br/>  <br/> 
      
                    <Link   style={{display:"flex", justifyContent:"center", alignItems:"center" , marginBottom:"50px",width:"300px"}}  to="/dashboard"> 
                            <Button> {intl.formatMessage({ id: 'start' })} <MdDoubleArrow/></Button>
                    </Link>

                </Col> 
                <Col xl="6" sm="12" >  
                    {
                     adsPerMonth.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <LineChart 
                     title={intl.formatMessage({ id: 'plotTitle1' })}
                     labels = {adsPerMonth.labels} 
                     dataset={adsPerMonth.data}
                     currency = ""
                     total = "false"
                     color="rgba(255, 112, 139, 1)"
                     colorOpacity="rgba(255, 112, 139, 0.1)"
                     source={intl.formatMessage({ id: 'plotSource1' })}
                     />  }
                   
                </Col>
            </Row>  <br/>  
        </Container>
    )
}

export default IntroductionView
