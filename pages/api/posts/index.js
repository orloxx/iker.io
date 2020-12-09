// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fetch = require('node-fetch');
const qs = require('querystring');
const marked = require('marked');

export default (req, res) => {

  async function getPost() {
    try {
      const { slug } = qs.parse(req.url.split('?').pop());
      const protocol = req.connection.encrypted ? 'https' : 'http';
      const filename = `${protocol}://${req.headers.host}/posts/${slug}.md`;
      const response = await fetch(filename);
      const markdown = await response.text();

      res.statusCode = 200;
      res.json({ markdown, html: marked(markdown) });
    } catch (error) {
      res.statusCode = 404;
      res.json({ error });
    }
  }

  getPost();
};
