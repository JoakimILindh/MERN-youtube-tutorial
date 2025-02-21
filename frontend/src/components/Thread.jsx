import { useState } from 'react'
import formatDate from '../lib/formatDate'
import { useAuth } from '../contexts/authContext'


const Thread = ({ thread, handleAddComment }) => {

  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')

  const { user } = useAuth()

  const handleSubmit = e => {
    e.preventDefault()
    handleAddComment(thread._id, comment)
    setComment('')
  }

  console.log(thread)
  return (
    <div>
      <div className={`bg-black/20 p-3 ${!!thread.comments.length && showComments ? 'rounded-t-xl' : 'rounded-xl'} space-y-2`}>
        <p className="float-end">{formatDate(thread.createdAt)}</p>
        <h3 className="font-semibold text-xl">{thread.title}</h3>
        <p>{thread.content}</p>
        <div className='flex items-center justify-between text-xs text-indigo-200'>
          <p>By: {thread.user.name}</p>
          <p onClick={() => setShowComments(state => !state)} className='cursor-pointer hover:underline'>{thread.comments.length} comments</p>
        </div>
        <div className='h-0 border-b my-5' />
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
          <input type="text" className='border rounded-lg py-1 px-2 w-full' value={comment} onChange={e => setComment(e.target.value)} />
          <button className='btn'>Comment</button>
        </form>
      </div>
      {
        !!thread.comments.length && showComments && (
          <div className='bg-black/20 p-3 rounded-b-xl space-y-2'>
            {
              thread.comments.map(comment => (
                <div key={comment._id} className='bg-black/20 p-3 rounded-xl space-y-2'>
                  <div></div>
                  <p className="float-end text-xs">{formatDate(comment.createdAt)}</p>
                  <p>{comment.content}</p>
                  <div className='flex items-center justify-between text-xs text-indigo-200'>
                    <p>By: {comment.user.name}</p>
                    {
                      user._id === comment.user._id || user.role === 'admin' || user.role === 'moderator' && (
                        <button className='text-red-500 text-xs cursor-pointer hover:underline'>Delete</button>
                      )
                    }
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
)
}
export default Thread