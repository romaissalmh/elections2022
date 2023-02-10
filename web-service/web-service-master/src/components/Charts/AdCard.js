import React from 'react'

export default class  AdCard extends React.Component {
       
        
    render(){
        
        return (
            <div style={{border:"1px solid #dddfe2",maxWidth:"600px", backgroundColor:"#fff", padding:"12px", margin:" 0 auto", overflow:"hidden", borderRadius:"4px", marginBottom:"10px"}}>
            <div>
                <div style={{margin:"0",margin: "0",padding:" 0", border: "0", fontSize: "100%", font: "inherit", verticalAlign: "baseline", color: "#337ab7", fontWeight: "bold"}} >{this.props.advertiser}</div> 
            </div> 
            <div style = {{fontSize: "12px", color: "#90949c"}}> Sponsored  
               <i style={{display: "inline-block", width: "12px", height: "12px", marginLeft:"2px",
               backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI1RTM5RDAzQjhGRDExRTdBQTI5QUEyMDY5MDRGMkU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI1RTM5RDA0QjhGRDExRTdBQTI5QUEyMDY5MDRGMkU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjVFMzlEMDFCOEZEMTFFN0FBMjlBQTIwNjkwNEYyRTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjVFMzlEMDJCOEZEMTFFN0FBMjlBQTIwNjkwNEYyRTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zhoExAAAB9ElEQVR42oyVPUhCURTHnxcJhwgqaehD2tUGwQgaWoIGzabIrWjSmiIwJChyEYSm6AMiaHTtYxFaDUqIKN3CQZpCGsOx/6n/g8vzfR34cS/33vO/59177nmBdH7HsLPFaHQETRYsgQQIc+oDtEENVB9arW87/4BVGIIhNEVQ4NA125yNfw9UQBkb9PQJZRGNoGlQZBcMg32QBhfkVnORIA7Eh779wpyogx+QRARnEgU/dQ28o58HK+hvWyKPia8u/ncU/PwGFyzD+d5wMDrLUW0wYt2aDKpnRlykqB874VGFbOZi1DIUb7+gTUZcot1Ck/HYuCCaiiml777uIGpmi5fJumyQearbtCXCOBgHl2DA53EtKSa/bmMQPGe/w/OcA1dgyKdwQmkvSrccxJ943qPgSDZ0uDA7CwddJmeJnPkqx475pA2vLFLaQrcN6uxPIEfjAvrz4NPBp6tYULxsEpyCQXMA4o9gCt1nm/UvilXKr33ZjC3YPPGaCFdZpfzYpnWAVe3VUvGqikWm4lP40FrFaHtavyKaZq0os4B4maTcjMszb1Lrv2zyc1Iut6zbmykIbpiCBn1TZsFX2ll1mEJukTdlHQTTzJIMH434zFOj/w/CiSQoOVxoG6LyCu+0iyqxBndc/3k+fqZdyVOvn+mvAAMA97aqsWnfv3QAAAAASUVORK5CYII=)",
               backgroundRepeat:" no-repeat",
               backgroundSize:" 100%",
               verticalAlign: "-2px"}}>
               </i> Paid for by <span style={{fontWeight:"bold", color:"black"}} >  {this.props.funding} </span>
           </div>
            <div style={{float:"left"}}>
                 <div> 
                     <p style= {{color: "black", fontFamily: "Helvetica Neue, Helvetica, Arial", "margin": "10px 0px 10px", fontSize: "14px"}}  >
                        {this.props.ad}
                     </p> 
                 </div>
                 <div> 
                     <p style= {{color: "grey", fontWeight:"bold", fontFamily: "Helvetica Neue, Helvetica, Arial", "margin": "0px 0px 10px", fontSize: "12px"}}  >
                        {this.props.date != undefined ? this.props.date.slice(0,10) : ""}
                     </p> 
                 </div>
           
            </div> 
            </div>
          )
    }
  
}

/* <div style={{marginTop: "10px", verticalAlign: "baseline"}}>
                <img width={'100%'} src={this.props.img}/>
            </div> 
             */