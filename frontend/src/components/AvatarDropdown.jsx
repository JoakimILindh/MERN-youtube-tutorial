import { useState } from "react"
import { FaUser } from 'react-icons/fa'
import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../contexts/authContext"

const AvatarDropdown = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <div>
      <div className="relative">
        <button onClick={() => setIsOpen(state => !state)} className="rounded-full p-2 bg-black cursor-pointer">
          <FaUser />
        </button> 
        <AvatarDropdownNotifications isOpen={isOpen} setIsOpen={setIsOpen} handleLogout={handleLogout} />
      </div>
      {
        isOpen && <div onClick={() => setIsOpen(false)} className="inset-0 fixed z-10" />
      }
    </div>
  )
}
export default AvatarDropdown



const AvatarDropdownNotifications = ({isOpen, handleLogout, setIsOpen}) => {
  

  return (
    <div className={`absolute top-full mt-4 bg-indigo-950 right-0 border z-20 w-60 rounded-lg p-2 ${isOpen ? 'flex' : 'hidden'} flex-col gap-2 items-center`}>
      <div className="border-b p-2 w-full">
        <p className="text-sm text-center">No new notifications</p>
      </div>
      <NavLink onClick={() => setIsOpen(false)} className="[&.active]:underline font-semibold text-xl" to="/profile">Profile</NavLink>
      <button onClick={handleLogout} className="font-semibold text-xl">Logout</button>
    </div>
  )
}