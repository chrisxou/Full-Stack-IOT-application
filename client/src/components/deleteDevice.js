
import Axios from "axios";
import Cookies from "js-cookie";

const userId = Cookies.get("id");

const deleteDevice = async (id) => {
    try {
      await Axios.delete(
        `http://localhost:5000/devices/${id}/?id=${userId}`
      ).then((response) => {
        alert("Successfully Deleted");
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };


  export default deleteDevice;