var fs = require("fs");
var path = require("path");

// Can be Vue App or Shared bundles
var appBasePath = "./src/apps/";
var template = path.resolve(__dirname, "src", "index.razor3.ejs");

var pages = {};
// We search for index.js files inside basePath folder and make those as entries
fs.readdirSync(appBasePath).forEach(function(name) {
  var appMainJS = `${appBasePath}${name}/main.ts`; // entry point
  var outputHtml = `${name}.html`; // partial Head & Body

  // console.log(appMainJS);
  // console.log(outputHtml);

  if (fs.existsSync(appMainJS)) {
    pages[name] = {
      // entry for the app
      entry: appMainJS,
      // source template  - might be relative to ./public ???
      template,
      // output HMTL
      filename: outputHtml,
      inject: false,  // 
      minify: false,
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      // title: name,
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"], 
    };
  }
});

module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },
  transpileDependencies: [/[\\\/]node_modules[\\\/]quasar[\\\/]/],
  pages
  // chainWebpack: config => {
  //   config
  //     .plugin('copy')
  //     .tap(args => {
  //       // args = [{ template: './src/partial.html' }];
  //       console.log('args=', JSON.stringify(args, null, 2));
  //       return args
  //     })
  //   }
};
