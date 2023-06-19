import {Navigate, Outlet} from "react-router-dom";
import CookieHandler from "../../utils/cookieHandler";
import {Constants} from "../../constants/Constants";

export const ProtectedLayout = () => {

  if (!CookieHandler.getCookie(Constants.ACCESS)) {
    return <Navigate to="/login"/>;
  }

  return (
    <Outlet/>
  );
};