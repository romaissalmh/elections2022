import Axios from "axios";
//import {getToken} from './Network'

//let token =getToken();
export default Axios.create({
  baseURL: "",
  headers: {
   /* "authorization":`Basic ${token}`,*/  }
});