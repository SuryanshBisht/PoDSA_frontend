import React  from "react"
import * as XLSX from 'xlsx/xlsx.js';
import {useState} from 'react';

import Table from './table.js';
import Graph from './graph.js';
import './parseExcel.css';

// parsing the excel file
const ParseExcel = () => {
  const [outputData, setOutputData] = useState(1);
  const [inputData, setInputData] = useState(1);

  const baseUrl = 'http://localhost:3000/dmMethod';

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const fetchedData = XLSX.utils.sheet_to_json(worksheet);
    setInputData(fetchedData);
    setOutputData(1);
    console.log('extracted data as :');
    console.log(fetchedData);
  }

//sending request to run algo in backend
  const runPythonScript = async (e) => {
    console.log('data sent as :');
    console.log(inputData);
    const res = await fetch(baseUrl ,{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({parcel: inputData})
    })
    try{
      let d = await res.json();
      console.log(d);
      d = JSON.parse(d[0]);
      setOutputData(d);
      console.log('after d with bus no');
      console.log(d);
    }
    catch(error){
      console.log(error);
    }
  }


// downloading results in excel sheet button
    const downloadExcel = (data) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "Node_Voltage_data.xlsx");
    };


    return (
      <>  
        <div className = 'container'>
        <h1 className="mainHeader">Power Distribution System Analysis</h1>

        <div className = 'col'>
        <h2 >Upload the data file </h2>
        <button type = "button" className = "btn-warning">
        <i className = "fa fa-upload"></i> Upload File
        <input className="inputfile" type="file" name="a" id="a" onChange={(e) => handleFile(e)} />
        </button>
        </div>
        { 
          inputData !== 1 ? 
            (
            <>
              <h2>Click here to run the program.</h2>
              <button className = 'parseButton' onClick={() => runPythonScript()}>RUN</button>
              {
                outputData !== 1 ? (
                  <>
                  <div className = 'row'>
                    <h2>Download the Results</h2>
                    <button className = 'parseButton' onClick={() => downloadExcel(outputData)}>Download</button> 
                  </div>

                  <div className = 'row'>
                    <Table jsonData = {outputData}/>
                  </div>

                  <Graph title = "Voltage magnitude profile" dataPoints = {outputData}/>
                  <Graph title = "Voltage angle profile" dataPoints = {outputData}/>
                  </>
                ) : <div></div>
              }
            </>  
            ) : <div></div> 
        }
        </div>
      </>
    );
  }
  
export default ParseExcel;