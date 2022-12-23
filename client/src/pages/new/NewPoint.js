import React, { useState } from "react";
import Axios from "axios"
import "./new.scss";
import Cookies from "js-cookie";

function NewPoint() {
  const [errors, setErrors] = useState("");
  const [address, setAddress] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataType, setDataType] = useState("Float");
  const userId = Cookies.get("id");

  const deviceId = window.location.href.split("/devices/")[1].split(`/points`)[0];



  const postPost = async() =>{
    try{
      await Axios.post( `http://localhost:5000/devices/${deviceId}/points/?id=${userId}`,{
        "address": address,
        "dataDescription": dataDescription,
        "dataType": dataType,
      })
     .then((response) => {
      if(response.data === "Success"){
        setErrors("");
        alert("Succesfully added the point");
        window.location.assign(`http://localhost:3000/devices/${deviceId}/points`);
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
    if (!address || !dataDescription || !dataType) {
      setErrors("Please enter all field");
    } else {
      postPost();
    }
    e.preventDefault();
  };

  return (
    <div className="new">
    {userId === "34" ? (   
      <h1 className="newTitle">Προσθήκη Αισθητήρα</h1>
      ) : (
        <h1 className="newTitle">New Point</h1>
      )}

      <form onSubmit={handleSubmit} className="newDeviceForm">
        <div className="newDeviceItem">
          <label>Address</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            name="address"
            placeholder="Address"
            value={address}
          />
        </div>
        <div className="newDeviceItem">
          <label>DataDescription</label>
          <input
            onChange={(e) => setDataDescription(e.target.value)}
            type="text"
            name="dataDescription"
            placeholder="Data Description"
            value={dataDescription}
          />
        </div>

        {userId === "34" ? (  
        <div className="newDeviceItem">
          <label>DataType</label>
          <input
            onChange={(e) => setDataType("Float")}
            type="text"
            name="dataType"
            placeholder="Data Type"
            value={dataType}
          />
        </div>
        ) : (
        
          <div className="newDeviceItem">
          <label>DataType</label>
          <input
            onChange={(e) => setDataType(e.target.value)}
            type="text"
            name="dataType"
            placeholder="Data Type"
            value={null}
          />
        </div>


          )}




       <div className="newDeviceItem">
          <button type="submit">Add</button>
        </div>
      </form>

      <p className="error">{errors}</p>
    </div>
  );
}

export default NewPoint;
