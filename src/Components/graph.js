import React from 'react';
import CanvasJSReact from '../assets/js/canvasjs.react';

import './graph.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  
const Graph = (props) => {
  const calcDataPoints = (data) => {
    let arr = [];
      // let arr = [];
    if(props.method === 'dmMethod') {
      for(let i = 0 ; i < data.length; i++){
        arr.push(
          {
            x : i + 2,
            y : (props.title === "Voltage magnitude profile" ) ? data[i].Voltage_magnitude : data[i].Voltage_angle
          }
        );
      }
    }  
    else{
      for(let i = 0 ; i < data.length; i++){
        console.log(typeof(data[i].ph_1_v));
        if (props.title === 'Voltage magnitude profile ph_1_v'){
          if(data[i].ph_1_v === '-') continue;
          arr.push(
              {
                x : i + 2,
                y : data[i].ph_1_v
              }
            );
        
        }
        else if (props.title === 'Voltage angle profile ph_1_a'){
          if(data[i].ph_1_a === '-') continue;
          arr.push(
              {
                x : i + 2,
                y : data[i].ph_1_a
              }
            );
        }
        else if (props.title === 'Voltage magnitude profile ph_2_v'){
          if(data[i].ph_2_v === '-') continue;
          arr.push(
              {
                x : i + 2,
                y : data[i].ph_2_v
              }
            );
        }
        else if (props.title === 'Voltage angle profile ph_2_a'){
          if(data[i].ph_2_a === '-') continue;
          arr.push(
              {
                x : i + 2,
                y : data[i].ph_2_a
              }
            );
        }
        else if (props.title === 'Voltage magnitude profile ph_3_v'){
          if(data[i].ph_3_v === '-') continue;
          arr.push(
              {
                x : i + 2,
                y : data[i].ph_3_v
              }
            );
        }
        else if (props.title === 'Voltage angle profile ph_3_a'){
          if(data[i].ph_3_a === '-') continue;
          arr.push(
              {
                x : i + 2,
                y : data[i].ph_3_a
              }
            );
        }
      }
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