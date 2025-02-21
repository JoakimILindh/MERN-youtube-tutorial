import { useEffect, useState } from "react"
import axios from "../api/axios"
import formatDate from "../lib/formatDate"

const HomePage = () => {

  const [news, setNews] = useState([])

  useEffect(() => {
    const getNews = async () => {
      const res = await axios.get('api/news')
      if(res.status !== 200) return

      setNews(res.data)
    }
    getNews()
  }, [])

  return (
    <div className="wrapper">
      <h2 className="text-3xl font-bold my-5">News</h2>
      <div className="space-y-4">
        {
          !!news.length 
            ? news.map(article => (
              <div key={article._id} className="bg-black/20 p-3 rounded-lg space-y-2">
                <p className="float-end">{formatDate(article.createdAt)}</p>
                <h3 className="font-semibold text-xl">{article.title}</h3>
                <p>{article.content}</p>
              </div>
            ))
            : (
              <div>No News to show</div>
            )
        }
      </div>
    </div>
  )
}
export default HomePage