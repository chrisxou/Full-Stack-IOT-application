import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import loginCookie from "./components/loginCookie";
import Dashboard from "./pages/dashboard/Dashboard";
import Error from "./pages/error/Error";
import Auth from "./pages/auth/Auth";
import Devices from "./pages/devices/Devices";
import New from "./pages/new/New";
import Edit from "./pages/edit/Edit";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Points from "./pages/points/Points";
import EditPoints from "./pages/edit/EditPoints";
import NewPoint from "./pages/new/NewPoint";
import Graph from "./pages/graph/Graph";
import Alert from "./pages/alerts/Alert";

function App() {
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    loginCookie({ setIsLogged });
  }, []);

  return (
    <div className="wrapper">
      {!isLogged ? (
        <Auth />
      ) : (
        <BrowserRouter>
          <div className="home">
            <Sidebar />
            <div className="homeContainer">
              <Header />
              <div className="dashboard">
                <Routes>
                  <Route path="/">
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="alerts" element={<Alert />} />
                    <Route path="devices">
                      <Route index element={<Devices />} />
                      <Route path="new" element={<New />} />
                      <Route path="edit/:id" element={<Edit id={window.location.pathname} />}/>
                      <Route path=":deviceId" >
                        
                         <Route path="points">
                             <Route index element={<Points />} />
                             <Route path="new" element={<NewPoint />} />
                             <Route path="edit/:id" element={<EditPoints/>}/>
                             <Route path=":pointId" element={<Graph id={window.location.pathname} />}/>
                          </Route> 
                      </Route>
                    </Route>
                    <Route path="*" element={<Error />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}


export default App;
