import React,{useState} from 'react'
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [loading, setloading] = useState(false);
    const [logintype, setlogintype] = useState("");
    function login(event){
        setlogintype(event.target.innerText);
        setloading(false);
    }
    return [loading?
        <div className="loginPage">
            <div>
            <div className='popup'>
                <div className="close" onClick={()=>setloading(false)}>x</div>
                <img width="100" height="100" src="data:image/jpeg;base64,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" />
                <div className="form">
                    <input 
                        type="text"
                        placeholder="Username"
                    />
                    <input 
                        placeholder="Password"
                        type="password"
                    />
                    <button type='submit'>Submit</button>
                    <hr></hr>
                    <p style={{color:'black'}}>As there is no Database use this for Admin/User Login</p>
                    <Link to="/admin"><button type='submit' onClick={login}>Admin</button></Link> 
                    <Link to="/user"><button type='submit' onClick={login}>User</button></Link> 
                </div>
            </div>
            </div>
        </div>:null
        ,
        ()=>setloading(true),
        logintype,
        (e)=>setlogintype(e)
    ]
}


export default LoginPage;
