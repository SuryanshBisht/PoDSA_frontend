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
        <div className = 'table-container cell'>
            <div className = 'row table-header'>
                <div className = 'col '>Bus Number</div>
                <div className = 'col '> Voltage(kV)</div>
                <div className = 'col '> Angle(degrees)</div>
            </div>
        {
            data.map(
            (info) => {
                return (
                    <div className = 'row' key = {info.Bus_No}>
                        <div className = 'col'>{info.Bus_No}</div>
                        <div className = 'col'>{info.Voltage_magnitude}</div>
                        <div className = 'col'>{info.Voltage_angle}</div>
                    </div>
                )
            }
            )  
        }
        </div>
    )


}

export default Table;