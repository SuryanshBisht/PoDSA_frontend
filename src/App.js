import React from "react";
import ParseExcel from "./Components/parseExcel.js";
import Navbar from "./Components/navbar.js";
import Contributors from "./Components/contributors.js";
// import Theory from "./Components/theory.js";


import './App.css' ;
import { Route, Routes } from "react-router-dom";



function App() {
  return (
    <>
    <div className = 'home'>
      <Navbar/>
    <Routes>
      <Route exact path="/" element={<ParseExcel/>} />
      {/* <Route exact path="/theory" element={<Theory/>} /> */} 
      <Route exact path="/contributors" element={<Contributors/>} />
    </Routes> 
    </div>
    </>
  );
}

export default App;
