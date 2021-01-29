import React,{useState} from 'react'
import './App.css';
import Login from './LoginPage.js';
import Home from './Home.js';
import Admin from './Admin.js';
import User from './User.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,Redirect
} from "react-router-dom";

function App() {
  const [loginPage,showLoginPage,login,logout]=Login();
  const [dataForUser, setdataForUser] = useState("")
  function getDataFromAdmin(data){
    setdataForUser(data);
  }
  return (
    <div className="App">
      <Router>
      {login===""?<Redirect
          to={{
            pathname: "/"
          }}
        />:null}
        {loginPage}
        <div className="navbar">
          {login===""?<a className="loginText" onClick={showLoginPage} style={{cursor:'pointer'}}>LogIn</a>:<Link to="/"><a className="loginText" onClick={()=>logout("")} style={{cursor:'pointer'}}>LogOut</a></Link>}
        </div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/admin" render={props=>(<Admin {...props} getDataFromAdmin={getDataFromAdmin}/>)} />
          <Route path="/user" render={props=>(<User {...props} giveDataToUser={dataForUser}/>)} />
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
