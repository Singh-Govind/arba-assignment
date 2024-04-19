import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useSelector((store) => store.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.userName) {
      return navigate("/login");
    }
  }, [user]);

  return children;
}

export default PrivateRoute;
