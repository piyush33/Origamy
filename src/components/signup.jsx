import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api";
import "../App.css";


function Signup (){
    const [email, setEmail] =useState("");
    const [userName, setUserName] =useState("");
    const [password, setPassword] =useState("");
    const navigate = useNavigate();

    const onSubmit=()=>{
        signup(email,password,userName)
        .then((user)=>{
            navigate("/login");
        })
        .catch(()=>{console.log("error in signing up")})
    }



    return(
        <>
        <div className="signupContainer">
        <div className="inputContainer">
            <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/> 
        </div>
        <div className="inputContainer">
            <input type="text" placeholder="username" value={userName} onChange={(e)=>setUserName(e.target.value)}/> 
        </div>
        <div className="inputContainer">
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/> 
        </div>
        <button onClick={onSubmit}>Sign up</button>
        <div className="redirectButton">
            <span>Already have an account ?</span> <span onClick={()=>{navigate("/login")}}><b>Log in</b></span>
        </div>
        </div>
        
        </>
    )
}

export default Signup;