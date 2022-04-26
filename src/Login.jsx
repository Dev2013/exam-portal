import React ,{useState} from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login ({setIsAuthorized}) {
    const history = useHistory();
    const [loginState,setLoginState] = useState({
        username:'',
        password:''
    })
    const [showAert,setShowAlert] = useState(false)
    const handleSubmit =async(e)=>{
      setShowAlert(false);
        e.preventDefault();
        if(loginState.username && loginState.password){
     
      axios.post('http://ec2-54-227-175-220.compute-1.amazonaws.com:8080/authenticate', {
        ...loginState
      })
      .then(async function (response) {
        await sessionStorage.setItem("token", response.data.token);
        setIsAuthorized(true)
        await history.push('/dashboard')
      })
      .catch(function (error) {
        setShowAlert(true)
      });
    }
    }
        return (
          <>
          <div style={{backgroundColor:"#18546e",width:"100%",height:"calc(90vh - 5px)"}}>
        
            <div className="auth-inner" >
            <form noValidate onSubmit={handleSubmit} style={{overflow : "hidden"}}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>UserName</label>
                    <input type="text" className="form-control" placeholder="Enter email" required 
                    value={loginState.username}
                    onChange={(e)=>{setLoginState((prevSate)=>({...prevSate,username:e.target.value}))}}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"  required 
                     value={loginState.password}
                     onChange={(e)=>{setLoginState((prevSate)=>({...prevSate,password:e.target.value}))}}/>
                </div>

              {showAert && <p class="fs-5" style={{color: 'red'}}>Username or password incorrect</p>}
               <span style={{display: 'flex', justifyContent:"center",width:"100%"}}> <button type="submit" className="btn btn-primary btn-block" style={{marginTop:"30px",}}>Submit</button></span>
                {/* <div style={{marginTop:"10px",display:"flex",justifyContent:"space-between", alignItems:"center", fontSize:"20px"}}> {"Not a user? " }  */}
                {/* <Link className="navbar-brand" to={"/sign-up"}  style={{marginTop:"10px",display:"flex",justifyContent:"space-between", alignItems:"center", fontSize:"20px"}} >Register Here</Link> */}
                {/* </div> */}
            </form>    
            </div>           
            </div>
            </>
        );
   
}