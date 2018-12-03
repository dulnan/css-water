var fs = require("fs");
var uglifyjs = require("uglify-js");
var jscrush = require("./jscrush.js");
var cleancss = require("clean-css");

var PLACEHOLDER_STYLE = "__STYLE__";
var PLACEHOLDER_SCRIPT = "__SCRIPT__";


function build () {
  var htmlRaw = fs.readFileSync("src/water.html", "utf8");
  console.log("[HTML]       " + (htmlRaw.length - PLACEHOLDER_SCRIPT.length));

  var cssRaw = fs.readFileSync("src/water.css", "utf8");
  var cssMinified = new cleancss().minify(cssRaw).styles;
  console.log("[CSS]        " + cssMinified.length);

  var jsRaw = fs.readFileSync("src/water.js", "utf8");
  var jsMinified = uglifyjs.minify(jsRaw).code;
  console.log("[JS]         " + (jsMinified.length - PLACEHOLDER_STYLE.length));
  var jsCombined = jsMinified.replace("__STYLE__", cssMinified);

  var jsPacked = uglifyjs.minify(jsCombined, {
    parse: {
      bare_returns: true
    },
    compress: {
      hoist_funs: true,
      hoist_vars: false, // check
      keep_fargs: false,
      passes: 5,
      pure_funcs: [],
      pure_getters: true,
      toplevel: true,
      unsafe: true,
      unsafe_comps: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true
    },
    mangle: {
      eval: true,
      toplevel: false,
      properties: {
        builtins: true,
        keep_quoted: false,
        reserved: [
          'sin',
          'random',
          'animation',
          'children',
          'sqrt',
          'createElement',
          'appendChild',
          'body',
          'style',
          'innerHTML',
          'animationDelay',
          'animationDuration'
        ]
      }
    },
    output: {
      ascii_only: true,
      beautify: false
    },
    sourceMap: {
    },
    toplevel: true,
    ie8: false,
    warnings: false
  }).code;
  console.log("[JS Packed]  " + jsPacked.length);
  fs.writeFileSync("dist/packed.js", jsPacked);

  jsPacked = jsPacked.replace(/([\r\n]|^)\s*\/\/.*|[\r\n]+\s*/g,'').replace(/\\/g,'\\\\');
  var jsCrushed = jscrush(jsPacked)
  console.log("[JS Crushed] " + jsCrushed.length);

  const htmlMinified = htmlRaw.replace("__SCRIPT__", jsCrushed);
  console.log("====================");
  console.log("T O T A L    " + htmlMinified.length);
  console.log("====================");

  fs.writeFileSync("dist/index.html", htmlMinified);
  console.log('\n--------------------\n\n\n')
}


build()

var mode = process.argv[2] || '';

// Init dev server.
if (mode === 'watch') {
  var watch = require('node-watch');
  var express = require("express");
  var app = express();
  app.use(express.static("dist"));
  app.listen(3000);

  watch('src', { recursive: true }, function(evt, name) {
    build()
  });
}
