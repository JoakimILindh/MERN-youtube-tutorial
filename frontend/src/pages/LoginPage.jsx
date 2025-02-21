import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../contexts/authContext"
import { RiLoaderFill } from "react-icons/ri";

const LoginPage = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, rememberUser, toggleRememberUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if(!credentials.email || !credentials.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')
    try {
      await login(credentials)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }

  }


  return (
    <div className="border p-5 rounded-lg space-y-5 w-96">
      <h2 className="text-4xl font-bold text-center">Login</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input type="email" id="email" className="border rounded-lg p-1 w-full" onChange={e => setCredentials(state => ({ ...state, [e.target.id]: e.target.value }))} value={credentials.email} />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input type="password" id="password" className="border rounded-lg p-1 w-full" onChange={e => setCredentials(state => ({ ...state, [e.target.id]: e.target.value }))} value={credentials.password} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="persist" className="accent-indigo-600" checked={rememberUser} onChange={toggleRememberUser}  />
          <label htmlFor="persist">Remember me</label>
        </div>
        <button className="btn w-full" disabled={loading}>{loading ? <span className="flex items-center justify-center gap-2 animate-pulse"><RiLoaderFill className="size-6 animate-spin" /> Loading</span> : 'Login'}</button>
      </form>
      <p className="text-red-500 text-center">{error}</p>
      <p className="text-center">Dont't have an account? <Link className="underline" to="/register">Register</Link></p>
    </div>
  )
}
export default LoginPage