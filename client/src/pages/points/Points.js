import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../devices/devices.scss";
import ListPoints from "../../components/lists/ListPoints";
import "./points.scss";
import Cookies from "js-cookie";

function Points() {
  const [points, setPoints] = useState("");
  const [query, setQuery] = useState("");
  const [device, setDevice] = useState("");
  const userId = Cookies.get("id");

  const deviceId = window.location.href
    .split("/devices/")[1]
    .split("/points")[0];

  const getDevice = async () => {
    try {
      await Axios.get(
        `http://localhost:5000/devices/${deviceId}/?id=${userId}`
      ).then((response) => {
        setDevice(response.data[0]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getPoints = async (deviceId) => {
    try {
      await Axios.get(
        `http://localhost:5000/devices/${deviceId}/points/all/?id=${userId}`
      ).then((response) => {
        setPoints(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const search = () => {
    return Array.isArray(points)
      ? points?.filter(
          (point) =>
            point.address.toLowerCase().includes(query) ||
            point.data_description.toLowerCase().includes(query) ||
            point.data_type.toLowerCase().includes(query)
        )
      : null;
  };

  useEffect(() => {
    getPoints(deviceId);
    getDevice();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="devices">
     {userId !== "34" ? (
      <>
        <h1 className="newTitle point">Points</h1>

        <div className="showDevice">
          <h5>Device</h5>
          <div className="deviceDetail">
            <b>Name:</b><p>{device.name}</p>
          </div>
          <div className="deviceDetail">
            <b>Type: </b> <p>{device.type}</p>
          </div>
          <div className="deviceDetail">
            <b>Method: </b> <p>{device.type}</p>
          </div>
          <div className="deviceDetail">
            <b>Port: </b> <p>{device.type}</p>
          </div>
        </div>
      </>
     ) : (
      <>
        {deviceId==="64" ? <h1 className = "newTitle point">Temperature Sensor</h1>: <h1 className="newTitle point">Humidity Sensor</h1>}
        </>
      )}
        
      {userId !== "34" ? (   
        <>
        <button>
          <a href={`http://localhost:3000/devices/${device.id}/points/new`}>
           Add new Point
          </a>
        </button>
        </>
        ) : (
          <>
        <button>
          <a href={`http://localhost:3000/devices/${device.id}/points/new`}>
            Προσθήκη Αισθητήρα
          </a>
        </button>
        </>
        )}

        <input
          className="search"
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />

        {points.length > 0 ? (
          <ul className="list">
            <table>
              <tbody className="listBody">
                <tr>
                  <th style={{ width: "70px" }}>Graph</th>
                  <th style={{ width: "75px" }}>ID</th>
                  <th style={{ width: "200px" }}>Address</th>
                  <th style={{ width: "200px" }}>Description</th>
                  <th>Type</th>
                  <th style={{ width: "40px" }}></th>
                  <th style={{ width: "40px" }}></th>
                </tr>

                {search()?.map((point, index) => (
                  <ListPoints
                    key={point.id}
                    point={point}
                    index={index}
                    device={deviceId}
                  />
                ))}
              </tbody>
            </table>
          </ul>
        ) : (
          <p style={{ textAlign: "center", paddingTop: "50px" }}>
            There are no points in the device.
          </p>
        )}
      </div>
  
    </>
  );
}

export default Points;
