import React  from "react"
import * as XLSX from 'xlsx/xlsx.js';
import {useState} from 'react'

import Table from './table.js';
import './parseExcell.css';

const ParseExcell = () => {
  const [data, setData] = useState({});
  let jsonData;
  let d;

  const baseUrl = 'http://localhost:3000/'
  const handleFile = async (e) => {
      const file = e.target.files[0];
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      jsonData = XLSX.utils.sheet_to_json(worksheet);
      // console.log(JSON.stringify(jsonData))
  }

  const runPythonScript = async (e) => {
      const res = await fetch(baseUrl,{
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({parcel: jsonData})
      })
      d = await res.json();
      d = JSON.parse(d);
      setData(d);
  }

  const convertedData = (data) => {
    let result = [];
    let voltages = Object.entries(data.Voltage_magnitude).map(
            (entry) => {
                return entry[1];
            }
        ) 

    let angles = Object.entries(data.Voltage_angle).map(
            (entry) => {
                return entry[1];
            }
        ) 
    
    for(let i = 0; i < angles.length; i++){
        result.push(
          {
            Bus_Number : i + 2,
            Voltage_magnitude : voltages[i],
            Voltage_angle : angles[i],
          }
        );
    }

    return result;
  }

  const downloadExcel = (data) => {
    if(data !== null && data !== undefined && Object.keys(data).length === 0) return ;
    data = convertedData(data);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Node_Voltage_data.xlsx");
  };

  return (
    <div className = 'container'>

    <h1><u>Direct load flow analysis</u></h1>

    <div className = 'row'>
    <h2>Upload data file </h2>
    <input type="file" onChange={(e) => handleFile(e)}/>
    </div>

    <div className = 'row'>
    <h2>Click Here to run the program.</h2>
    <button onClick={() => runPythonScript()}>RUN</button>
    <button onClick={() => downloadExcel(data)}>Click to download</button>

    </div>
    <br/><br/>
    <Table jsonData = {data}/>

    </div>
  );
}
  
export default ParseExcell;