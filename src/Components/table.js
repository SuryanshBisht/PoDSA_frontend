import React from 'react';
import './table.css';

const Table = (props) => {
    let data = props.jsonData;
    // if(!(data === 1 && data !== null && data !== undefined && Object.keys(data).length !== 0)) return <div>  </div>
    return(
        <div className = 'table-container'>
            <div className = 'row table-header'>
                <div className = 'col'>Bus Number</div>
                <div className = 'col'> Voltage_magnitude (in kV)</div>
                <div className = 'col'> Voltage_angle (in degrees)</div>
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
        <div> main ki bkc</div>
        </div>
    )


}

export default Table;