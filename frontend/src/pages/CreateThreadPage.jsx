import { useState } from "react"
import { RiLoaderFill } from "react-icons/ri"
import axios from "../api/axios"
import { useAuth } from "../contexts/authContext"
import { useNavigate } from "react-router"

const CreateThreadPage = () => {

  const [formData, setFormData] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { token } = useAuth()
  const navigate = useNavigate()

  const handleChange = e => {
    setFormData(state => ({
      ...state,
      [e.target.id]: e.target.value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if(formData.title.trim() === '' || formData.content.trim() === '') {
      setError('Please fill in all the fields')
      setLoading(false)
      return
    }

    try {
      const res = await axios.post('api/threads', formData, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if(res.status !== 201) return

      setFormData({ title: '', content: '' })
      navigate('/threads')
    } catch (err) {
      console.log(err.message)
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="wrapper">
      <h2 className="text-3xl font-bold my-5">Create a Thread</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" className="border rounded-lg py-1 px-2 w-full" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" className="border scrollbar rounded-lg py-1 px-2 w-full h-64 resize-none overflow-auto" value={formData.content} onChange={handleChange}></textarea>
        </div>

        <button className="btn" disabled={loading}>{loading ? <span className="flex items-center justify-center gap-2 animate-pulse"><RiLoaderFill className="size-6 animate-spin" /> Loading</span> : 'Create'}</button>
      </form>
      <p className="text-red-500 text-center">{error}</p>
    </div>
  )
}
export default CreateThreadPage