import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./devices.scss";
import ListDevices from "../../components/lists/ListDevices";
import Cookies from "js-cookie";
import Temperature from "./temperature.png";
import Humidity from "./humidity.png";

function Devices() {
  const [devices, setDevices] = useState("");
  const [query, setQuery] = useState("");
  const userId = Cookies.get("id");

  const getDevices = async () => {
    try {
      await Axios.get(`http://localhost:5000/devices/all/?id=${userId}`).then(
        (response) => {
          setDevices(response.data);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const search = () => {
    return Array.isArray(devices)
      ? devices?.filter(
          (device) =>
            device.name.toLowerCase().includes(query) ||
            device.type.toLowerCase().includes(query) ||
            device.method.toLowerCase().includes(query) ||
            device.port.toString().includes(query)
        )
      : null;
  };

  useEffect(() => {
    getDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userId !== "34" ? (
        <div className="devices">
          <h1 className="newTitle">Devices</h1>

          <button>
            <a href={`http://localhost:3000/devices/new`}>Add new Device</a>
          </button>

          <input
            className="search"
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />

          {devices.length > 0 ? (
            <ul className="list">
              <table>
                <tbody className="listBody">
                  <tr>
                    <th style={{ width: "80px" }}>points</th>
                    <th style={{ width: "50px" }}>id</th>
                    <th>name</th>
                    <th>type</th>
                    <th>method</th>
                    <th style={{ width: "60px" }}>port</th>
                    <th style={{ width: "40px" }}></th>
                    <th style={{ width: "40px" }}></th>
                  </tr>

                  {search()?.map((device, index) => (
                    <ListDevices
                      key={device.id}
                      device={device}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </ul>
          ) : (
            <h5 style={{ textAlign: "center", paddingTop: "20px" }}>
              There are no devices. Please add new device.
            </h5>
          )}
        </div>
      ) : (
        <div className="devices">
          <h1 className="newTitle">Devices</h1>
          <div className="container">
            <a
              href={"http://localhost:3000/devices/64/points"}
              className="btn"
            >
              <div className="box">
                <img src={Temperature} alt="temperature"/>
                <h3>Temperature Sensors</h3>
              </div>
            </a>

            <a
              href={"http://localhost:3000/devices/65/points"}
              className="btn"
            >
              <div className="box">
                <img src={Humidity}  alt="humidity"/>
                <h3>Humidity Sensors</h3>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Devices;
