import { Navigate, Outlet, useLocation } from "react-router"
import { useAuth } from "../contexts/authContext"

const PrivateLayout = () => {

  const { user } = useAuth()
  const location = useLocation()


  return (
    user
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location.pathname }} />
  )

}
export default PrivateLayout