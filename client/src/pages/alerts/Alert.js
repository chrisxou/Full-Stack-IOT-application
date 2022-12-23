import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

function Alert() {
  const month = new Date();
  const current_month = month.getMonth() + 1;
  const [threshold, setThreshold] = useState("summer");
  const [lamia, setLamia] = useState("");
  const userId = Cookies.get("id");

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

  useEffect(() => {
    findSeason();
    getLamiaTemp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="new">
      <h1
        className="newTitle"
        style={{ color: "rgb(126 22 5)", borderBottomColor: "rgb(102 13 13)" }}
      >
        <b>Alerts</b>
      </h1>


   {userId === "34" ? (
    <>
      {threshold === "summer" ? (
        <>
          {lamia > 27 ? (
            <div  style={{ textAlign: "center" }}>
              <iframe
                src="http://localhost:3050/d-solo/xe6FZPZ4k/test?orgId=1&from=1662106803901&to=1662194008870&panelId=21"
                width="50%"
                height="700px"
                frameBorder="0"
                title="alertSummer"
              ></iframe>
            </div>
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
            <div  style={{ textAlign: "center" }}>
              <iframe className="alertFrame"
                src="http://localhost:3050/d-solo/xe6FZPZ4k/test?orgId=1&from=1662106803901&to=1662194008870&panelId=33"
                width="50%"
                height="1000px"
                frameBorder="0"
                title="alertWinter"
              ></iframe>
            </div>
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
   ):(null)}
    </div>
  );
}

export default Alert;
