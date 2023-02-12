import React  from "react"
import * as XLSX from 'xlsx/xlsx.js';
import {useState} from 'react'

import Table from './table.js';
import './parseExcell.css';

const ParseExcell = () => {
  // const [table, setTable] = useState(false);
  const [data, setData] = useState(-1);
  let jsonData;
  // let data;
  // let vm,va;

    const baseUrl = 'http://localhost:3000/'
    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(JSON.stringify(jsonData))
       }

    const runPythonScript = async (e) => {
        // e.preventDefault()
        const res = await fetch(baseUrl,{
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({parcel: jsonData})
        })
        let d = await res.json();
        d = JSON.parse(d);
        setData(d);
        // console.log(data);
        // console.log(data.Voltage_magnitude);
        // console.log(data.Voltage_magnitude.V2);

        // Object.entries(data).map(entry => {
        //     let key = entry[0];
        //     let value = entry[1];
        //     console.log(key, value);
        // });

        // Object.entries(data.Voltage_magnitude).map(entry => {
        //     let key = entry[0];
        //     let value = entry[1];
        //     console.log(key, value);
        // });
    }

    return (
      <>  
        <div className = 'container'>
        <h1><u>Direct load flow analysis</u></h1>

        <div className = 'row'>
        <h2>Upload data file </h2>
        <input type="file" onChange={(e) => handleFile(e)}/>
        </div>

        <div className = 'row'>
        <h2>Click Here to run the program.</h2>
        <button onClick={() => runPythonScript() }>RUN</button>
        </div>
        <br/><br/>
        <Table jsonData = {data}/>
        </div>
      </>
    );
  }
  
export default ParseExcell;