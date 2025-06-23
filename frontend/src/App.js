//import logo from './logo.svg';
import './App.css';
import Home from "./Component/Home/home"
import Add from "./Component/AddUser/adduser"
import Details from "./Component/UserDetails/userDetails"
import React from 'react';
import {Route, Routes} from "react-router"

function App() {
  //js


  return (
    <div>
      {/* html */}    
        <React.Fragment>
          <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path ="/mainhome" element={<Home/>}/>
            <Route path ="/addUser" element={<Add/>}/>
            <Route path ="/userDetails" element={<Details/>}/>
          </Routes>
        </React.Fragment>

    </div>
  );
}

export default App;
