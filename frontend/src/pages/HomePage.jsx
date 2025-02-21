import { useEffect, useState } from "react"
import axios from "../api/axios"

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
    </div>
  )
}
export default HomePage