import React  from "react"
import * as XLSX from 'xlsx/xlsx.js';
import {useState, useEffect} from 'react';

import CanvasJSReact from '../assets/js/canvasjs.react';


import Table from './table.js';
import './parseExcell.css';


const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// parsing the excell file


const ParseExcell = () => {
  const [data, setData] = useState(1);
  const [excelDatajson, setexceldatajson] = useState(1);

  const [dataPoints, setDataPoints] = useState([]);
  const [resultreceived, setresultreceived] = useState(0);
  // const [count, setcount] = useState(0);

  let d;
  const options = {
      theme: "light2",
      title: {
        text: "Voltage magnitude Profile"
      },
      data: [{
        type: "line",
        dataPoints: dataPoints
      }]
    }

    // updating the graph data points
    useEffect(
    () => {
      let arr = [];
      // let arr = [];
      for(let i = 0 ; i < data.length; i++){
        arr.push(
          {
            x : i + 2,
            y : data[i].Voltage_magnitude
          }
        );
      }
      setDataPoints(arr);
    }, [resultreceived] );

    

    const baseUrl = 'http://localhost:3000/dmMethod';
    const handleFile = async (e) => {
        const file = e.target.files[0];
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const fetchedData = XLSX.utils.sheet_to_json(worksheet);
      setexceldatajson(fetchedData);
      setresultreceived(0);
      // console.log(JSON.stringify(excelDatajson))
      // console.log(JSON.stringify(jsonData))
      // console.log(typeof(jsonData));
     }

//sending request to run algo in backend

    const runPythonScript = async (e) => {
        const res = await fetch(baseUrl ,{
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({parcel: excelDatajson})
        })
        
        d = await res.json();
        // console.log(d);
        // console.log(typeof(d));
        // d = JSON.stringify(d);
        d = JSON.parse(d[0]);
        d = addBusNo(d);
        setData(d);
        setresultreceived(1)
    }

// downloading results in excell sheet button
    const downloadExcel = (data) => {
      // if(data !== null && data !== undefined && Object.keys(data).length === 0) return ;
      // data = convertedData(data);
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "Node_Voltage_data.xlsx");
    };

// adding Bus No property to each object of data
    const addBusNo = (d) => {
      let res = [];
        for(let i = 0; i < d.length; i++){
          res.push(
          {
            Bus_No : i + 2,
            Voltage_magnitude : d[i].Voltage_magnitude,
            Voltage_angle : d[i].Voltage_angle,
          }
          );
        }
  
      return res;
    }
    
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
          excelDatajson !== 1 ? 
            (
            <>
              <>
                <h2>Click here to run the program.</h2>
                <button className = 'parseButton' onClick={() => runPythonScript()}>RUN</button>
              </>
               
              {
                resultreceived ? (
                <>

                  <div className = 'col'>
                    <h2>Download the Results</h2>
                    <button className = 'parseButton' onClick={() => downloadExcel(data)}>Download</button> 
                  </div>

                  <div className = 'row'>
                    <Table jsonData = {data}/>
                  </div>

                  <div className = 'resultChart'>
                    <CanvasJSChart  options = {options}/>
                  </div>

                </>
                ) : <div></div>
              }
            </>  ) : <div></div> 
        }
        </div>
      </>
    );
  }
  
export default ParseExcell;