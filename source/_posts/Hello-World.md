---
title: Hello World
date: 2019-07-21 12:15:40
tags:
  - Hexo
  - Node.js
---

I started using [Hexo][1] a while ago but hadn't had the time to unify the blog and the theme development process until now. The core stack consists in: `hexo`, `webpack`, `node-sass`, `postcss`, and `stmux`. You can checkout the code at [orloxx/iker.io][2].

<!-- more -->

By the end of this post we should be able to run `start` executing the development watchers and the Hexo server all in one terminal window.

```shell
npm install
npm start
```

{% asset_img stmux.png Stmux running %}

In one part there's the blog where all the pages and posts reside, even this post you're reading, written in [Markdown][3], and on the other hand there's the theme which is built using [Embed JavaScript templates (EJS)][4]. Then I configured some scripts to build the assets with some watchers for the continuous development process.

## The theme folder

Let's start first with the theme, here there're four main separate modules:

* `languages`: where all the files for internationalisation are in.
* `layout`: Markup files using EJS.
* `source`: The generated assets which are ignored in git.
* `src`: Where all the front end resides (JS and SCSS).

Most of them are explained in the Hexo docs, I'll be walking through the front end build where the files in the `src` folder are built into the `source` folder. With the next command you will start the  whole production build process:

```shell
npm run build
```

### JavaScript bundle

It uses [Webpack][5] to generate a bundle `source/js/main.js` from the entry point `src/index.js`. This is the configuration file:

```javascript webpack.config.js
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  resolve: {
    modules: ['./node_modules', './src/js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'source/js')
  }
};
```

### SVG Sprite generation

The purpose is to generate one `source/svg/sprite.svg` file using [svg-sprite][6] from all the files included in the `src/svg` folder. For that we need to run this command:

```shell
svg-sprite -sD source --symbol-dest svg --symbol-sprite sprite.svg ./src/svg/*.svg
```

### SASS compilation

The following command uses [node-sass][7] to generate a bundle `source/css/index.css` from the entry point `src/index.scss`.

```shell
node-sass --include-path ./node_modules --include-path ./src src/index.scss -o source/css/
```

### PostCss auto-prefixing

We need to apply some auto-prefixing to make sure we support all browsers we define in `browserslist`. For now the following command will do, it generates the css bundle `source/css/main.css` from the entry point `source/css/index.css` which should be auto-generated previously.

```shell
postcss --use autoprefixer -o source/css/main.css source/css/index.css
```

### Defining the scripts

At the end the `package.json` file will be something like this.

```text themes/ikerhexo/package.json
{
  ...
  "paths": {
    "cssbuild": "node-sass --include-path ./node_modules --include-path ./src src/index.scss -o source/css/",
    "postcss": "postcss --use autoprefixer -o source/css/main.css source/css/index.css"
  },
  "scripts": {
    "build": "npm run build:css && npm run post:css && npm run build:js",
    "build:js": "NODE_ENV=production webpack",
    "build:css": "npm run sprite && $npm_package_paths_cssbuild",
    "post:css": "$npm_package_paths_postcss",
    "watch:js": "webpack --watch",
    "watch:css": "npm run build:css && $npm_package_paths_cssbuild --watch --recursive",
    "watch:post": "$npm_package_paths_postcss -w --verbose",
    "sprite": "svg-sprite -sD source --symbol-dest svg --symbol-sprite sprite.svg ./src/svg/*.svg"
  },
  "browserslist": [
    "last 2 versions",
    "ie >= 11",
    "iOS >= 9",
    "Android >= 5"
  ]
  ...
}
```

## The Hexo Blog

Now we need to back up to the blog root folder and define the development process, I found out about [Stmux][8] quite recently, a Simple Terminal Multiplexer as they call it that runs many commands in one terminal window avoiding opening a new tab for each watcher script. We can divide the screen in four panels:

* `hexo`: The Hexo server to be able to check any markup or markdown changes.
* `js`: The js watcher, generates the bundle on any JS file change.
* `css`: The css watcher, same as before but with css.
* `post`: The post-css watcher, the one that adds auto-prefix the css file

With `stmux` we just need to divide the terminal window, so the root `package.json` file scripts would look like this:

```text package.json
{
  ...
  "scripts": {
    "start": "stmux [ [ 'npm run hexo' .. 'npm run js' ] : [ 'npm run css' .. 'npm run post' ] ]",
    "hexo": "hexo server --config _config.yml,_deploy.yml",
    "js": "cd ./themes/ikerhexo && npm run watch:js",
    "css": "cd ./themes/ikerhexo && npm run watch:css",
    "post": "cd ./themes/ikerhexo && npm run watch:post"
  },
  ...
}
```

### Hexo Helper Inline SVG

One last detail is to install an extra plugin to be able to use the function to inject inline SVG icons.

```shell
npm install --save hexo-helper-inline-svg
```

At this point you can run the start command and you'll be ready to develop your own hexo theme.



[1]: https://hexo.io/
[2]: https://github.com/orloxx/iker.io
[3]: https://www.markdownguide.org/
[4]: https://ejs.co/
[5]: https://github.com/webpack/webpack/tree/v4.35.3
[6]: https://github.com/jkphl/svg-sprite/tree/v1.5.0
[7]: https://github.com/sass/node-sass/tree/v4.12.0
[8]: https://github.com/rse/stmux/tree/1.7.1
