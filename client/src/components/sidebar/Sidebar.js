import React, {useState, useEffect } from "react";
import "./sidebar.scss";
import Image from "../Image";
import image from "./iot.jpg";
import { NavLink, Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cookies from "js-cookie";

function Sidebar() {
  const matches = useMediaQuery("(max-width:600px)");
  const userId = Cookies.get("id");
  const [sidebarNum, setSidebarNum] = useState("2");

  const user = () => {
   if(userId === "34" ) {
    setSidebarNum("3");
   };
};

  useEffect(() => {
    user();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={"sidebar"}>
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">
              <Image im={image} />
              {!matches ? "IOT" : null}
            </span>
          </Link>
        </div>

        <div className="center">
          <ul>
            {SidebarData.slice(0,sidebarNum).map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",            
                    color: isActive ? "rgb(42 122 197)" : "black",
                  })}
                >
                  <li>
                    <div className="icon">{item.icon}</div>
                    {!matches ? <span>{item.title}</span> : null}
                  </li>
                </NavLink>
              );
            })}

        
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
