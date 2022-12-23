import Axios from "axios";
import Cookies from "js-cookie";


const userId = Cookies.get("id");
const deletePoints = async (pointId,deviceId) => {
    try {
      await Axios.delete(
        `http://localhost:5000/devices/${deviceId}/points/${pointId}/?id=${userId}`
      ).then((response) => {
        alert("Successfully Deleted");
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };


  export default deletePoints;