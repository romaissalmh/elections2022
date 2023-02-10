import React, {useState, useEffect, useCallback} from 'react'
import {Container, Row, Col, Spinner} from 'reactstrap'
import MUIDataTable from "mui-datatables"
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl';

function ExploreView() {
    const intl = useIntl();

    const [ads,setAds] = useState({
        data : [],
        loading:true,
       
    })
    const socialIssuesList = [ 'Affaires internationales', 'Energie',
    'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
    'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
    'Droits de l’homme libertés publiques et discriminations', 'Education',
    'Environnement', 'Economic']

    useEffect(() => {
        loadAds()
    }, [])


    const loadAds = useCallback(async () => {
        setAds({
            loading:true
        })
        const ads = await fetchAds() 
        setAds({
            data:ads,
            loading:false
        })
    
    }, [])

    const fetchAds = async () => {
        let stats 
        await api.get(`api/general/`)
         .then ( res => {
             stats = res
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }


    
    const columns = [
        {
         name: "ad_creative_body",
         label:  intl.formatMessage({ id: 'exploreColumn1' }),
         options: {
          filter: false,
          sort: false,
         }
        },
        {
            name: "page_name",
            label:  intl.formatMessage({ id: 'exploreColumn6' }),
           
            options: {
             filter: true,
             sort: true,
             customBodyRenderLite: (dataIndex) => {
               return <a target="_blank" href={"https://www.facebook.com/"+ads.data[dataIndex].page_id}>{ads.data[dataIndex].page_name}</a>              
              }
        
            }
           },
        {
         name: "funding_entity",
         label:  intl.formatMessage({ id: 'exploreColumn2' }),
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "mean_impressions",
         label:  intl.formatMessage({ id: 'exploreColumn3' }),
         options: {
          filter: false,
          sort: true,
         }
        },
        {
         name: "publisher_platforms",
         label:  intl.formatMessage({ id: 'exploreColumn4' }),
         options: {
          filter: false,
          sort: false,
         }
        },
        {
            name: "ad_delivery_start_time",
            label:  intl.formatMessage({ id: 'exploreColumn5' }),
            options: {
            filter: false,
            sort: true,
            customBodyRenderLite: (dataIndex) => {
                return ads.data[dataIndex].ad_delivery_start_time.slice(0,10)             
            }
            },
        },
      
        {
            name: "social_issues_14cat",
            label:  intl.formatMessage({ id: 'exploreColumn7' }),
            options: {
             filter: true,
             filterOptions: {
                names:socialIssuesList,
                logic: (social_issues_14cat, filters, row) => {
                    console.log(filters)
                    console.log("come the si")
                    console.log(social_issues_14cat)
                    if (filters.length) return !social_issues_14cat.includes(filters[0]);
                    return false;
                  },
             },
             sort: false,
             customBodyRenderLite: (dataIndex) => {
                ads.data[dataIndex].social_issues_14cat = ads.data[dataIndex].social_issues_14cat.replace('[','')
                ads.data[dataIndex].social_issues_14cat = ads.data[dataIndex].social_issues_14cat.replace(']','')
                return ads.data[dataIndex].social_issues_14cat.replace(/'/g,'')
            }
            },
            
           },


       ];
       
       
       const options = {
         filterType: 'checkbox',
       //filter: false,
         download: false,
         print: false,
         searchOpen	:true,
         filter:true,
         viewColumns:false,
         selectableRowsHeader:false,
         selectableRows:'none'
         
        };

    return (
        <Container className="analytics">
           
             <Row style={{ padding:"30px", marginTop:"20px"}}> 
               <h4> {intl.formatMessage({ id: 'exploreTitle' })} </h4>    <br/>  
                 {   ads.loading ?  <Spinner>  </Spinner> :
          
                <Col>     
                    <MUIDataTable
                        data={ads.data}
                        columns={columns}
                        options={options}
                        />
                </Col> } 
            </Row>  
        </Container>
    )
}

export default ExploreView
