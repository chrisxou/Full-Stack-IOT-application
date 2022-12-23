import React, { useState, useEffect } from "react";
import "./graph.scss";
import Axios from "axios";
import Cookies from "js-cookie";

function Graph(props) {
  const [point, setPoint] = useState("");
  const [device, setDevice] = useState("");
  const [errors, setErrors] = useState("");
  const userId = Cookies.get("id");
  const [threshold, setThreshold] = useState("summer");
  const month = new Date();
  const current_month = month.getMonth() + 1;
  const [time, setTime] = useState("");
  const [lamia, setLamia] = useState("");

  const deviceId = window.location.href
    .split("/devices/")[1]
    .split(`/points/`)[0];
  const pointId = window.location.href
    .split("/devices/")[1]
    .split("/points/")[1];

  const GetTime = () => {
    setTime(Date.now());
  };


  const getLamiaTemp = async () => {
    try {
      await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=258620&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      ).then((response) => {
        setLamia(response.data.main.temp);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const findSeason = () => {
    if (current_month >= 4 && current_month <= 9) {
      setThreshold("summer");
    } else if (
      (current_month >= 10 && current_month <= 12) ||
      (current_month >= 1 && current_month <= 3)
    ) {
      setThreshold("winter");
    }
  };

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

  const getPoint = async () => {
    try {
      await Axios.get(
        `http://localhost:5000/devices/${deviceId}/points/${pointId}/?id=${userId}`
      ).then((response) => {
        setPoint(response.data[0]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const insertWinterData = async () => {
    try {
      await Axios.post(
        `http://localhost:5000/devices/${deviceId}/points/${pointId}/winterData/?id=${userId}`,
        {
          deviceId: deviceId,
          pointId: pointId,
        }
      ).then((response) => {
        if (response.data === "Success") {
          setErrors("");
          alert("Succesfully added current data");
          window.location.reload();
        } else {
          setErrors(response.data);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const insertSummerData = async () => {
    try {
      await Axios.post(
        `http://localhost:5000/devices/${deviceId}/points/${pointId}/summerData/?id=${userId}`,
        {
          deviceId: deviceId,
          pointId: pointId,
        }
      ).then((response) => {
        if (response.data === "Success") {
          setErrors("");
          alert("Succesfully added all data");
          window.location.reload();
        } else {
          setErrors(response.data);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const insertAllData = async () => {
    try {
      await Axios.post(
        `http://localhost:5000/devices/${deviceId}/points/${pointId}/allData/?id=${userId}`,
        {
          deviceId: deviceId,
          pointId: pointId,
        }
      ).then((response) => {
        if (response.data === "Success") {
          setErrors("");
          alert("Succesfully added all data");
          window.location.reload();
        } else {
          setErrors(response.data);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getDevice();
    getPoint();
    findSeason();
    GetTime();
    getLamiaTemp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Pannel */}

      <div className="graph">
        <div className="card">
          <div className="inner">
            <h2 className="title">Device</h2>
            <div className="informations">
              <p className="subtitle">
                {/* <b>Name:</b> {device.name} */}

                {userId === "34" ? (
                  <>
                    {deviceId === "64" ? (
                      <b>Temperature Sensor</b>
                    ) : (
                      <b>Humidity Sensor</b>
                    )}
                  </>
                ) : (
                  <>
                    {" "}
                    <b>Name:</b> {device.name}{" "}
                  </>
                )}
              </p>

              {userId !== "34" ? (
                <>
                  <p className="subtitle">
                    <b>Type:</b> {device.type}
                  </p>
                  <p className="subtitle">
                    <b>Method:</b> {device.method}
                  </p>
                  <p className="subtitle">
                    <b>Port:</b> {device.port}
                  </p>
                </>
              ) : null}
            </div>
            <hr />
            <h2 className="title">Point</h2>
            <div className="informations">
              <p className="subtitle">
                <b>Address:</b> {point.address}
              </p>
              <p className="subtitle">
                <b>Description:</b> {point.data_description}
              </p>
              <p className="subtitle">
                <b>Type:</b> {point.data_type}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons generate */}

        {userId === "34" ? (
          <>
            {deviceId === "64" ? (
              <>
                {threshold === "summer" ? (
                  <>
                    <div className="generate">
                      <button onClick={insertSummerData}>
                        Generate Temperature Summer Data
                      </button>
                    </div>
                    <p className="error">{errors}</p>
                  </>
                ) : (
                  <>
                    <div className="generate">
                      <button onClick={insertWinterData}>
                        Generate Temperature Winter Data
                      </button>
                    </div>
                    <p className="error">{errors}</p>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="generate">
                  <button onClick={insertAllData}>
                    Generate Humidity Data
                  </button>
                </div>
                <p className="error">{errors}</p>
              </>
            )}
          </>
        ) : (
          <>
            <div className="generate">
              <button onClick={insertAllData}>Generate Data</button>
            </div>
            <p className="error">{errors}</p>
          </>
        )}

        {/* Graphs */}

        {userId === "34" ? (
          <>
            {deviceId === "64" ? (
              <>
                {threshold === "summer" ? (
                  <iframe
                    className="frameGraph"
                    src={`http://localhost:3050/d-solo/xe6FZPZ4k/test?orgId=1&refresh=30s&from=${
                      time - 7200000
                    }&to=${time - 30000}&var-deviceId=${
                      device.id
                    }&var-pointsId=${pointId}&var-name=${
                      device.name
                    }&var-description=%CE%91%CE%AF%CE%B8%CE%BF%CF%85%CF%83%CE%B1+1&panelId=23`}
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    title="tempSummer"
                  ></iframe>
                ) : (
                  <iframe
                    className="frameGraph"
                    src={`http://localhost:3050/d-solo/xe6FZPZ4k/test?orgId=1&refresh=30s&from=${
                      time - 7200000
                    }&to=${time - 30000}&var-deviceId=${
                      device.id
                    }&var-pointsId=${pointId}&var-name=${
                      device.name
                    }&var-description=%CE%91%CE%AF%CE%B8%CE%BF%CF%85%CF%83%CE%B1+1&panelId=16`}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title="tempWinter"
                  ></iframe>
                )}
              </>
            ) : (
              <iframe
                src={`http://localhost:3050/d-solo/xe6FZPZ4k/test?orgId=1&from=${
                  time - 2592000000
                }&to=${time}&var-deviceId=${
                  device.id
                }&var-pointsId=${pointId}&var-name=${
                  device.name
                }&var-description=%CE%91%CE%AF%CE%B8%CE%BF%CF%85%CF%83%CE%B1+1&panelId=27`}
                width="100%"
                height="600"
                frameBorder="0"
                title="humidity"
              ></iframe>
            )}
          </>
        ) : (
          <iframe
            className="frameGraph"
            src={`http://localhost:3050/d-solo/xe6FZPZ4k/test?orgId=1&from=${
              time - 2592000000
            }&to=${time}&var-deviceId=${
              device.id
            }&var-pointsId=${pointId}&var-name=${
              device.name
            }&var-description=%CE%91%CE%AF%CE%B8%CE%BF%CF%85%CF%83%CE%B1+1&panelId=24`}
            width="100%"
            height="600"
            frameBorder="0"
            title="graph"
          ></iframe>
        )}
      </div>

      {/* Alert */}

      {userId === "34" ? (
        <>
          {deviceId === "64" ? (
            <>
              {threshold === "summer" ? (
                <>
                  {lamia > 27 ? (
                    <>
                      <h3 style={{ textAlign: "center", color: "#b10e06" }}>
                        Alerts
                      </h3>
                      <div style={{ textAlign: "center" }}>
                        <iframe
                          src={`http://localhost:3050/d-solo/xe6FZPZ4k/test?orgId=1&var-deviceId=${device.id}&var-pointsId=${pointId}&var-name=${device.name}&var-description=${point.data_description}&to=1662194008870&panelId=32`}
                          width="50%"
                          height="200px"
                          frameBorder="0"
                          title="alertSummer"
                        ></iframe>
                      </div>
                    </>
                  ) : (
                    <div className="alert" style={{ textAlign: "center" }}>
                      <p>
                        Δεν υπάρχουν alerts επειδή η θερμοκρασία στη Λαμία είναι{" "}
                        <div style={{ color: "#26ab49", display: "contents" }}>
                          {lamia}
                        </div>
                        °C (Θερινή Περίοδος)
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {lamia > 19 ? (
                    <>
                      <h3 style={{ textAlign: "center", color: "#b10e06" }}>
                        Alerts
                      </h3>
                      <div className="alert" style={{ textAlign: "center" }}>
                        <iframe
                          src={`http://localhost:3050/d-solo/xe6FZPZ4k/test?orgId=1&var-deviceId=${device.id}&var-pointsId=${pointId}&var-name=${device.name}&var-description=${point.data_description}&to=1662194008870&panelId=28`}
                          width="50%"
                          height="200px"
                          frameBorder="0"
                          title="alertSummer"
                        ></iframe>
                      </div>
                    </>
                  ) : (
                    <div className="alert" style={{ textAlign: "center" }}>
                      <p>
                        Δεν υπάρχουν alerts επειδή η θερμοκρασία στη Λαμία είναι{" "}
                        <div style={{ color: "#26ab49", display: "contents" }}>
                          {lamia}
                        </div>
                        °C (Χειμερινή Περίοδος)
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default Graph;

