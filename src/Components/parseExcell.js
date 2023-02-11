import React , {useState, useEffect} from "react"
import * as XLSX from 'xlsx/xlsx.js';
import Table from './table.js'
 
const ParseExcell = () => {

  let jsonData;
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
        console.log(res)
    }

    return (
        <div>

        <h1>Give the Input File</h1>
        <input type="file" onChange={(e) => handleFile(e)}/>
        <h2>Click Here to run the program.</h2>
        <button onClick={() => runPythonScript() }>RUN</button>
        
        </div>
    );
  }
  
export default ParseExcell;