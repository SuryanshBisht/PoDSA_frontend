import React from "react";
import ParseExcell from "./Components/parseExcell.js";
import Table from "./Components/table.js" 


function App() {
  const data = [

    {
        "id":1,
        "name":"Akshit",
        "city":"Moradabad"
    },
    
    {
        "id":2,
        "name":"Nikita",    
        "city":"Lucknow"
    },
    
    {
        "id":3,
        "name":"Deeksha",
        "city":"Noida"
    },
    
    {
        "id":4,
        "name":"Ritesh",
        "city":"Delhi"
    },
    
    {
        "id":5,
        "name":"Somya",
        "city":"Gurugram"
    },
    
    {
        "id":6,
        "name":"Eshika",
        "city":"Mumbai"
    },
    {
        "id":7,
        "name":"Kalpana",
        "city":"Rampur"
    },
    
    {
        "id":8,
        "name":"Parul",
        "city":"Chandigarh"
    },
    
    {
        "id":9,
        "name":"Himani",
        "city":"Dehradun"
    }
];

  return (
    <>
   <ParseExcell/> 
   <Table jsonData = {data} />
    </>
  );
}

export default App;
