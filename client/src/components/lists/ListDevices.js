import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import deleteDevice from "../deleteDevice";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import "../../pages/devices/devices.scss";




const ListDevices = (props) => {
    const device = props.device;
    const index = props.index;
  
    return (

      
      <tr>
        <td> <a href={"http://localhost:3000/devices/"+device.id+"/points"}><RemoveRedEyeOutlinedIcon style={{color:"#1e2072"}}/></a></td>
        <td>{index + 1}</td>
        <td>
          {device.name.slice(0, 16) + (device.name.length > 16 ? "..." : "")}
        </td>
        <td>
          {device.type.slice(0, 16) + (device.type.length > 16 ? "..." : "")}
        </td>
        <td>
          {device.method.slice(0, 13) +
            (device.method.length > 13 ? "..." : "")}
        </td>
        <td>{device.port}</td>
        <td>
          {" "}
          <a href={"/devices/edit/"+device.id}><EditIcon style={{margin: "5px",marginRight: "5px",color:"rgb(41, 106, 37)"}} /></a>
        </td>
        <td>
          <DeleteIcon
            className="delete"
            onClick={() => deleteDevice(device.id)}
          />
          </td>
      </tr>
    );
  };


  export default ListDevices;
