import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";

const ProtectedRoute = ({ allowedRole }) => {
    const user = useSelector(state => state.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRole && user.role !== allowedRole) {
        return <ErrorPage />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
