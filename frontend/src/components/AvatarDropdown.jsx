import { useEffect, useState } from "react"
import { FaUser } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from "react-router"
import { useAuth } from "../contexts/authContext"
import axios from "../api/axios"

const AvatarDropdown = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const unreadNotifications = notifications.filter(notification => !notification.isRead)

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
        <button onClick={() => setIsOpen(state => !state)} className="rounded-full p-2 bg-black cursor-pointer relative">
          {
            !!unreadNotifications.length && <span className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">{unreadNotifications.length}</span>
          }
          <FaUser />
        </button> 
        <AvatarDropdownNotifications 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          handleLogout={handleLogout} 
          notifications={notifications} 
          setNotifications={setNotifications} 
          unreadNotifications={unreadNotifications} />
      </div>
      {
        isOpen && <div onClick={() => setIsOpen(false)} className="inset-0 fixed z-10" />
      }
    </div>
  )
}
export default AvatarDropdown



const AvatarDropdownNotifications = ({ isOpen, handleLogout, setIsOpen, notifications, setNotifications, unreadNotifications }) => {
  
  const { user, token, socket } = useAuth()

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axios.get('api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status !== 200) return
      setNotifications(res.data)

    }
    fetchNotifications()
  }, [isOpen])

  useEffect(() => {
    if(!socket) return

    socket.on('notification', (notification) => {
      if(notification.recipient === user._id) {
        const newNotificationsArr = [...notifications]
        newNotificationsArr.push(notification)
        setNotifications(newNotificationsArr)


        // const fetchNotifications = async () => {
        //   const res = await axios.get('api/notifications', {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //     }
        //   })
    
        //   if(res.status !== 200) return
        //   setNotifications(res.data)
    
        // }
        // fetchNotifications()

        
      }
    })


    return () => {
      socket.off('notification')
    }
  }, [notifications])

  return (
    <div className={`absolute top-full mt-4 bg-indigo-950 right-0 border z-20 w-60 rounded-lg p-2 ${isOpen ? 'flex' : 'hidden'} flex-col gap-2 items-center`}>
      <div className="border-b p-2 w-full space-y-1 max-h-40 overflow-y-auto scrollbar">
        {
          !!unreadNotifications.length
            ? unreadNotifications.map(notification => (
              <Notification key={notification._id} notification={notification} />
            ))
            : <p className="text-sm text-center">No new notifications</p>
        }
        
      </div>
      <NavLink onClick={() => setIsOpen(false)} className="[&.active]:underline font-semibold text-xl" to="/profile">Profile</NavLink>
      <button onClick={handleLogout} className="font-semibold text-xl">Logout</button>
    </div>
  )
}


const Notification = ({ notification }) => {

  const { token } = useAuth()

  const handleMouseOver = async () => {
    if(notification.isRead) return

    const res = await axios.patch(`api/notifications/${notification._id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if(res.status === 204) {
      notification.isRead = true
    }
  }

  return (
    <Link to="/threads" className="block" onMouseOver={handleMouseOver}>
      <p className="text-sm font-semibold">{notification.sender.name}</p>
      <p className="text-xs">{notification.message}</p>
    </Link>
  )
}