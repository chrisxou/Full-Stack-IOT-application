import React from "react";

function Image(props) {
    return (
        <>
            <img
              alt=""
              src={props.im}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
    </>
    )
}


export default Image;