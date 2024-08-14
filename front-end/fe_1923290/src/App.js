import './App.css';
import {Link, Outlet} from "react-router-dom";
import React from "react";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import './components/Layout.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <nav className="App-progress"> 
        <Link className="nav-link" to={'/'}>Income</Link>
        <Link className="nav-link" to={'/expenses'}>Expenses</Link>
        <Link className="nav-link" to={'/list'}>List</Link>
        <Link className="nav-link" to={'/result'}>Result</Link> 
      </nav>
      <main classname="App-main">
      <Outlet/>
      </main>
      <br>
      </br>

      <Footer/>
      
    </div>
  );
}

export default App;
