import "./App.css";

import { useEffect, useState } from "react";
import PostFeed from "./components/feed";
import Login from "./components/login";
import Signup from "./components/signup"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";



function App() {

  

  
  return (
    <Router>
    <Routes>
      <Route path="/" element ={<PostFeed/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/signup" element ={<Signup/>}/>
    </Routes>
    </Router>
  );
}

export default App;
