import "./header.scss";
import Name from "../Name";
import Logout from "../Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


function Header() {
  return (
    <>
      <div className="header">
        <div className="wrapper">
          <div className="items">
            <div className="item " >
              <AccountCircleIcon fontSize= "large" style={{paddingRight:"7px"}}/>
              <Name/>
            </div>
            <div className="item">
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
