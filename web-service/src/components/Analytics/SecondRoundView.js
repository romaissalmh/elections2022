import React, {useEffect, useState, useCallback} from 'react'
import {Modal, ModalHeader, ModalBody,Container, Row, Spinner, Col, ButtonGroup, Button} from 'reactstrap'
//apis call 
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl'
import TwoBarChart from '../Charts/TwoBarChart'

import AdCard from '../Charts/AdCard'
import MUIDataTable from "mui-datatables"
import { PictureChart } from '../Charts/PictureChart'
import { StackedBarChart } from '../Charts/StackedBarChart'
import {candidatesOptions2 as candidatesOptions } from '../Charts/variables/data'

const SecondRoundView = () => {
    const intl = useIntl();
    let colors = ["rgb(176,43,48)", "rgb(223,227,10)", "rgb(155,177,211)" ,"rgb(55,52,59)","rgb(177,100,146)", "rgb(56,56,116)", "rgb(22,179,183)","rgb(132,54,146)", "rgb(70,160,245)", "rgb(227,161,135)","rgb(148,67,30)","rgb(252,105,9)","rgb(65,163,58)","rgb(21,45,72)","rgb(219,223,241)"] 
    let candidates = ["Emmanuel Macron", "Marine Le Pen"]
    let socialIssues = [ 'Affaires internationales', 'Energie',
    'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
    'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
    'Droits de l’homme libertés publiques et discriminations', 'Education',
    'Environnement', 'Economic', "Aucune catégorie" ]
    const issuesOptions = [
        { value: 0, title: "Affaires internationales", label:intl.formatMessage({ id: 'category1' }), color:"rgb(176,43,48)" },
        { value: 1, title: "Energie",label:intl.formatMessage({ id: 'category2' }), color:"rgb(223,227,10)" },
        { value: 2, title: "Immigration",label:intl.formatMessage({ id: 'category3' }), color:"rgb(155,177,211)" },
        { value: 3, title: "Justice et criminalité",label:intl.formatMessage({ id: 'category4' }), color:"rgb(55,52,59)" },
        { value: 4, title: "Opérations gouvernementales", label:intl.formatMessage({ id: 'category5' }),color:"rgb(177,100,146)" },
        { value: 5, title: "Politique culturelle" , label:intl.formatMessage({ id: 'category6' }),color:"rgb(56,56,116)"},
        { value: 6, title: "Politique sociale" , label:intl.formatMessage({ id: 'category7' }),color:"rgb(22,179,183)"},
        { value: 7, title: "Politiques urbaines et territoriales", label:intl.formatMessage({ id: 'category8' }),color:"rgb(132,54,146)" },
        { value: 8, title: "Santé", label:intl.formatMessage({ id: 'category9' }),color:"rgb(70,160,245)" },
        { value: 9, title: "Travail et emploi" , label:intl.formatMessage({ id: 'category10' }),color:"rgb(227,161,135)"},
        {value:10, title: "Droits de l’homme libertés publiques et discriminations", label:intl.formatMessage({ id: 'category13' }),color:"rgb(148,67,30)"},
        {value:11, title: "Education",label:intl.formatMessage({ id: 'category14' }), color:"rgb(252,105,9)"},
        {value: 12, title: "Environnement", label:intl.formatMessage({ id: 'category11' }),color:"rgb(65,163,58)" },
        {value:13, title: "Economic", label:intl.formatMessage({ id: 'category12' }),color:"rgb(21,45,72)"},
        {value:14, title: "Aucune catégorie",label:intl.formatMessage({ id: 'category15' }), color:"rgb(219,223,241)"}
        
      ];
    const [showBy, setShowBy] = useState('overall');

    const [activeB1, setActiveB1] = useState(true)
	const [activeB2, setActiveB2] = useState(false)
	const [activeB3, setActiveB3] = useState(false)
    
    const [showByA, setShowByA] = useState('overall');
    const [activeA1, setActiveA1] = useState(true)
	const [activeA2, setActiveA2] = useState(false)

    const [activeC1, setActiveC1] = useState(true)
    const [activeC2, setActiveC2] = useState(false)
    const [showByC, setShowByC] = useState("spending")

    const [candidateName1, setCandidateName1] = useState("macron");
    const [candidateName2, setCandidateName2] = useState("Le pen");

 	const [adsPerCandidate,setAdsPerCandidate] = useState({
        data : [],
        loading:true,


    })
    const [adsPerOfficialCandidate,setAdsPerOfficialCandidate] = useState({
        
        loading:true,
        data: []


    })
    const [adsTargetingCandidates,setAdsTargetingCandidates] = useState({
        data:[],
        loading:true,
        candidate:"",
        party:""
    })
    const [adsMentioningCandidates,setAdsMentioningCandidates] = useState({
        data:[],
        loading:true,
        candidate:"",
    })

    const [globalSpendingPerSocialIssue,setGlobalSpendingPerSocialIssue] = useState([{
        data : [],
        labels : [],
        loading:true,
    }])
    
    const [globalSpendingOfficialPerSocialIssue,setGlobalSpendingOfficialPerSocialIssue] = useState([{
        data : [],
        labels : [],
        loading:true,
    }])
    const [globalImpressionsPerSocialIssue,setGlobalImpressionsPerSocialIssue] = useState([{
        data : [],
        labels : [],
        loading:true,
    }])
    const [globalSpendingPerSocialIssuePerCandidate,setGlobalSpendingPerSocialIssuePerCandidate] = useState([{
        data : [],
        labels : [],
        loading:true,
    }])
    const [globalImpressionsPerSocialIssuePerCandidate,setGlobalImpressionsPerSocialIssuePerCandidate] = useState([{
        data : [],
        labels : [],
        loading:true,
    }])
    const [modalDemo1, setModalDemo1] = useState(false);

    const [modalDemo2, setModalDemo2] = useState(false);

    const [demographicBreakdown1,setDemographicBreakdown1] = useState({
        femaleGender:[],
        maleGender:[],
        loading:true,
        labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    })

    const [demographicBreakdown2,setDemographicBreakdown2] = useState({
        femaleGender:[],
        maleGender:[],
        loading:true,
        labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    })
  

    useEffect(() => {
        loadInfoPerCandidate()
        loadDemographicBreakdown1(candidateName1)
        loadDemographicBreakdown2(candidateName2)
        loadInfoPerOfficialCandidatePages()
        loadGlobalSpendingPerCandidatePerSocialIssue()
        loadGlobalSpendingPerOfficialCandidatePerSocialIssue()
        
    }, [])

      // Toggle for Modal
      const toggleModal1 = (candidate) => {

        adsMentioningCandidates.candidate = candidate
        setModalDemo1(!modalDemo1);
        
        if(typeof candidate === 'string' )
            {
                loadAdsMentioningCandidates(candidate)
            }
    }

      const toggleModal2 = (candidate,party) => {
        //console.log(candidate)

        adsTargetingCandidates.candidate = candidate
        adsTargetingCandidates.party = party
        setModalDemo2(!modalDemo2);

        if(candidate !== undefined & party !== undefined)
            {
                loadAdsTargetingCandidates(candidate,party)
            }
    }

      const  customizeLabel = (e) => {
        return `${e.value} € `;
      }


      const loadAdsMentioningCandidates = useCallback(async (candidate) => {
        setAdsMentioningCandidates({
            loading:true,
            candidate:candidate,
        })
        const data = await fetchAdsMentioningCandidates(candidate)
        setAdsMentioningCandidates({
            data:data,
            loading:false, 
            candidate:candidate,
        })
    
    }, [])
      const loadAdsTargetingCandidates = useCallback(async (candidate,party) => {
        setAdsTargetingCandidates({
            loading:true,
            candidate:candidate,
            party:party,
        })
        const data = await fetchAdsTargetingCandidates(candidate,party)
      
        setAdsTargetingCandidates({
            data:data,
            loading:false, candidate:candidate,
            party:party,
        })
    
    }, [])

    function onPointClick1 (e) {
        const series = e.target;
        console.log(series)
        if (series.isSelected()) {
            series.clearSelection();
        } else {
            series.select();
        }
        toggleModal1(series.getLabel()._data.originalArgument)

    }
    function onPointClick2 (e) {
        const series = e.target;
        if (series.isSelected()) {
            series.clearSelection();
        } else {
            series.select();
        }
        toggleModal2(series.getLabel()._data.originalArgument,series.getLabel()._data.point.tag)

    }
   
 
    const loadInfoPerOfficialCandidatePages = useCallback(async () => {
        setAdsPerOfficialCandidate({
            loading:true
        })
        const info = await fetchInfoPerOfficialCandidatePages()
        let dataset = []
    
        for (const d of info)
        {
            dataset.push({
                candidate: d.candidate,
                party: d.partyPage,
                countAds: d.data[0].countAds, 
                spending:  d.data[0].money !== null ? parseInt(d.data[0].money) : 0,
                impressions :  d.data[0].impressions !== null ? parseInt(d.data[0].impressions) : 0
            })
        }

        setAdsPerOfficialCandidate({

            data:dataset,
            loading:false,
        })

        
    })
 

    const loadInfoPerCandidate = useCallback(async () => {
       
        setAdsPerCandidate({
            data:[],
            loading:true
        })
        const result = await fetchInfoPerCandidate()
        let l = []
        for (const d of result)
        {
            l.push({
                candidate:d.candidate,
                party : d.partyPage,
                spending: d.data[0] !== undefined ? parseInt(d.data[0].spend): 0,
                impressions: d.data[0] !== undefined ? parseInt(d.data[0].impressions) : 0,
                countAds: d.data[0] !== undefined ? parseInt(d.data[0].countAds) : 0,
            })
        }

        setAdsPerCandidate({
            data:l,
            loading:false
        })
      
    
    }, [])

    const loadDemographicBreakdown1 = useCallback(async (value) => {
        setCandidateName1(value)
        setDemographicBreakdown1({
            femaleGender:[],
            maleGender:[],
            loading:true,
            labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
        })
        const data = await fetchDemographicBreakdown(value)
      
        let data1 =  data.map(
            a => a.gender === "female" ?  Math.floor(a.reach) :null
        )
        let data2 = data.map(
            a => a.gender === "male" ?  Math.floor(a.reach) :null
        )
        data1 = data1.filter(function (value, index, arr){
            return value !== null
        })
        data2 = data2.filter(function (value, index, arr){
            return value !== null
        })
        setDemographicBreakdown1({
            femaleGender: data1,
            maleGender: data2,
            loading:false,
            labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']

        })

    })

    const loadDemographicBreakdown2 = useCallback(async (value) => {
        setCandidateName2(value)
        setDemographicBreakdown2({
            femaleGender:[],
            maleGender:[],
            loading:true,
            labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
        })
        const data = await fetchDemographicBreakdown(value)
      
        let data1 =  data.map(
            a => a.gender === "female" ?  Math.floor(a.reach) :null
        )
        let data2 = data.map(
            a => a.gender === "male" ?  Math.floor(a.reach) :null
        )
        data1 = data1.filter(function (value, index, arr){
            return value !== null
        })
        data2 = data2.filter(function (value, index, arr){
            return value !== null
        })
        setDemographicBreakdown2({
            femaleGender: data1,
            maleGender: data2,
            loading:false,
            labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']

        })

    })
    const loadGlobalSpendingPerCandidatePerSocialIssue = useCallback(async () => {
        setGlobalSpendingPerSocialIssue({
            data:[],
            loading:true
        })
        setGlobalSpendingPerSocialIssuePerCandidate({
            data:[],
            loading:true
        })
        setGlobalImpressionsPerSocialIssuePerCandidate({
            data:[],
            loading:true
        })
        setGlobalImpressionsPerSocialIssue({
            data:[],
            loading:true
        })
        const result = await fetchGlobalSpendingPerCandidateParSocialIssue()
        let dataset1 = []
        let dataset2 = []
        let dataset3 = []
        let dataset4 = []
        
        for (const candidate in candidates){
            dataset2.push({
                label:candidates[candidate],
                data:[],
                backgroundColor: colors[candidate]
            })
            dataset4.push({
                label:candidates[candidate],
                data:[],
                backgroundColor: colors[candidate]
            })
        }
        let i = 0
        for (const [key, value] of Object.entries(result)) {
            let spending = []
            let impressions = []

            let j = 0
            for (const candidate of value){
                spending.push(candidate.data[0].spend !== null ? parseInt(candidate.data[0].spend) : 0 )
                impressions.push(candidate.data[0].impressions !== null ? parseInt(candidate.data[0].impressions) : 0 )
                dataset2[j].data.push(candidate.data[0].spend !== null ? parseInt(candidate.data[0].spend) : 0)
                dataset4[j].data.push(candidate.data[0].impressions !== null ? parseInt(candidate.data[0].impressions) : 0)

                j += 1
            }
            dataset1.push({
                label:key,
                data:spending, 
                backgroundColor: colors[i]
            })
            dataset3.push({
                label:key,
                data:impressions, 
                backgroundColor: colors[i]
            })
            i += 1
        }
        setGlobalSpendingPerSocialIssue({
            data:dataset1,
            labels:candidates,
            loading:false
        })
        setGlobalImpressionsPerSocialIssue({
            data:dataset2,
            labels:socialIssues,
            loading:false
        })
        setGlobalSpendingPerSocialIssuePerCandidate({
            data:dataset2,
            labels:socialIssues,
            loading:false
        })
        setGlobalImpressionsPerSocialIssuePerCandidate({
            data:dataset4,
            labels:socialIssues,
            loading:false
        })
    
}, [])




const loadGlobalSpendingPerOfficialCandidatePerSocialIssue = useCallback(async () => {
    setGlobalSpendingOfficialPerSocialIssue({
        data:[],
        loading:true
    })

    const result = await fetchGlobalSpendingPerOfficialCandidateParSocialIssue()
    let dataset = []
    let i = 0
    //candidates = ["Emmanuel Macron", "Marine Le Pen","Eric Zemmour"]
    for (const [key, value] of Object.entries(result)) {
        let spending = []
        for (const candidate of value){
            spending.push(candidate.data[0].money !== null ? parseInt(candidate.data[0].money) : 0 )
           
        }
        dataset.push({
            label:key,
            data:spending, 
            backgroundColor: colors[i]
        })
        i += 1
    }
    setGlobalSpendingOfficialPerSocialIssue({
        data:dataset,
        labels:candidates,
        loading:false
    })
    
}, [])
    /**
     * 
     * Fetching data from the REST APIIII 
     */
    const fetchInfoPerCandidate = async () => {
        let stats 
        await api.get(`api/general/infoCandidatesByMonth/2`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }

    const fetchGlobalSpendingPerCandidateParSocialIssue = async () => {
        let stats 
        await api.get(`api/general/spendPerCandidatePerSocialIssue/2`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }

    const fetchGlobalSpendingPerOfficialCandidateParSocialIssue = async () => {
        let stats 
        await api.get(`api/pages/infosPerSocialIssuesByCandidateOfficialPages/2`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }

    const fetchInfoPerOfficialCandidatePages = async () => {
        let stats 
        await api.get(`api/pages/infosByCandidateOfficialPages/2`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }
    const fetchAdsTargetingCandidates = async (candidate,party) => {
        //change the api url
       let stats 
       await api.get(`api/pages/entitiesByCandidatesOfficialPages/`+candidate+`/`+party+`/2`)
        .then ( res => {
            stats = res
            //console.log(stats)
        }) 
        .catch(
            err => console.log(err)
        )
        return stats 
    }
    const fetchAdsMentioningCandidates = async (candidate) => {
        //change the api url
       let stats 
       await api.get(`api/general/entitiesMentioningCandidates/`+candidate+`/2`)
        .then ( res => {
            stats = res
            //console.log(stats)
        }) 
        .catch(
            err => console.log(err)
        )
        return stats 
    }
    const fetchDemographicBreakdown = async (candidate) => {
        let stats 
        await api.get(`api/demographicDistribution/demographicBreakdownOfentitiesMentioningCandidates/${candidate}/2`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }
     
   

    const columns1 = [
        {
            name: intl.formatMessage({ id: 'filterType1' }),           
            options: {
             filter: false,
             sort: false,
             customBodyRenderLite: (dataIndex) => {
               return <AdCard date={adsMentioningCandidates.data[dataIndex].ad_delivery_start_time} ad={adsMentioningCandidates.data[dataIndex].ad_creative_body} advertiser={adsMentioningCandidates.data[dataIndex].page_name} funding = {adsMentioningCandidates.data[dataIndex].funding_entity}/> 
         }  }  }, ];

    const columns2 = [
            {
                name: intl.formatMessage({ id: 'filterType1' }),           
                options: {
                 filter: false,
                 sort: false,
                 customBodyRenderLite: (dataIndex) => {
                   return <AdCard date={adsTargetingCandidates.data[dataIndex].ad_delivery_start_time} ad={adsTargetingCandidates.data[dataIndex].ad_creative_body} advertiser={adsTargetingCandidates.data[dataIndex].page_name} funding = {adsTargetingCandidates.data[dataIndex].funding_entity}/> 
        }  }  }, ];    

    const options = {
        filterType: 'checkbox',
      //filter: false,
        download: false,
        print: false,
        search: false,
        filter:false,
        viewColumns:false,
        selectableRowsHeader:false,
        selectableRows:'none'
        
       };
	return (

		 <Container className="candidates">
                
           <Row style={{marginTop:"20px", minHeight:"300px", padding:"30px"}}>     
                
            <h4>  {intl.formatMessage({ id: 'candidatesTitle' })} </h4>  <br/>
            <h6>  {intl.formatMessage({ id: 'SecondRoundInfo' })} </h6>  <br/> <br/>  

            <ButtonGroup >
                    <Button active={activeB1}  onClick={() => {
                        setShowBy('overall')
                        setActiveB2(false)
                        setActiveB3(false)
                        setActiveB1(true)
                    }}>{intl.formatMessage({ id: 'candidatesMenuItem1' })}</Button>
                    
                    <Button active={activeB2}  onClick={() => {
                        setShowBy('socialIssues')
                        setActiveB1(false)
                        setActiveB3(false)
                        setActiveB2(true)
                    }}>{intl.formatMessage({ id: 'candidatesMenuItem4' })}</Button>

                    <Button active={activeB3}  onClick={() => {
                        setShowBy('demographics')
                        setActiveB1(false)
                        setActiveB2(false)
                        setActiveB3(true)
                    }}>{intl.formatMessage({ id: 'candidatesMenuItem3' })}</Button>

            </ButtonGroup>
                <Col xl="12"  sm="12" >  
                { showBy === 'overall' ? 
                adsPerCandidate.loading ? 
                       <div style={{display:'flex', justifyContent:"center",alignItems:'center', height:""}}>  <Spinner>  </Spinner> </div>  
                       :
                        <PictureChart
                        dataset = {adsPerCandidate.data}
                        title = {[intl.formatMessage({ id: 'candidatesPlotTitle3' }),intl.formatMessage({ id: 'candidatesPlotTitle1' }),intl.formatMessage({ id: 'candidatesPlotTitle4' })]}
                        source = ""
                        onPointClick = {onPointClick1}/> 
                        :

                        showBy === 'socialIssues'  && 
                        
                         showByC == "spending"  ?
                        globalSpendingPerSocialIssue.loading && globalSpendingPerSocialIssue.loading ? 
                        <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                        : 
                        <>
                             <ButtonGroup >
                               <Button active={activeC1}  onClick={() => {
                                   setShowByC('spending')
                                   setActiveC2(false)
                                   setActiveC1(true)
                               }}>{intl.formatMessage({ id: 'filterType2' })}</Button>
                               
                               <Button active={activeC2}  onClick={() => {
                                   setShowByC('impressions')
                                   setActiveC1(false)
                                   setActiveC2(true)
                               }}>{intl.formatMessage({ id: 'filterType3' })}</Button>
                               </ButtonGroup> 
                            <StackedBarChart
                                    datasets = {globalSpendingPerSocialIssue.data}
                                    labels = {globalSpendingPerSocialIssue.labels}
                                    source  = {intl.formatMessage({ id: 'plotSource3' })}
                                    title = {intl.formatMessage({ id: 'candidatesPlotTitle2' })}
                                    options = {issuesOptions}
                                    currency = " €"
                                    />
                             <StackedBarChart
                                    datasets = {globalSpendingPerSocialIssuePerCandidate.data}
                                    labels = {globalSpendingPerSocialIssuePerCandidate.labels}
                                    source  = {intl.formatMessage({ id: 'plotSource3' })}
                                    title = {intl.formatMessage({ id: 'candidatesPlotTitle2' })}
                                    options = {candidatesOptions}
                                    currency = " €"
                                    />
                            
                           
                        </> :
                               showByC == "impressions"  ?
                               globalImpressionsPerSocialIssue.loading && globalImpressionsPerSocialIssuePerCandidate.loading ? 
                               <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                               :  <>
                               <ButtonGroup >
                               <Button active={activeC1}  onClick={() => {
                                   setShowByC('spending')
                                   setActiveC2(false)
                                   setActiveC1(true)
                               }}>{intl.formatMessage({ id: 'filterType2' })}</Button>
                               
                               <Button active={activeC2}  onClick={() => {
                                   setShowByC('impressions')
                                   setActiveC1(false)
                                   setActiveC2(true)
                               }}>{intl.formatMessage({ id: 'filterType3' })}</Button>
                               </ButtonGroup> 
                               <StackedBarChart
                                   datasets = {globalImpressionsPerSocialIssue.data}
                                   labels = {globalImpressionsPerSocialIssue.labels}
                                   source  = {intl.formatMessage({ id: 'plotSource3' })}
                                   title = {intl.formatMessage({ id: 'candidatesPlotTitle2' })}
                                   options = {issuesOptions}
                                   currency = ""
                                   />
                               <StackedBarChart
                                   datasets = {globalImpressionsPerSocialIssuePerCandidate.data}
                                   labels = {globalImpressionsPerSocialIssuePerCandidate.labels}
                                   source  = {intl.formatMessage({ id: 'plotSource3' })}
                                   title = {intl.formatMessage({ id: 'candidatesPlotTitle2' })}
                                   options = {candidatesOptions}
                                   currency = ""
                                   />


                               </> 
                        : demographicBreakdown1.loading && demographicBreakdown2.loading ? 
                          <div style={{ width:"100%", height:"400px",
                              display:'flex', justifyContent:"center",alignItems:'center'}}>
                                <Spinner>  </Spinner> 
                          </div> 
                           :
                        
                         <Row>
                             <Col xl="6" sm="12" >
                                <select className='candidateSelect' value={candidateName1} onChange={(event) => loadDemographicBreakdown1(event.target.value)}>
                                    <option value="Macron">Emmanuel Macron</option>
                                    <option value="Mélenchon">Jean-Luc Mélenchon</option>
                                    <option value="Le pen">Marine Le Pen</option>
                                    <option value="Zemmour">Eric Zemmour</option>
                                    <option value="Roussel">Fabien Roussel</option>
                                    <option value="Hidalgo">Anne Hidalgo</option>
                                    <option value="Arthaud">Nathalie Arthaud</option>
                                    <option value="Dupont-Aignan">Nicolas Dupont-Aignan</option>
                                    <option value="Lassalle">Jean Lassalle </option>
                                    <option value="Poutou">Philippe Poutou</option>
                                    <option value="Jadot">Yannick Jadot</option> 
                                    <option value="Pécresse">Valérie Pécresse</option>


                                </select>

                                <TwoBarChart 
                                    title={intl.formatMessage({ id: 'candidatesPlo4' })  + candidateName1} 
                                    labels={demographicBreakdown1.labels}
                                    dataset1={demographicBreakdown1.femaleGender}
                                    dataset2={demographicBreakdown1.maleGender}
                                    source  = {intl.formatMessage({ id: 'plotSource3' })}
                                />
                            </Col>
                            <Col xl="6" sm="12" >
                                <select className='candidateSelect' value={candidateName2} onChange={(event) => loadDemographicBreakdown2(event.target.value)}>
                                    <option value="Macron">Emmanuel Macron</option>
                                    <option value="Mélenchon">Jean-Luc Mélenchon</option>
                                    <option value="Le pen">Marine Le Pen</option>
                                    <option value="Zemmour">Eric Zemmour</option>
                                    <option value="Roussel">Fabien Roussel</option>
                                    <option value="Hidalgo">Anne Hidalgo</option>
                                    <option value="Arthaud">Nathalie Arthaud</option>
                                    <option value="Dupont-Aignan">Nicolas Dupont-Aignan</option>
                                    <option value="Lassalle">Jean Lassalle </option>
                                    <option value="Poutou">Philippe Poutou</option>
                                    <option value="Jadot">Yannick Jadot</option> 
                                    <option value="Pécresse">Valérie Pécresse</option>


                                </select>

                                <TwoBarChart 
                                    title={intl.formatMessage({ id: 'candidatesPlo4' })  + candidateName2} 
                                    labels={demographicBreakdown2.labels}
                                    dataset1={demographicBreakdown2.femaleGender}
                                    dataset2={demographicBreakdown2.maleGender}
                                    source  = {intl.formatMessage({ id: 'plotSource3' })}
                                />
                            </Col>
                       </Row> 
                      
                      }
                </Col>
           
            </Row>
            <div>
                <Modal style={{width:"80vw", height:"80%"}} isOpen={modalDemo1} toggle={toggleModal1}>
                    <ModalHeader
                        toggle={toggleModal1}></ModalHeader>
                    <ModalBody>
                        {
                            adsMentioningCandidates.loading ?  
                            <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  :
                            <>
                            <br/>
                            <MUIDataTable style={{maxHeight:'100%'}}
                                data={adsMentioningCandidates.data}
                                columns={columns1}
                                options={options}
                            />
                        </>  
                        }
                         </ModalBody>
                    </Modal>
            </div>
           
         
            <Row style={{marginTop:"20px", minHeight:"300px", padding:"30px"}}>  
                <ButtonGroup >
                   
                        
                        <Button active={activeA1}  onClick={() => {
                            setShowByA('overall')
                            setActiveA2(false)
                            setActiveA1(true)
                        }}>{intl.formatMessage({ id: 'candidatesMenuItem1' })}</Button>

                        <Button active={activeA2}  onClick={() => {
                            setShowByA('socialIssues')
                            setActiveA1(false)
                            setActiveA2(true)
                        }}>{intl.formatMessage({ id: 'candidatesMenuItem4' })}</Button>

                </ButtonGroup>
                 <Col xl="12"  sm="12" >  
                {
                    showByA == "overall" ?
                    adsPerOfficialCandidate.loading ? 
                    <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                     : 
                    <PictureChart
                        dataset = {adsPerOfficialCandidate.data}
                        title = {[intl.formatMessage({ id: 'candidatesPlot11' }),intl.formatMessage({ id: 'candidatesPlot12' }),intl.formatMessage({ id: 'candidatesPlot13' })]}
                        source = ""
                        onPointClick = {onPointClick2}
                        />
                        :
                     globalSpendingOfficialPerSocialIssue.loading ?  
                     <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                     : 
                     <div style={{minHeight:"800px",display:"flex",justifyContent:"center"}}>
                     <StackedBarChart
                     datasets = {globalSpendingOfficialPerSocialIssue.data}
                     labels = {globalSpendingOfficialPerSocialIssue.labels}
                     source  = {intl.formatMessage({ id: 'plotSource3' })}
                     title = {intl.formatMessage({ id: 'candidatesOfficialPlotTitle1' })}
                     options = {issuesOptions}
                     currency = " €"
                     />
                     </div>
                    

                 } 
                 </Col>    
            </Row>
            <div>
                <Modal style={{width:"80vw", height:"80%"}} isOpen={modalDemo2} toggle={toggleModal2}>
                    <ModalHeader
                        toggle={toggleModal2}>  </ModalHeader>
                    <ModalBody>
                        {
                            adsTargetingCandidates.loading ?  
                            <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  :
                            <>
                            <br/>
                            <MUIDataTable style={{maxHeight:'100%'}}
                                data={adsTargetingCandidates.data}
                                columns={columns2}
                                options={options}
                            />
                        </>  
                        }
                         </ModalBody>
                </Modal>
            </div>
           
        </Container> 
        )
}


export default SecondRoundView ;
