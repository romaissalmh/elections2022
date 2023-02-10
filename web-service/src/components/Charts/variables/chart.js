
const footer = (tooltipItems) => {

  let sum = 0;
  let dataArr = tooltipItems[0].dataset.data;
  dataArr.map(data => {
      sum += data;
  });
  let percentage = (tooltipItems[0].parsed*100 / sum).toFixed(2)+"%";
  return percentage;
        
 
};
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

const lineOptions = {
  //maintainAspectRatio:false,
  responsive: true,
  layout: {
    padding: 0
  }, 
  scales: {
    x: 
      {
        display:true,
        position:'right',
        ticks: {
          font: {
            size: 14,
            family: 'Gotham-Light'
        },
        
      },
        grid: {
          display: false,
          borderColor: 'transparent'
        },
       
      }
    ,
    y: 
      {
        display:true,
        beginAtZero: true , 
        ticks: {
         
          min:0,
          font: {
            size: 14,
            family: 'Gotham-Light'
         },
          callback: function(value, index, values) {
                        return abbreviateNumber(value);
                    }
        
          },
        grid: {
          display: false,
          borderColor: 'transparent'
        },
      },
  },
  plugins: {
    legend: {
        display:false,
        labels: {
            display:false,
            font: {
                size: 12,
                family: 'Gotham-Light'
            }
        }
    },
      datalabels: {
         display: false,
      }
  },
 
} 




const pieOptions = {
  responsive: false,
  padding:0,
  plugins: {
    legend: {
        display:true,
        position:'left',
        labels: {
            display:true,
            align:"start",
            font: {
                size: 10,
                family: 'Gotham-Light',

            }
        }
    },
      tooltip:{
        callbacks: {
          footer:footer

        }
      },
      datalabels: {
         display: false,
        
         color: '#383874',
         font: {
          size: 10,
          family: 'Gotham-Bold',
         },
         formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
              sum += data;
          });
          let percentage = (value*100 / sum).toFixed(2)+"%";
          return percentage;
      },
      }
  },
   elements: {
     
      arc: {
        backgroundColor: ['#8675FF','#FF9065','#FFCB41','#5eff5a'],
        borderColor: '#fff',
        borderWidth: 1,
       /* borderRadius:8*/
      },
      
    },
  
}


module.exports = {
  lineOptions,
  pieOptions
 
  }