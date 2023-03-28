import React from 'react';
import CanvasJSReact from '../assets/js/canvasjs.react';

import './graph.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  
const Graph = (props) => {
  const calcDataPoints = (data) => {
    let arr = [];
      // let arr = [];
    for(let i = 0 ; i < data.length; i++){
      arr.push(
        {
          x : i + 2,
          y : (props.title === "Voltage magnitude profile" ) ? data[i].Voltage_magnitude : data[i].Voltage_angle
        }
      );
    }
    return arr;
  }
  
  const options = {
    theme: "light2",
    axisX : {
      interval : 1,
    },
    title: {
      text: props.title
    },
    data: [{
      type: "line",
      dataPoints: calcDataPoints(props.dataPoints)
    }]
  }
  
  return(
      <div className = 'resultChart'>
        <CanvasJSChart  options = {options}/>
      </div>
      
  );
}

export default Graph;