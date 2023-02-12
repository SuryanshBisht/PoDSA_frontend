import React from 'react';
import './table.css';


const Table = (props) => {
    if(Object.keys(props.jsonData).length === 0) return <div>  </div>
    let data = props.jsonData;
    return(
        <>
        <div className = 'table-container'>
        <div className = 'col col-1' key = {"1"}>
        <div className = 'heading cell'>
        Bus Number
        </div>
        {
           Object.entries(data.Voltage_magnitude).map(
                (entry) => {
                    let v = entry[0];
                 return(
                    <>
                    <div className = 'cell' key = {v}>
                        <div>{v}</div>
                    </div>
                    </>
                    );
                }
            ) 
        }   
        </div>

        <div className = 'col' key = {"2"}>
        <div className = 'heading cell'>
        Voltage magnitude(V)
        </div>
        {
           Object.entries(data.Voltage_magnitude).map(
                (entry) => {
                    let v = entry[0];
                    let val = entry[1];
                    return(
                    <>
                        <div className = 'cell'  key = {v}>
                        <div>{val}</div>
                    </div>
                    </>
                    );
                }
            ) 
        }   
        </div>

        <div className = 'col' key = {"3"}>
        <div className = 'heading cell'>
        Voltage angle(radians)
        </div>
        {
           Object.entries(data.Voltage_angle).map(
                (entry) => {
                    let v = entry[0];
                    let val = entry[1];
                    return(
                    <>
                      <div className = 'cell'  key = {v}>
                        <div>{val}</div>
                    </div>
                    </>
                    );
                }
            ) 
        }   
        </div>
        </div>
        </>
    )
}

export default Table;