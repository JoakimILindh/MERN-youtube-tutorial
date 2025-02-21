import { useEffect, useState } from "react"
import { useAuth } from "../contexts/authContext"
import axios from "../api/axios"
import formatDate from "../lib/formatDate"

const ProfilePage = () => {

  const { token } = useAuth()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(res.status !== 200) return
        setProfile(res.data)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchProfile()
  }, [])

  return (
    <div className="wrapper">
      <h2 className="text-3xl font-bold my-5">Profile Page</h2>
      {
        profile && (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-4xl font-bold">
              <h3>{profile.name}</h3>
              <p>{profile.role}</p>
            </div>
            <p>Email: {profile.email}</p>
            <p>Member since: {formatDate(profile.createdAt)}</p>
          </div>
        )
      }
    </div>
  )
}
export default ProfilePage