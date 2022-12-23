import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';

export default function Logout() {

  const handleOnClick = () =>{
    Cookies.remove("id");
    window.location.reload();
  }

  return <Button variant="outline-light" onClick={handleOnClick}>Logout</Button>;
}

