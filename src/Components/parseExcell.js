import React  from "react"
import * as XLSX from 'xlsx/xlsx.js';
import {useState, useEffect} from 'react';

import CanvasJSReact from '../assets/js/canvasjs.react';

import Table from './table.js';
import './parseExcell.css';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// parsing the excel file

const ParseExcell = () => {
  const [data, setData] = useState([
      {Bus_No: 2, Voltage_magnitude: 10.865, Voltage_angle: 0.071},
      {Bus_No: 3, Voltage_magnitude: 10.622, Voltage_angle: -0.884},
      {Bus_No: 4, Voltage_magnitude: 10.418, Voltage_angle: -1.542},
      {Bus_No: 5, Voltage_magnitude: 10.398, Voltage_angle: -1.588},
      {Bus_No: 6, Voltage_magnitude: 10.437, Voltage_angle: -1.338}
    ])
  const [excelDatajson, setexceldatajson] = useState({});
  const [excelextracted, setexcelextracted] = useState(0);
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
      console.log('result received');

      console.log('excel data:');
      console.log(excelDatajson);

      console.log('data:');
      console.log(data);
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
    }, [resultreceived]);

    // useEffect(
    //   () => {
    //     // setexceldatajson(d);
    //     console.log(JSON.stringify(excelDatajson))
    //   }, [excelextracted]);

    const baseUrl = 'http://localhost:3000/dmMethod';
    const handleFile = async (e) => {
      const file = e.target.files[0];
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const fetchedData = XLSX.utils.sheet_to_json(worksheet);
      setexceldatajson(fetchedData);
      setresultreceived(0);
      setexcelextracted(1);
      // console.log(fetchedData);
      console.log('extracted data as :');
      // setData(1);
      console.log(fetchedData);
      // console.log(JSON.stringify(excelDatajson));
      // console.log(JSON.stringify(jsonData))
      // console.log(typeof(jsonData));
    }

//sending request to run algo in backend

    const runPythonScript = async (e) => {
      console.log('data sent as :');
      console.log(excelDatajson);
        const res = await fetch(baseUrl ,{
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({parcel: excelDatajson})
        })

        // console.log('before d');
        // console.log(d);
        // console.log('response received as');
        // console.log(res);
        try{
          d = await res.json();
          console.log(d);
          // d = JSON.stringify(d);
          d = JSON.parse(d[0]);
          // console.log('after d before bus no');
          // console.log(d);
          d = addBusNo(d);
          setresultreceived(resultreceived + 1);
          setData(d);
          console.log('after d with bus no');
          console.log(d);
          // console.log('data');
          // console.log(data);
        }
        catch(error){
          console.log('loda crashed with error :-');
          console.log(error);
        }
        
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
          excelextracted ? 
            (
            <>
              <>
                <h2>Click here to run the program.</h2>
                <button className = 'parseButton' onClick={() => runPythonScript()}>RUN</button>
              </>
              {
                resultreceived > 0 ? (
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