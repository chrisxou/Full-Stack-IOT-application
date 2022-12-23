import Cookies from "js-cookie";

const loginCookie = ({setIsLogged}) => {
    const  id = Cookies.get("id");
    if (id) {
      setIsLogged("true");
    }
};
export default loginCookie;
