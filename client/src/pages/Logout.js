import { useEffect } from "react";
import { logoutUser } from "../services/services";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
  useEffect(() => {
    logoutUser()
      .then(() => navigate("/sign-in"))
      .catch((err) => console.log(err));
    localStorage.clear();
  }, []);

  return navigate("/sign-in")
};

export default Logout;
