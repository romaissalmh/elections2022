import React, {  useState, useEffect } from 'react'
import France from "@svg-maps/france.regions";
import { SVGMap } from "react-svg-map";
import {Button, ButtonGroup} from 'reactstrap';
import { useIntl } from 'react-intl';

//import FranceDep from "@svg-maps/france.departments";
const { quantileSeq } = require('mathjs')

export const FranceMap = ({data,limits, colors }) => {
	//const [locationClassName, setLocationClassName] = useState({})

	const [showBy, setShowBy] = useState('ads');

	const intl = useIntl();
	const [activeB1, setActiveB1] = useState(true)
	const [activeB2, setActiveB2] = useState(false)
	const [activeB3, setActiveB3] = useState(false)
	const [pointedLocation,setPointedLocation]= useState(null)
	const [pointedDataLocation, setPointedDataLocation] = useState(null)
	const [pointedSpent,setPointedSpent]= useState(null)
	const [pointedImpressions,setPointedImpressions]= useState(null)
	const [adsQuantile, setAdsQuantile]= useState()
	const [spendingQuantile, setSpendingQuantile]= useState()
	

    const [mapLegend, setMapLegend] = useState({
		ads:{
			grades: [20000, 30000, 40000, 50000],
			colors:["#d7dff0","#dbdff1","#bbc6da","#92a0bc","#728bbc"]
		},
		spending:{
			grades: [3000000, 6000000, 9000000, 15000000],
			colors:["#d7dff0","#dbdff1","#bbc6da","#92a0bc","#728bbc"]
		},
		impressions:{
			grades: [20000000,30000000,40000000,60000000],
			colors:['#B8D4E6','#8AC2E6','#5CB1E6', '#148DD9','#0076BF',]

		}
	})
	const [tooltipStyle,setTooltipStyle]= useState({
		display: 'none'

	})

	function roundUp(number,near){
		if(number%near===0) return number;
		  return  parseInt(number / near) * near+near;
		
	  }
	useEffect(() => {
				
		let qSeq = quantileSeq(data.impressionsValues, [1/5, 2/5,3/5,4/5])
		let result = []
		qSeq.forEach(t => {
			result.push(roundUp(t,1000))
		})
		setAdsQuantile(result)
		qSeq = quantileSeq(data.spendingValues, [1/5, 2/5,3/5,4/5])
		result = []
		qSeq.forEach(t => {
			result.push(roundUp(t,1000))
		})
		setSpendingQuantile(result)

	}, [])
	
	/*const getLocationName = (event) => {
		return event.target.attributes.name.value;
        
	}
    const getLocationId = (event) => {
		return event.target.id
	}
*/
	function getColor(table, d){
		return d > table[3]
		? 3
		: d > table[2]
		? 2
		: d > table[1]
		? 1
		: d > table[0]
		? 0 : 0;


	}
	

    const handleLocationMouseOver= (event) =>  {
		const pointedLocationId =  event.target.id
		setPointedLocation(event.target.attributes.name.value)
		setPointedDataLocation(data.ads[pointedLocationId])
		setPointedSpent(data.spending[pointedLocationId])
		setPointedImpressions(data.impressions[pointedLocationId])

	}
    
	const handleLocationMouseOut = ()  => {
		setPointedLocation(null)
		setPointedSpent(null)
		setPointedImpressions(null)
		setTooltipStyle({display: 'none'})
	}

	const handleLocationMouseMove = (event) =>  {
		setTooltipStyle({
			display: 'block',
			top: event.clientY + 10,
			left: event.clientX - 100
		})
	}
	const getLocationClassName = (location, index) => {
		return (
		showBy === 'ads' ? `svg-map__location--int0${getColor(mapLegend.ads.grades,data.ads[location.id])}`
		:  showBy === 'spending' ?  `svg-map__location--int1${getColor(mapLegend.spending.grades,data.spending[location.id])}`
		: `svg-map__location--int2${getColor(mapLegend.impressions.grades,data.impressions[location.id])}`)
	
	}

        return (
		<div className='map'>
		<ButtonGroup>
            <Button active={activeB1} onClick={() => {
				setShowBy('ads')
				setActiveB2(false)
                setActiveB3(false)
                setActiveB1(true)
			}}>{intl.formatMessage({ id: 'filterType1' })} </Button>
            <Button active={activeB2} onClick={() => {
				setShowBy('spending')
				setActiveB3(false)
				setActiveB1(false)
				setActiveB2(true)
			}}>{intl.formatMessage({ id: 'filterType2' })} </Button>
            <Button active={activeB3} onClick={() => {
				setShowBy('impressions')
				setActiveB1(false)
                setActiveB2(false)
                setActiveB3(true)
			}}>{intl.formatMessage({ id: 'filterType3' })} </Button>
        </ButtonGroup>
          <div className="franceMap">
            <SVGMap 
			map={France} 
			locationClassName = {getLocationClassName}
            onLocationMouseOver={handleLocationMouseOver}
            onLocationMouseOut={handleLocationMouseOut}
            onLocationMouseMove={handleLocationMouseMove} 
			limits={limits}
			colors={colors}
            />
         <div className="legendeMap">

			 <table>
			 <tbody>
				<tr>
					{
						showBy === 'ads' ? 
						<td style={{background:"#7696AE", color:"white"}}> &lt; </td> 
						: showBy === 'spending' ? 
						<td style={{background:"#F8C2AF"}}> &lt; </td> :
						<td style={{background:"#B8D4E6"}}> &lt; </td> 
					}
						
				</tr>
		
				<tr> 
					{ 
						showBy === 'ads' ? 
						<td style={{background:"#566A92", color:"white"}}> 20K </td> 
						: showBy === 'spending' ? 
						<td style={{background:"#F79792"}}> 3M </td> :
						<td style={{background:"#8AC2E6"}}> 20M </td> 
					}

						
				</tr>
				<tr>
					{
							showBy === 'ads' ? 
							<td style={{background:"#475484", color:"white"}}> 30K </td> 
							: showBy === 'spending' ? 
							<td style={{background:"#D84560"}}> 6M </td> :
							<td style={{background:"#5CB1E6"}}> 30M</td> 
						}
				</tr>
				<tr>
						{
							showBy === 'ads' ? 
							<td style={{background:"#292B68", color:"white"}}> 40K </td> 
							: showBy === 'spending' ? 
							<td style={{background:"#BB1D4B"}}> 9M </td> :
							<td style={{background:"#148DD9"}}> 40M </td> 
						}
				</tr>

				<tr>
					{
							showBy === 'ads' ? 
							<td style={{background:"#00004D", color:"white"}}> 50K</td> 
							: showBy === 'spending' ? 
							<td style={{background:"#93003A"}}> 15M </td> :
							<td style={{background:"#0076BF"}}> 60M </td> 
						}
				</tr>
	 
			 </tbody>
			 </table>
		 </div>
			
            <div className="mapTooltip" style={tooltipStyle}>
               
				<p style={{color:"black", fontSize:"12px", fontFamily:"Gotham", fontWeight:"bold"}}>
			    {pointedLocation } 
				
				{showBy === 'ads' ? ": " + pointedDataLocation + " ads": showBy === 'spending' ? ": " + pointedSpent + " €" : ": " +  pointedImpressions  }
				</p>
			  </div>
        </div>
		</div>
        )
    
}

export default FranceMap
