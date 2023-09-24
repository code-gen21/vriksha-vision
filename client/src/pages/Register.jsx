import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import Logo from '../assets/tree-bg3.jpg';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const navigate=useNavigate();
    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    const toastOptions={
        position:"top-center",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }


   
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(handleValidation()){
            const {password,username,email}=values;
            const {data}=await axios.post(registerRoute,{
                username,email,password
            });
            if(data.status===false){
                toast.error(data.msg,toastOptions);
            }
            if(data.status===true){
                navigate('/home');
            }
        }
       
    }
    const handleValidation=()=>{
        const {password,email,username,confirmPassword}=values;
        if(password!==confirmPassword){
            toast.error("Password and confirm password should be same",toastOptions);
            return false;
        }
        else if(username.length<3){
            toast.error("Username should be greater than 3 characters",toastOptions);
            return false;
        }
        else if(password.length<1){
            toast.error("Enter a password",toastOptions);
            return false;
        }
        else if(email===""){
            toast.error("Email is required",toastOptions);
            return false;
        }
        return true;
    }
    const handleChange=(event)=>{
         setValues({...values,[event.target.name]:event.target.value});
    }
  return<>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="brand">
                <img src="" alt="" />
                <h1>Vriksha Vision</h1>
            </div>
            <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)} />
            <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)} />
            <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)} />
            <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e)=>handleChange(e)} />
            <button type="submit">Create User</button>
            <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
    </FormContainer>
    <ToastContainer />
  </>
}

const FormContainer=styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-image:url(${Logo});
    background-size:cover;
    background-repeat:no-repeat;
    .brand{
        display:flex;
        align-items:center;
        // gap:1rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color:green;
            text-transform:uppercase;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:white;
        border-radius:2rem;
        border:0.15rem dotted #32cd32;
        padding: 3rem 5rem;
        input{
            background-color:transparent;
            padding:1rem;
            border:0.2rem solid black;
            border-radius: 0.4rem;
            color:black;
            font-size:1rem;
            &:focus{
                border:0.2rem solid green;
                outline:none;
            }
        }
        button{
            background-color:black;
            color:#32cd32;
            padding:1rem 2rem;
            border:none;
            font-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition:.2s ease-in-out;
            &:hover{
                padding-top:0.8rem;
                padding-bottom:1.2rem;
            }
        }
        span{
            color:black;
            text-transform:uppercase;
            a{
                color:green;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }
`;

export default Register