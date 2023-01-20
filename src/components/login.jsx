import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import "../App.css";
import {signIn} from "../actions";
import {useDispatch} from "react-redux";


function Login (){

    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit=()=>{
        login(email,password)
        .then((user)=>{
            dispatch(signIn(user));
            navigate("/");

        })
        .catch(()=>{console.log("error in login")})


    }

   


    return(
        <>
        <div className="loginContainer">
        <div className="emailContainer">
            <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/> 
        </div>
        <div className="passwordContainer">
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/> 
        </div>
        <button className="submitButton" onClick={onSubmit}>Log in</button>
        <div className="redirectButton">
            <span  >Don't have an account ?</span> <span onClick={()=>{navigate("/signup")}}><b>Sign up</b></span>
        </div>
        </div>
        

        </>
    )
}

export default Login;