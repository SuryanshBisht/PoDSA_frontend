import React from 'react';
import './table.css';

// code to display results in form of table
const Table = (props) => {

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

    let data = (props.method === 'dmMethod') ? addBusNo(props.jsonData) : props.jsonData;
    
    return(
        <div className = 'table-container' > 
          <table className="table-div">  
          {
            (props.method === 'dmMethod2') ? 
            (
              <>
              <tr>
                <th>Bus Id </th>
                <th>Phase-1 Voltage(kV)</th>
                <th>Phase-1 Angle(degrees)</th>
                <th>Phase-2 Voltage(kV)</th>
                <th>Phase-2 Angle(degrees)</th>
                <th>Phase-3 Voltage(kV)</th>
                <th>Phase-3 Angle(degrees)</th>
              </tr>
               {
                  data.map((info) => {
                      return (
                          <tr>
                          <td>{info.Bus_Id}</td>
                          <td>{info.ph_1_v}</td>
                          <td>{info.ph_1_a}</td>
                          <td>{info.ph_2_v}</td>
                          <td>{info.ph_2_a}</td>
                          <td>{info.ph_3_v}</td>
                          <td>{info.ph_3_a}</td>
                         </tr>
                      )
                  })
                }
              </>
              ) : (
              <>
              <tr>
                <th>Bus Number</th>
                <th>Voltage(kV)</th>
                <th>Angle(degrees)</th>
              </tr>
               {
                  data.map(
                  (info) => {
                      return (
                           <tr>
                           <td>{info.Bus_No}</td>
                           <td>{info.Voltage_magnitude}</td>
                           <td>{info.Voltage_angle}</td>
                         </tr>
                      )
                  }
                  )
                }
                </>
              )
          }    
              

          </table>
        
        </div>
    )


}

export default Table;