import React from 'react';
import {ExcelRenderer, OutTable} from 'react-excel-renderer';

export const Tempo = () => {
    const fileHandler = (event) => {
        let fileObj = event.target.files[0];
        
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
            this.setState({
              cols: resp.cols,
              rows: resp.rows
            });
          }
        });               
        
    }
    return (
        <>
        <h1>Give the Input File</h1>
        <input type="file" onChange={(e) => fileHandler(e)}/>
        <OutTable data={this.state.rows} 
        columns={this.state.cols} 
        tableClassName="ExcelTable2007" 
        tableHeaderRowClass="heading" />
        </>
      )
}
   
  


