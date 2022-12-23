import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../new/new.scss";
import Cookies from "js-cookie";

function Edit(props) {
  const [errors, setErrors] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [method, setMethod] = useState("");
  const [port, setPort] = useState("");
  const userId = Cookies.get("id");

  const deviceId = props.id.split("/devices/edit/")[1];

  const getDevice = async () => {
    try {
      await Axios.get(
        `http://localhost:5000/devices/${deviceId}/?id=${userId}`
      ).then((response) => {
        setName(response.data[0].name);
        setType(response.data[0].type);
        setMethod(response.data[0].method);
        setPort(response.data[0].port);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateDevice = async () => {
    try {
      await Axios.put(`http://localhost:5000/devices/${deviceId}/?id=${userId}`, {
        name: name,
        type: type,
        method: method,
        port: port,
      }).then((response) => {
        if (response.data === "Success") {
          alert("Succesfully updated the device");
          window.location.assign(`http://localhost:3000/devices`);
        } else {
          setErrors(response.data);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    if (!name || !type || !method || !port) {
      alert("Please enter all field");
    } else {
      updateDevice();
    }
    e.preventDefault();
  };

  useEffect(() => {
    getDevice();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <div className="new">
      <h1
        className="newTitle"
        style={{ color: "#296a25", borderBottomColor: "rgb(41, 106, 37)" }}
      >
        Edit Device
      </h1>
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
          <button
            style={{ backgroundColor: "rgb(16 58 92)", color: "white" }}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>

      <p className="error">{errors}</p>
    </div>
  );
}

export default Edit;
