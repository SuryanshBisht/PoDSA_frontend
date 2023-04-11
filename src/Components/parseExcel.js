import React  from "react"
import * as XLSX from 'xlsx/xlsx.js';
import {useState} from 'react';

import Table from './table.js';
import Graph from './graph.js';
import Loading from './loading.js';
import './parseExcel.css';

// parsing the excel file
const ParseExcel = () => {
  const [outputData, setOutputData] = useState(1);
  const [inputData, setInputData] = useState(1);
  const [method, setMethod] = useState('dmMethod');
  const [loading, setLoading] = useState(0);


  let dmMethod= 'http://localhost:3000/dmMethod';
  let dmMethod2= 'http://localhost:3000/dmMethod2';
  let baseUrl = 'http://localhost:3000/dmMethod';

  const options = [
    { label: 'Direct Load Flow', value: 'dmMethod' },
    { label: 'Direct Load Flow 2', value: 'dmMethod2' },
  ];
  
  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const fetchedData = XLSX.utils.sheet_to_json(worksheet);
    setInputData(fetchedData);
    setOutputData(1);
    setLoading(0);
    // console.log('extracted data as :');
    // console.log(fetchedData);
  }

//sending request to run algo in backend
  const runPythonScript = async (e) => {
    // console.log('data sent as :');
    // console.log(inputData);

    if(method === 'dmMethod') baseUrl= dmMethod;
    else if(method === 'dmMethod2') baseUrl= dmMethod2;
    
    setLoading(1);

    const res = await fetch(baseUrl ,{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({parcel: inputData})
    })
    try{
      let d = await res.json();
      // console.log(d);
      d = JSON.parse(d[0]);
      setOutputData(d);
      // console.log('after d with bus no');
      // console.log(d);
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

        <div className = 'container'>
          <label >
            Select the Analysis:
            <select value={method} onChange={handleChange}>
              {
                options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))
              }
            </select>
          </label>
        </div>

        <div className = 'col'>
        <h2 >Upload the data file </h2>
        <button type = "button" className = "btn-warning">
        <i className = "fa fa-upload"></i> Upload File
        <input className="inputfile" type="file" name="a" id="a" onChange={(e) => handleFile(e)} />
        </button>

        </div>
        <Loading/>
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
                ) : loading ? <Loading/> : <div></div>
              }
            </>  
            ) : <div></div> 
        }
        </div>
      </>
    );
  }
  
export default ParseExcel;