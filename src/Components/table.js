
import React from 'react';
import './table.css';

// code to display results in form of table
const Table = (props) => {
    let data = props.jsonData;
    // if(!(data === 1 && data !== null && data !== undefined && Object.keys(data).length !== 0)) return <div>  </div>
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
                        <div className = 'col '>{info.Voltage_magnitude}</div>
                        <div className = 'col '>{info.Voltage_angle}</div>
                    </div>
                )
            }
            )    
        }
        </div>
    )


}

export default Table;