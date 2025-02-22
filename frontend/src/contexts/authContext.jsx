import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { io } from 'socket.io-client'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [rememberUser, setRememberUser] = useState(false)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const checkToken = async () => {
      try {
        if(!localStorage.getItem('rememberUser')) return
        setRememberUser(localStorage.getItem('rememberUser') === 'true')

        const token = sessionStorage.getItem('jwt')
        if(!token) return

        const res = await axios.get('api/auth/check', {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('jwt') || ''}`
          }
        })

        if(res.status === 200) {
          setToken(sessionStorage.getItem('jwt'))
          setUser(res.data)
          connectSocket(res.data.name)
        }

      } catch (error) {
        console.log(error.message)
        sessionStorage.removeItem('jwt')
      } finally {
        setAuthReady(true)
      }
    }
    checkToken()
  }, [])


  const register = async (credentials) => {
    const res = await axios.post('api/auth/register', credentials)
    if(res.status === 201) {
      setToken(res.data.token)
      setUser({
        _id: res.data._id,
        name: res.data.name,
        role: res.data.role
      })
    }
    connectSocket(res.data.name)
    if(rememberUser) {
      sessionStorage.setItem('jwt', res.data.token)
    }
  }
  const login = async (credentials) => {
    const res = await axios.post('api/auth/login', credentials)
    if(res.status === 200) {
      setToken(res.data.token)
      setUser({
        _id: res.data._id,
        name: res.data.name,
        role: res.data.role
      })
    }
    connectSocket(res.data.name)
    if(rememberUser) {
      sessionStorage.setItem('jwt', res.data.token)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('jwt')
    setToken(null)
    setUser(null)
    disconnectSocket()
  }

  const toggleRememberUser = () => {
    setRememberUser(state => {
      if(!state) {
        localStorage.setItem('rememberUser', 'true')
      } else {
        localStorage.removeItem('rememberUser')
      }

      return !state
    })
  }


  const connectSocket = (username) => {
    if(socket?.connected) return

    const _socket = io(import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/', {
      query: {
        user: username
      }
    })
    _socket.connect()

    setSocket(_socket)
  }
  const disconnectSocket = () => {
    if(!socket) return
    if(socket?.connected) {
      socket.disconnect()
    }
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    rememberUser,
    toggleRememberUser,
    authReady,
    socket
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const useAuth = () => {
  const context = useContext(AuthContext)

  if(!context) throw new Error('useAuth must be called inside an AuthContextProvider')

  return context
}