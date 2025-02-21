import { useEffect, useState } from "react"
import axios from "../api/axios"
import { useAuth } from "../contexts/authContext"
import Thread from "../components/Thread"
import { Link } from 'react-router'

const ThreadsPage = () => {

  const { token, user } = useAuth()
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

  const handleAddComment = async (threadId, content) => {
    try {
      const res = await axios.post(`api/threads/${threadId}/comment`, { content }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      if(res.status !== 201) return

      const state = threads.map(thread => {
        if(thread._id === threadId) {
          const comment = {
            ...res.data,
            user: {
              _id: res.data.user,
              name: user.name
            }
          }
          thread.comments.push(comment)
        }

        return thread
      })

      setThreads(state)

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="wrapper">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold my-5">Threads</h2>
        <Link to="/threads/create" className="btn">Start A New Thread</Link>
      </div>
    <div className="space-y-4">
      {
        !!threads.length 
          ? threads.map(thread => (
            <Thread key={thread._id} thread={thread} handleAddComment={handleAddComment} />
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