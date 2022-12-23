import React, { useState, useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Axios from "axios";
import Cookies from "js-cookie";


const Name = ()=> {

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
        <Navbar.Text   style={{
            paddingRight: "15px",
          }}>
            Signed in as: {nameUser}
        </Navbar.Text>
    )
}
export default Name;