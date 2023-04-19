import React  from "react"
import * as XLSX from 'xlsx/xlsx.js';
import {useState} from 'react';

import Table from './table.js';
import Graph from './graph.js';
import Loading from './loading.js';
import './parseExcel.css';
import Tree from './tree.js'

import header_image from '../assets/images/header_image.svg';
import frame from '../assets/images/Frame 3.svg';
import arrow_up from '../assets/images/arrow_up.svg';
import arrow_right from '../assets/images/arrow_right.svg';


// parsing the excel file
const ParseExcel = () => {
  const [outputData, setOutputData] = useState(1);
  const [inputData, setInputData] = useState(1);
  const [method, setMethod] = useState('choose');
  const [loading, setLoading] = useState(0);


  let dmMethod= 'http://localhost:3000/dmMethod';
  let dmMethod2= 'http://localhost:3000/dmMethod2';
  let baseUrl = 'http://localhost:3000/dmMethod';

  const options = [
    { label: 'Direct Load Flow (3-phase)', value: 'dmMethod2' },
    { label: 'Direct Load Flow (basic)', value: 'dmMethod' },
  ]; 
  
  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  const handleFile = async (e) => {
    if(method === 'choose') return ;
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const fetchedData = workbook.SheetNames.map((worksheetName) => {
        return ((XLSX.utils.sheet_to_json(workbook.Sheets[worksheetName])));
    })

    setInputData(fetchedData);
    setOutputData(1);
    setLoading(0);
    console.log('extracted data as :');
    console.log(fetchedData);
  }

//sending request to run algo in backend
  const runPythonScript = async (e) => {
    console.log('data sent as :');
    console.log(inputData);

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
      XLSX.writeFile(workbook, "Load_flow_results.xlsx");
    };


   

    return (
      // <>
      // <div className="image ">
      //   <img src = {frame} alt = 'not found' className = 'bottomImage'/>
      //   <img src = {header_image} alt = 'not found' className = 'topImage'/>
      // </div>

      //   <div className = 'row '>
      //     <label className="label">
      //       {/* <span >Select the Analysis:</span> */}
      //       <select className = 'dropdown' value={method} onChange={handleChange}>
      //         <option disabled = {true} className="options" value='choose'>Select the Analysis</option>
      //         {
      //           options.map((option) => (
      //             <option className="options" value={option.value}>{option.label}</option>
      //           ))
      //         }
      //       </select>
      //     </label>
      //   </div>


      //   <div className = 'row'>
      //   <button type = "button" className = "btn-warning btn-update">
      //   <div className = 'btn-text' >UPLOAD FILE</div>
      //   <img className="arrowStyle" src = {arrow_up} alt = 'not found'/>
      //   <input className="inputfile" type="file" name="a" id="a" onChange={(e) => handleFile(e)} />

      //   </button>
      //     {
      //       inputData !== 1 ? 
      //       (
      //         <button className = 'btn-warning' onClick={() => runPythonScript()}>
      //         <div className = 'btn-text' >RUN</div>
      //         <img className="arrowStyle" src = {arrow_right} alt = 'not found'/>
      //         </button>
      //       ) : <div></div> 
      //     }
      //   </div>
      //   { 
      //     inputData !== 1 ? 
      //       (
      //       <>
      //         {
      //           outputData !== 1 ? (
      //             // 0 !== 1 ? (
      //             <>
      //             <div className = 'row'>
      //               <h2>RESULTS</h2>
      //             </div> 

      //             <div className = 'btn-and-table update'>
      //               <Table className="tableStyle" jsonData = {outputData}/>
      //               <div className = 'row'>
      //               <button className = 'btn-warning download-btn' onClick={() => downloadExcel(outputData)}>
      //               <div className = 'btn-text' >DOWNLOAD</div>
      //               </button> 
      //               </div>
      //             </div>

      //             <div className = 'row'>
      //               <h2>GRAPH</h2>
      //             </div>

      //             <div className="update"><Graph title = "Voltage magnitude profile" dataPoints = {outputData}/></div>
      //             <div className="update"><Graph title = "Voltage angle profile" dataPoints = {outputData}/></div>
                 
      //             </>
      //           ) : loading ? <Loading/> : <div></div>
      //         }
      //       </>  
      //       ) : <div></div> 
      //   }
      // </>
      <>
      <div className="tree-container">
          <Tree></Tree>
      </div>

      </>
    );
  }
  
export default ParseExcel;