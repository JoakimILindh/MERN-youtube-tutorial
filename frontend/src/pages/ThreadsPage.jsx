import { useEffect, useState } from "react"
import axios from "../api/axios"
import { useAuth } from "../contexts/authContext"
import Thread from "../components/Thread"

const ThreadsPage = () => {

  const { token } = useAuth()
  const [threads, setThreads] = useState([])

  useEffect(() => {
    const getThreads = async () => {
      try {
        const res = await axios.get('api/threads', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        if(res.status !== 200) return

        setThreads(res.data)
 
      } catch (err) {
        console.log(err.response?.data?.message || err.message)
      }
    }
    getThreads()
  }, [])

  return (
    <div className="wrapper">
    <h2 className="text-3xl font-bold my-5">Threads</h2>
    <div className="space-y-4">
      {
        !!threads.length 
          ? threads.map(thread => (
            <Thread key={thread._id} thread={thread} />
          ))
          : (
            <div>No News to show</div>
          )
      }
    </div>
  </div>
  )
}
export default ThreadsPage