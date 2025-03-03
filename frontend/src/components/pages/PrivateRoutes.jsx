import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
    const user = useSelector(store => store.auth.user);
    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
