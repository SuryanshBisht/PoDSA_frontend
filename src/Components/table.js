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

    let data = addBusNo(props.jsonData);
    
    return(
        <div className = 'table-container' > 
          <table className="table-div">      
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

          </table>
        
        </div>
    )


}

export default Table;