import React from 'react';

export function LabelTemplate(data) {
  return (<svg style={{display:"flex", flexDirection:"row"}} overflow="visible">
     
      <image  x="70" y="0" width="30" height="30" href={getFilePath(data.valueText)}></image>
      <text className="template-text" x="30" y="40" textAnchor="middle">{data.valueText}</text>
       </svg>);
}

function getFilePath(text) {  
    return `../../${text}.png`;
}
