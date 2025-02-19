import News from '../models/news.model.js'

export const createNewsArticle = async (req, res) => {
  const { title, content } = req.body

  console.log({ title, content })
}