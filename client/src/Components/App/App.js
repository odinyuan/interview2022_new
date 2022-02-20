import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import User from '../User/User';

const App = () => {
  return (
      <div className = "App">
      <Router>
        <Routes>
          <Route path="/User" element={<User />}/>
          <Route path="/" element = {<MainPage />} /> 
        </Routes>
      </Router>  
      </div>
  )}
export default App;