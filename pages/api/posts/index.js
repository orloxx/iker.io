// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs');
const qs = require('querystring');
const marked = require('marked');

export default (req, res) => {

  const { slug } = qs.parse(req.url.split('?').pop());
  const filename = `pages/api/posts/${slug}.md`;
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      res.statusCode = 404;
      res.json({ error: err });
    } else {
      res.statusCode = 200;
      res.json({ data, html: marked(data) });
    }
  });
};
