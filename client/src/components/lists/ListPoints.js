import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../../pages/devices/devices.scss";
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import deletePoints from "../deletePoints";

const ListPoints = (props) => {

  const point = props.point;
  const index = props.index;
  const device = props.device;

  return (
          

    
            <tr>
            <td> <a href={`http://localhost:3000/devices/${device}/points/${point.id}`}><TimelineOutlinedIcon style={{color:"#1e2072"}}/></a></td>
              <td>{index + 1}</td>
              <td>
                {point.address.slice(0, 25) +
                  (point.address.length > 25 ? "..." : "")}
              </td>
              <td style={{whiteSpace: "nowrap", paddingLeft:"15px"}}>
                {point.data_description.slice(0, 25) +
                  (point.data_description.length > 25 ? "..." : "")}
              </td>
              <td>
                {point.data_type.slice(0, 13) +
                  (point.data_type.length > 13 ? "..." : "")}
              </td>
              <td>
                {" "}
                <a href={`http://localhost:3000/devices/${device}/points/edit/${point.id}`}>
                  <EditIcon
                    style={{
                      margin: "5px",
                      marginRight: "5px",
                      color: "rgb(41, 106, 37)",
                    }}
                  />
                </a>
              </td>
              <td>
                <DeleteIcon
                  className="delete"
                  onClick={() => deletePoints(point.id, device)}
                />
              </td>
            </tr>
  );}
export default ListPoints;
