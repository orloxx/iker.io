// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch'
import qs from 'qs'
import { marked } from 'marked'

const Posts = async (req, res) => {
  async function getPost() {
    try {
      const { slug } = qs.parse(req.url.split('?').pop())
      const protocol = req.connection.encrypted ? 'https' : 'http'
      const filename = `${protocol}://${req.headers.host}/posts/${slug}.md`
      const response = await fetch(filename)
      const markdown = await response.text()

      if (response.status !== 200) {
        res.statusCode = response.status
        res.json({ error: response })
        return
      }

      res.statusCode = 200
      res.json({ markdown, html: marked(markdown) })
    } catch (error) {
      res.statusCode = 404
      res.json({ error })
    }
  }

  return getPost()
}

export default Posts
