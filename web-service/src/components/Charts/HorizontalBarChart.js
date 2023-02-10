import React, {useRef} from 'react';
import { Card,CardTitle, CardBody } from "reactstrap";
import { 
  Bar, 
  getElementAtEvent} from 'react-chartjs-2';


export default function HorizontalBarChart({title,dataset,labels, source, currency, loadAds,disclaimer}) {
    const chartRef = useRef();
    const onClick = (event) => {
      let index = getElementAtEvent(chartRef.current, event)[0].index
      loadAds(labels[index])
     
    } 
    function abbreviateNumber(number){
       var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0;

        // if zero, we don't need a suffix
        if(tier === 0) return number;

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale; 

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }
 
    const plugins = { // Accessing labels and making them images
    labels: {
      render: 'image',
      images: [{
          src: 'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_book_48px-256.png',
          height: 25,
          width: 25
        },
        {
          src: 'https://cdn3.iconfinder.com/data/icons/glypho-free/64/pen-checkbox-256.png',
          height: 25,
          width: 25
        },
        {
          src: 'https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Home-House--256.png',
          height: 25,
          width: 25
        },
        {
          src: 'https://cdn1.iconfinder.com/data/icons/social-media-vol-3/24/_google_chrome-256.png',
          height: 25,
          width: 25
        },
        {
          src: 'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_book_48px-256.png',
          height: 25,
          width: 25
        },
        {
          src: 'https://cdn3.iconfinder.com/data/icons/glypho-free/64/pen-checkbox-256.png',
          height: 25,
          width: 25
        },
        {
          src: 'https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Home-House--256.png',
          height: 25,
          width: 25
        },
        {
          src: 'https://cdn1.iconfinder.com/data/icons/social-media-vol-3/24/_google_chrome-256.png',
          height: 25,
          width: 25
        },
      ]
    }}
    
  const options = {    
    responsive: true,
    //maintainAspectRatio: false,
    indexAxis: 'y', 
    layout: {
      padding: 0
    },
    scales: {
      x: 
        {
          ticks: {
            font: {
              size: 14,
              family: 'Gotham-Light'
          },
          callback: function(value, index, values) {
                        return currency !== undefined ? currency + abbreviateNumber(value) : abbreviateNumber(value);
                    }
        },
          grid: {
            display: true,
            borderColor: 'transparent'
          }
        }
      ,
      y: 
        {
          //display:true,
          ticks: {
     
            font: {
              size: 14,
              weight:'bold',
              family: 'Gotham'
          }
        },
          grid: {
            display: true,
            borderColor: 'transparent'
          },
          
        }
      
    },
    
    plugins: {
      
      legend: {
          display:false,
          labels: {
              //display:false,
              // This more specific font property overrides the global property
              font: {
                  size: 14,
                  family: 'Gotham'
              }
          }
      },
      datalabels: {
        display: false,
        color: '#fff',
        font: {
         size: 14,
         family: 'Gotham-Light',
        }
     }
    },
    
   
  };
    const data = {
        labels,
        padding:10,
        datasets: [
          {
          
            data: dataset,
            labels:labels,
            backgroundColor:['#0076BF', '#148DD9','#5CB1E6','#8AC2E6', '#B8D4E6'
            ],
            borderRadius: 6,
            borderColor: 'rgba(0, 0, 0, 0)',
            maxBarThickness: 50,
            barPercentage: 0.9,
            categoryPercentage: 0.9,
            ticks: {
              min: 0,
            },
           
      
          },
         
        ],
      };
      
  return(
  <>
        <Card className=" shadow">
          <CardBody>
            <CardTitle tag="h5" style={{fontFamily:"Gotham", fontWeight:"bold"}}>
                {title}
            </CardTitle>
            <div>
                <Bar onClick={onClick} ref={chartRef} options={options} data={data} plugins={plugins} />
            </div>
          </CardBody>
          <h6 style={{fontSize:"14px", fontWeight:"bold", marginTop:"10px", color:"red"}}>
                {disclaimer}   
             </h6>
          <p style={{fontSize:"11px"}}>
                {source}   
          </p>
        </Card>
    </>)
  
  
  
  
  
  
  
  
  
  
  
}

//  
