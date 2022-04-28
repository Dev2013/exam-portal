import React,{useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from './dashboard';
import Footer from './lib/Footer';
import Login from "./Login";
import SignUp from "./Signup";
import {Wrapper} from './Wrapper';
import Videos from './Videos';
import {Analysis} from './Analysis';

export const DataContext = React.createContext('light');


function App() {
  const [isAuthorized, setIsAuthorized] =useState(false)

  return (<DataContext.Provider value ={{data:{isAuthorized}}}><Router>
    <div className="App">
    <div className="auth-wrapper" style={{overflow:"hidden" ,marginTop:"40px",width:"100%", height:"100%"}}>
          <Switch>
            <Route exact path='/' render={()=><Login setIsAuthorized={setIsAuthorized}/>} />
            <Route path="/sign-in" render={()=><div style ={{display :"flex",justifyContent: "space-around" , width : "100vw"}}> <div style={{background:"black" ,height : "20px", width :"20px"}}><h1>xyz</h1></div>
            <Login setIsAuthorized={setIsAuthorized}/> </div>
            }/>
            
            <Route path="/Dashboard"  render={()=><Dashboard isAuthorized={true}/>} />
            <Route path="/MCQ/:id" exact render={()=><Wrapper isAuthorized={true}/> }/>
            <Route path="/video" exact render={()=><Videos isAuthorized={isAuthorized}/> }/>
            <Route path="/reports" exact render={()=><Analysis isAuthorized={isAuthorized}/> }/>
          </Switch>
        </div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container" style={{backgroundColor:"#FFF"}}>
          <Link className="navbar-brand" to={"/Dashboard"}><img src="./3.svg.svg" height={30} width="70" /> BDCOE</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            </ul>
          </div>
        {isAuthorized &&  <button className="btn btn-primary btn-lg" onClick={()=>{
            sessionStorage.clear();
          setIsAuthorized(false)
         }}>Logout</button>} 
        </div>
      </nav>
    </div>
    <Footer/>
    </Router></DataContext.Provider>
  );
}

export default App;