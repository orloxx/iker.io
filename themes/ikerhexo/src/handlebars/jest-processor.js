// https://stackoverflow.com/a/45700797
module.exports = {
  process(src) {
    return `
    const Handlebars = require('handlebars');
    module.exports = Handlebars.compile(\`${src}\`);
    `;
  },
};
