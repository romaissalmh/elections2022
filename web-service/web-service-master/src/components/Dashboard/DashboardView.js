import React, {useEffect,useState,useCallback} from 'react'
import {Container, Row, Col, Spinner} from 'reactstrap'
import LineChart from '../Charts/LineChart'

// core components
import Summary from '../Charts/Summary'
import CustomHorizontalBarChart from '../Charts/CustomHorizontalBarChart'
import FranceMap from '../Charts/FranceMap.js'
import { useIntl } from 'react-intl';

//apis call 
import {api} from '../../scripts/network'

const DashboardView= () =>  {
    //declare variables
    const limitsArray = [0, 80, 200, 300];
    const intl = useIntl();

    const limits = ["Active Cases", "desc", limitsArray];

    const color = [
        "green", // if the statistics value is equal or less than 0
        "yellow", // if the statistics value is equal or less than 
        "orange", // if the statistics value is equal or less than 
        "red", // if the statistics value is equal or less than ,
                // theres no greater than color...
        ];
    const [generalStatistics,setGeneralStatistics] = useState({
         data:[],
         loading:true
    })

    const [dataByRegion,setDataByRegion] = useState({
        ads:[],
        spending:[],
        impressions:[],
        loading:true
    })

  
    const [dataPerMonth, setDataPerMonth] = useState({
        ads : [],
        spending:[],
        impressions:[],
        loading:true,
        labels: []
    })
    useEffect(() => {
        loadGeneralStatistics()
        loadDataPerMonth()
        loadDataByRegion()

    }, [])

    

    const loadGeneralStatistics = useCallback(async () => {
        setGeneralStatistics({
            loading:true
        })
        let data =  await fetchGeneralStatistics()
        if(data !== undefined){
            setGeneralStatistics({
                data : data,
                loading: false
            })
        } 


      }, []);
      const loadDataPerMonth = useCallback(async () => {
        setDataPerMonth({
            loading:true
        })
        const adsPerMonth = await fetchAdsPerMonth()
        const spendingPerMonth = await fetchSpentOfMoneyPerMonth()
        const impressionsPerMonth = await fetchImpressionsPerMonth()
        let transform1 = []
        let transform2 = []
        let transform3 = []
        let labels = []
        adsPerMonth.map((ad)=>(
            transform1.push(parseInt(ad.countAds)) 
        ))
        spendingPerMonth.map((ad)=>(
            transform2.push(parseInt(ad.countMoney)) 
        ))
        impressionsPerMonth.map((ad)=>(
            transform3.push(parseInt(ad.countImpressions)) 
        ))
        adsPerMonth.map((ad)=>(
            labels.push(ad.CharMonth) 
        ))
        setDataPerMonth({
            ads:transform1,
            spending: transform2,
            impressions : transform3,
            loading:false,
            labels: labels,
            adsTitle : intl.formatMessage({ id: 'plotTitle1' }),
            spendingTitle:  intl.formatMessage({ id: 'plotTitle2' }),
            impressionsTitle:  intl.formatMessage({ id: 'plotTitle3' }),

        })
    })

    const loadDataByRegion = useCallback(async () => {
        setDataByRegion({
            loading:true
        })
        let AdsByRegion = await fetchAdsByRegion()
        let SpentByRegion = await fetchSpentByRegion()
        let impressionsByRegion = await fetchImpressionsByRegion()
       /// let ImpressionsByRegion = await fetchImpressionsByRegion()
       var ads = AdsByRegion.reduce(function(map, obj) {
        map[obj.region] =  parseInt(obj.number_of_ads) ;
        return map;
        }, {});
    
        var spending = SpentByRegion.reduce(function(map, obj) {
            map[obj.region] = parseInt(obj.mean_spend) ;
            return map;
        }, {});
    
        var impressions = impressionsByRegion.reduce(function(map, obj) {
            map[obj.region] = parseInt(obj.mean_impressions) ;
            return map;
        }, {});

        let transform1 = {
            ara: ads["Auvergne"] + ads["Rhône-Alpes"],
			bfc: ads["Bourgogne"] + ads["Franche-Comté"],
			bre: ads["Bretagne"],
			cvl: ads["Centre"],
			cor: ads["Corse"],
			ges: ads["Alsace"]+ ads["Lorraine"]+ads["Champagne-Ardenne"],
			hdf: ads["Picardie"] + ads["Nord-Pas-de-Calais"],
			idf: ads["Île-de-France"],
			nor: ads["Haute-Normandie"] + ads["Basse-Normandie"],
			naq: ads["Limousin"]+ads["Aquitaine"]+ads["Poitou-Charentes"],
			occ: ads["Midi-Pyrénées"] + ads["Languedoc-Roussillon"],
			pdl: ads["Pays de la Loire"],
			pac: ads["Provence-Alpes-Côte d'Azur"]
        }
        let transform2 = {
            ara: spending["Auvergne"]  + spending["Rhône-Alpes"],
			bfc: spending["Bourgogne"] + spending["Franche-Comté"],
			bre: spending["Bretagne"],
			cvl: spending["Centre"],
			cor: spending["Corse"],
			ges: spending["Alsace"]+ spending["Lorraine"]+spending["Champagne-Ardenne"],
			hdf: spending["Picardie"] + spending["Nord-Pas-de-Calais"],
			idf: spending["Île-de-France"],
			nor: spending["Haute-Normandie"] + spending["Basse-Normandie"],
			naq: spending["Limousin"]+spending["Aquitaine"]+spending["Poitou-Charentes"],
			occ: spending["Midi-Pyrénées"] + spending["Languedoc-Roussillon"],
			pdl: spending["Pays de la Loire"],
			pac: spending["Provence-Alpes-Côte d'Azur"]
        }

        let transform3 = {
            ara: impressions["Auvergne"] + impressions["Rhône-Alpes"],
			bfc: impressions["Bourgogne"] + impressions["Franche-Comté"],
			bre: impressions["Bretagne"],
			cvl: impressions["Centre"],
			cor: impressions["Corse"],
			ges: impressions["Alsace"]+ impressions["Lorraine"]+impressions["Champagne-Ardenne"],
			hdf: impressions["Picardie"] + impressions["Nord-Pas-de-Calais"],
			idf: impressions["Île-de-France"],
			nor: impressions["Haute-Normandie"] + impressions["Basse-Normandie"],
			naq: impressions["Limousin"]+impressions["Aquitaine"]+impressions["Poitou-Charentes"],
			occ: impressions["Midi-Pyrénées"] + impressions["Languedoc-Roussillon"],
			pdl: impressions["Pays de la Loire"],
			pac: impressions["Provence-Alpes-Côte d'Azur"]
        }
       setDataByRegion({
        ads:transform1,
        spending:transform2,
        impressions: transform3,
        adsValues:Object.values(transform1),
        spendingValues:Object.values(transform2),
        impressionsValues:Object.values(transform3),
        loading:false
    })
      }, []);

  



   /**
    * 
    * Fetching DATA from the REST API !!! 
    */


    const fetchGeneralStatistics = async () => {
       let stats 
        await api.get(`api/general/generalStatistics/`)
        .then ( res => {
            stats = res[0] ; 
            //console.log(stats)
        })
        .catch(
            err => console.log(err)
        )
        return stats 
    }

    /* ---------- get data per month --------------- */

    const fetchSpentOfMoneyPerMonth = async () => {
        let stats 
        await api.get(`api/general/spentOfMoneyByMonthTest`)
         .then ( res => {
             stats = res
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }
 
    const fetchAdsPerMonth = async () => {
        let stats 
        await api.get(`api/general/numberOfEntitiesByMonthTest`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats  
     }

     const fetchImpressionsPerMonth = async () => {
        let stats 
        await api.get(`api/general/numberOfImpressionsByMonthTest`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats  
     }
    // add here impressions per MONTH

    /* ---------- get data per region --------------- */

    const fetchAdsByRegion = async () => {
        let stats = []

       await api.get(`api/regionMap/entitiesByRegion/`)
        .then ( res => {
            stats = res

        })
        .catch(
            err => console.log(err)
        )
       return stats 
    }

    const fetchSpentByRegion = async () => {
        let stats = []

       await api.get(`api/regionMap/spentByRegion/`)
        .then ( res => {
            stats = res

        })
        .catch(
            err => console.log(err)
        )
       return stats 
    }

    const fetchImpressionsByRegion = async () => {
        let stats = []

       await api.get(`api/regionMap/impressionsByRegion/`)
        .then ( res => {
            stats = res

        })
        .catch(
            err => console.log(err)
        )
       return stats 
    }
    // add here impressions per region




    return (
            <Container  className="dashboard">
               
                    <Row style={{ marginTop:"50px", paddingLeft:"10px"}}>            
                     <h4>  {intl.formatMessage({ id: 'dashboardTitle' })} </h4>    <br/> 
                        <Col xl="6" sm="12" >  
                            <h6>  {intl.formatMessage({ id: 'dashboardSubTitle' })} </h6>  
                            <Row > 
                                {
                                    generalStatistics.loading ? <Spinner> Loading </Spinner> 
                                    :   
                                <> 
                                 <h1>   {generalStatistics.data.numberAds !== undefined ? generalStatistics.data.numberAds.toLocaleString("en-US") : ""} </h1>  
                                 <Summary data={generalStatistics.data}/>
                                </> 

                                }

                            </Row> 

                            <Row style={{ display:"flex", justifyConten:'center', alignItems:"center"}}> 
                            <Col xl="12" sm="12" >  

                            {
                                dataPerMonth.loading ? <Spinner> Loading </Spinner> 
                                : 
                                <LineChart 
                                labels = {dataPerMonth.labels} 
                                dataset={dataPerMonth}
                                total="true"
                                color="rgba(56, 56, 116, 1)"
                                colorOpacity="rgba(56, 56, 116, 0.1)"
                                source={intl.formatMessage({ id: 'plotSource3' })} 
                                /> 

                              }
                                 </Col>  
                        
                            </Row> 
                              
                            
                           
                        </Col>  
                        
                        <Col style={{minHeight:"85vh"}} xl="5"  sm="12" >  
                        {
                            dataByRegion.loading  ?  <Spinner> Loading </Spinner> 
                            :   <FranceMap
                                colors={color}
                                limits={limits}
                                data={dataByRegion} />
                        }
                          
                        </Col>              
                    </Row> 
                
              
            </Container>
    )
}
export default DashboardView
