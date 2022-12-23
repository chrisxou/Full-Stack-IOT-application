import React, { useState } from "react";
import Axios from "axios"
import "./new.scss";
import Cookies from "js-cookie";

function New() {
  const [errors, setErrors] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [method, setMethod] = useState("");
  const [port, setPort] = useState("");
  const userId = Cookies.get("id");


  function clear() {
    setName("");
    setType("");
    setMethod("");
    setPort("");
  }

  const postDevice = async() =>{
    try{
      await Axios.post(`http://localhost:5000/devices/?id=${userId}`,{
        name:name,
        type:type,
        method:method,
        port:port
      })
     .then((response) => {
      if(response.data === "Success"){
        setErrors("");
        alert("Succesfully added the device");
        window.location.assign(`http://localhost:3000/devices`);
      }
      else{
        setErrors(response.data);
      }
    });
    }catch(err){
      console.error(err.message);
    }
  }

  const handleSubmit = async (e) => {
    if (!name || !type || !method || !port) {
      setErrors("Please enter all field");
    } else {
      postDevice();
    }
    clear();
    e.preventDefault();
  };

  return (
    <div className="new">
      <h1 className="newTitle">New Device</h1>
      <form onSubmit={handleSubmit} className="newDeviceForm">
        <div className="newDeviceItem">
          <label>Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="newDeviceItem">
          <label>Type</label>
          <input
            onChange={(e) => setType(e.target.value)}
            type="text"
            name="type"
            placeholder="Type"
            value={type}
          />
        </div>
        <div className="newDeviceItem">
          <label>Method</label>
          <input
            onChange={(e) => setMethod(e.target.value)}
            type="text"
            name="method"
            placeholder="Method"
            value={method}
          />
        </div>
        <div className="newDeviceItem">
          <label>Port</label>
          <input
            onChange={(e) => setPort(e.target.value)}
            type="text"
            name="port"
            placeholder="Port"
            value={port}
          />
        </div>
        <div className="newDeviceItem">
          <button type="submit">Add</button>
        </div>
      </form>

      <p className="error">{errors}</p>
    </div>
  );
}

export default New;
