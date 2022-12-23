import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../new/new.scss";
import Cookies from "js-cookie";



function EditPoints(props) {
  const [errors, setErrors] = useState("");
  const [address, setAddress] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataType, setDataType] = useState("");
  const userId = Cookies.get("id");

  const deviceId = window.location.href.split("/devices/")[1].split(`/points/edit/`)[0];
  const pointId = window.location.href.split("/devices/")[1].split("/points/edit/")[1];

  const getPoint = async () => {
    try {
      await Axios.get(
        `http://localhost:5000/devices/${deviceId}/points/${pointId}/?id=${userId}`
      ).then((response) => {
        setAddress(response.data[0].address);
        setDataDescription(response.data[0].data_description);
        setDataType(response.data[0].data_type);
      
      });
    } catch (err) {
      console.log(err);
    }
  };




  const updatePoint = async () => {
    try {
      await Axios.put( `http://localhost:5000/devices/${deviceId}/points/${pointId}/?id=${userId}`, {
        "address": address,
        "dataDescription": dataDescription,
        "dataType": dataType,
      }).then((response) => {
        if (response.data === "Success") {
          alert("Succesfully updated the point");
          window.location.assign(`http://localhost:3000/devices/${deviceId}/points`);
        } else {
          setErrors(response.data);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    if (!address || !dataDescription || !dataType) {
      alert("Please enter all field");
    } else {
      updatePoint();
    }
    e.preventDefault();
  };

  useEffect(() => {
    getPoint();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (

      <div className="new">
      <h1
        className="newTitle"
        style={{ color: "#rgb(195 33 40)", borderBottomColor: "rgb(93 39 124)" }}
      >
        Edit Point
      </h1>
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
        <div className="newDeviceItem">
          <label>DataType</label>
          <input
            onChange={(e) => setDataType(e.target.value)}
            type="text"
            name="dataType"
            placeholder="Data Type"
            value={dataType}
          />
        </div>
        <div className="newDeviceItem">
          <button
            style={{ backgroundColor: "rgb(87 31 133)", color: "white" }}
            type="submit"
          >
            Save Point
          </button>
        </div>
      </form>

      <p className="error">{errors}</p>
    </div>
  );
}

export default EditPoints;
