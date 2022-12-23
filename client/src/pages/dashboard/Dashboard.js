import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import Cookies from "js-cookie";
import Axios from "axios";
import Iot from "./iotIntro.png";
import University from "./Panepistimio.jpg";

export default function Dashboard() {

  const [nameUser,setNameUser] =useState(); 
  const userId = Cookies.get("id");

  const getName = async () =>{
    try{
        await Axios.get(`http://localhost:5000/user/?id=${userId}`).then((response)=>{  
            setNameUser(response.data[0].name);
        });
    }catch(err){
        console.log(err);
    }
}

useEffect(() =>{
    getName();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>

    {userId==='34' ?
      <div className="start">
        <h3>Σύστημα ενεργειακής διαχείρισης</h3>
        <h2>Department Of Computer Science And Biomedical Informatics</h2>

        <div className="image">
          <img
            src={University}
            alt="Department of Computer Science "
          />
        </div>

       

      </div>
    : <div className="start">
        <h3>Γραφικό περιβάλλον εφαρμογής IOT</h3>
        <h2>{nameUser}</h2>

        <div className="image">
          <img
            src={Iot}
            alt="Iot "
          />
        </div>

      </div>}




    </>
  );
}
