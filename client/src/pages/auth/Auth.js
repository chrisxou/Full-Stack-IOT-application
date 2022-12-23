import React, { useState } from "react"
import Axios from "axios"
import Cookies from 'js-cookie'
import "./auth.scss"


const Auth = () =>{

  // Hooks
  let [authMode, setAuthMode] = useState("login");
  const [errors,setErrors] =useState(""); 
  const [name,setName] =useState("");
  const [password,setPassword] =useState("");
  const [email,setEmail] =useState("");
  

  // Clear form when submitted or changed mode
  function clear() {
    setName("");
    setPassword("");
    setEmail("");
  }

  // Change Mode (Sign In - Sign up)
  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login")
    setErrors("");
    clear();
  }

  // Post to server
  // Sign in
  const postLogin = async() =>{
    try{
       await Axios.post("http://localhost:5000/login",{
          email:email,
          password:password
       })
       .then((response) => {
        if (response.data.id){
          Cookies.set("id",response.data.id);
          window.location.reload();
       }
        else{
    
          setErrors(response.data);
    }});
   }catch(err){
       console.error(err.message);
      }
   }

 // Sign up  
  const postSign = async() =>{
    try{
      await Axios.post("http://localhost:5000/sign",{
        name:name,
        email:email,
        password:password
     })
     .then((response) => {
      if(response.data === "Success"){
        alert("Succesfully registerd. Please sign in");
        changeAuthMode();
      }
      else{
        setErrors(response.data);
      }  
    });
    }catch(err){
      console.error(err.message);
    }
  }


  // Handle Sumbit
  const handleLoginSubmit= async e =>{
    if(!email || !password){
      setErrors("Please enter all field")  
    }
    else{
      postLogin();}
    clear()
    e.preventDefault();
  }
  
  const handleSignUpSubmit= async e =>{
    if(!name ||!email || !password){
      setErrors("Please enter all fields")  
    }
    else{
    postSign();
    }
    clear();
    e.preventDefault();
  }

  // Login Form
  if (authMode === "login") {
    return (
      <div className="Auth-form-container">
        <form onSubmit={handleLoginSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                onChange={(e) =>setEmail(e.target.value)}
                name="email"
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                onChange={(e) =>setPassword(e.target.value)}
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
            <p style={{color:"red", textAlign:"center"}}>{errors}</p>
          </div>
        </form>
      </div>
    )
  }
  // Sign up Form
  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSignUpSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>Sign In </span>
          </div>

          <div className="form-group mt-3">
            <label>Name</label>
            <input
              onChange={(e) =>setName(e.target.value)}
              name = "name"
              type="text"
              className="form-control mt-1"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              onChange={(e) =>setEmail(e.target.value)}
              name="email"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              onChange={(e) =>setPassword(e.target.value)}
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p style={{color:"red", textAlign:"center"}}>{errors}</p>
        </div>
      </form>
    </div>
  )
}

export default Auth;