import './App.css';
import {Link, Outlet} from "react-router-dom";
import React from "react";
import Header from './components/Header.js';

function App() {
  return (
    <div className="App">
      <Header/>
      <nav className="App-progress"> 
        <Link className="nav-link" to={'/'}>Input</Link>
        <Link className="nav-link" to={'/expenses'}>Expenses</Link>
        <Link className="nav-link" to={'/list'}>List</Link>
        <Link className="nav-link" to={'/result'}>Result</Link> 
      </nav>
      <main classname="App-main">
      <Outlet/>
      </main>
      

    </div>
  );
}

export default App;
