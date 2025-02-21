import { Link, NavLink } from "react-router"
import { useAuth } from '../contexts/authContext'
import AvatarDropdown from "./AvatarDropdown"

const Navbar = () => {

  const { user } = useAuth()

  return (
    <div className="bg-black/20">
      <div className="wrapper py-4 flex items-center justify-between">
        <Link to="/"><h1 className="text-3xl font-bold tracking-widest">BRF</h1></Link>
        <ul className="flex items-center gap-4">
          <li><NavLink className="[&.active]:underline font-semibold text-xl" to="/">Home</NavLink></li>
          {
            user === null
            ? <li><NavLink className="[&.active]:underline font-semibold text-xl" to="/login">Login</NavLink></li>
            : (
              <>
                <li><NavLink className="[&.active]:underline font-semibold text-xl" to="/threads">Threads</NavLink></li>
                {
                  user.role === 'admin' && <li><NavLink className="[&.active]:underline font-semibold text-xl" to="/admin">Admin</NavLink></li>
                }
                <AvatarDropdown />
              </>
            )
          }
          
        </ul>
      </div>
    </div>
  )
}
export default Navbar