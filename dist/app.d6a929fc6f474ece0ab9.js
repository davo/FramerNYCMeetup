/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aca35321b2829940e1e89b250ef853fa.eot";

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1bcec082059c8f27ceb9c94ed9b31aee.eot";

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6d5b22fe13c0a50c3e5c1d5d5149ffea.eot";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6a4d2ba26233940ec45e5dfdeddf847a.eot";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c009244b7a5f0e64affff5938fd40b07.eot";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f7540e23efaca939e36a7906ec846eda.eot";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ea9b5493accd6e0f9f6df2b813b1883c.eot";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f1aac06c23390497a5a5e845376c449a.eot";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3066b5d33996638c0287c9382ea871da.eot";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8765de11aff94be89b87818a449b7bf0.eot";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1d67395333d12a868187a4e270cfd5c0.eot";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "83fca00a5eed12b049f06ee71ff9c573.eot";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "880767bdfca671d507facaf2aa5478f9.eot";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a14f9e4a385b63534610c25e9325bc0c.eot";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "47386bae162386624eef6767c64b125c.eot";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "85af1ca058753dbf835b6b9c306ccff9.eot";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cbb70e2d87721bee587ecc3c0c688cfd.woff2";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "45b2cbb1818e974a8bfe084a3207d338.woff";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4440ef2794fdec77f8fca5dd471420a1.ttf";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "26fa06cace15f194d2f6ca1430bf51ae.svg";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e74f826c9a3db62c1b0ce7120a7f87bc.woff2";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bd23385f68ea670400096c76bad7319e.woff";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "47c50db7461604558bf90a878d4ab614.ttf";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ec7eb5e735c5c57777051f491cbcd59b.svg";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "eed38710a9bb2636b10298a7063c5bda.woff2";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2acadf7c004f329bc67cfbf6f3ebe29f.woff";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1d05cac3b40a290bf924d7d153ad497b.ttf";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "abed462ccfdc84e892f16484796dd691.svg";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ba4cb9008b0cc151ac3ca5cbc198860e.woff2";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "49e8eb6d0fbd1b55b4c669fbfd8d6648.woff";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b49744e1f750553969d06dc8023dafc9.ttf";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5cea650a472a257d8f1e53a10125eefa.svg";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e10e26d053663cd514fb5d5f84783441.woff2";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0dc3ab545483d81bb7a076fc34df9bd4.woff";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "817075e30df6e60c8a9d0a9612cf0c8b.ttf";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e87eb11e0bb90fe39e6d2a64c094e8fc.svg";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "68d7b89382e174e965a3c107e85bf1fc.woff2";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0a6e01972da5c10b0264e4335f29c2af.woff";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1acf11f95d3a4ad06331c77808ea4d4c.ttf";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a9c3bdf3f3c0a798f0244e67e711d9c7.svg";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9b07ff6fe8d4ca2fdf8108f9bc12fdf0.woff2";

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fbb92a33a9c7efb027359eea7544c9e4.woff";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f6ee002ec2ad62180757944d7c2c6eb9.ttf";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "81705331197d0d7107511c8baf5e07d7.svg";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bfccacd30e4b422320ab2984576ea8b7.woff2";

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "30e771b708d0b0971d8b06f68dfd765b.woff";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4b7b836ab377bf66b5844921ec015225.ttf";

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "85dda920d95752d29e1686607b281c1e.svg";

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "53f1a3ea2e68d643524893a96abb5f9d.eot";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cfae562d3298250a4000b56f99740cec.eot";

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a88f307dfaabf0fa34f1034b5cbfd3ba.eot";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ceb22c901da71318d4c1a174b0fd00df.eot";

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "00dab2a87f468b8487a47675e90c2dcd.eot";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6a83b54db888f325395418511050eea6.eot";

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c28287a08ea1501ecb5df3b16d687eb5.eot";

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ee4783a2836e7e4b57cd5e083a5e3cfa.eot";

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "628e09c36b3241b7d772d60a9fce4410.eot";

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "598bdff52b0f90ee26f9480234582caa.eot";

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "120a338cf33b24ecee63cf4d2c95e56d.eot";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1d5f18261eaa6076a8b5e273fbe9dab9.eot";

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f8d2125aeee2b0dbadbaeb5dbf996c68.eot";

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6ba342b37cb688fe1f303da593d8c53f.eot";

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4231cf6010aab206365cabba8626b028.eot";

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_main_css__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_config_js__ = __webpack_require__(164);
// CSS imports


// JS imports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(163)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports
exports.i(__webpack_require__(68), "");
exports.i(__webpack_require__(161), "");
exports.i(__webpack_require__(162), "");

// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(9);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/**\n * A simple theme for reveal.js presentations, similar\n * to the default theme. The accent color is darkblue.\n *\n * This theme is Copyright (C) 2012 Owen Versteeg, https://github.com/StereotypicalApps. It is MIT licensed.\n * reveal.js is Copyright (C) 2011-2012 Hakim El Hattab, http://hakim.se\n */\n/* This stylesheet generated by Transfonter (https://transfonter.org) on April 2, 2018 3:24 PM */\n@font-face {\n        font-family: 'Eina01-BoldItalic';\n        src: url(" + escape(__webpack_require__(10)) + ");\n        src: url(" + escape(__webpack_require__(10)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(69)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(70)) + ") format(\"woff\"), url(" + escape(__webpack_require__(71)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(72)) + "#Eina01-BoldItalic) format(\"svg\");\n        font-weight: bold;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina01';\n        src: url(" + escape(__webpack_require__(11)) + ");\n        src: url(" + escape(__webpack_require__(11)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(73)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(74)) + ") format(\"woff\"), url(" + escape(__webpack_require__(75)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(76)) + "#Eina01-SemiBold) format(\"svg\");\n        font-weight: 600;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina01';\n        src: url(" + escape(__webpack_require__(12)) + ");\n        src: url(" + escape(__webpack_require__(12)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(77)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(78)) + ") format(\"woff\"), url(" + escape(__webpack_require__(79)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(80)) + "#Eina01-Bold) format(\"svg\");\n        font-weight: bold;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina01';\n        src: url(" + escape(__webpack_require__(13)) + ");\n        src: url(" + escape(__webpack_require__(13)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(81)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(82)) + ") format(\"woff\"), url(" + escape(__webpack_require__(83)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(84)) + "#Eina01-Regular) format(\"svg\");\n        font-weight: normal;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina01-SemiboldItalic';\n        src: url(" + escape(__webpack_require__(14)) + ");\n        src: url(" + escape(__webpack_require__(14)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(85)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(86)) + ") format(\"woff\"), url(" + escape(__webpack_require__(87)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(88)) + "#Eina01-SemiboldItalic) format(\"svg\");\n        font-weight: 600;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina01-RegularItalic';\n        src: url(" + escape(__webpack_require__(15)) + ");\n        src: url(" + escape(__webpack_require__(15)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(89)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(90)) + ") format(\"woff\"), url(" + escape(__webpack_require__(91)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(92)) + "#Eina01-RegularItalic) format(\"svg\");\n        font-weight: normal;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina01';\n        src: url(" + escape(__webpack_require__(16)) + ");\n        src: url(" + escape(__webpack_require__(16)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(93)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(94)) + ") format(\"woff\"), url(" + escape(__webpack_require__(95)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(96)) + "#Eina01-Light) format(\"svg\");\n        font-weight: 300;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina01-LightItalic';\n        src: url(" + escape(__webpack_require__(17)) + ");\n        src: url(" + escape(__webpack_require__(17)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(97)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(98)) + ") format(\"woff\"), url(" + escape(__webpack_require__(99)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(100)) + "#Eina01-LightItalic) format(\"svg\");\n        font-weight: 300;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina02-LightItalic';\n        src: url(" + escape(__webpack_require__(1)) + ");\n        src: url(" + escape(__webpack_require__(1)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(18)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(19)) + ") format(\"woff\"), url(" + escape(__webpack_require__(20)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(21)) + "#Eina02-LightItalic) format(\"svg\");\n        font-weight: 300;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina02-SemiboldItalic';\n        src: url(" + escape(__webpack_require__(2)) + ");\n        src: url(" + escape(__webpack_require__(2)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(22)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(23)) + ") format(\"woff\"), url(" + escape(__webpack_require__(24)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(25)) + "#Eina02-SemiboldItalic) format(\"svg\");\n        font-weight: 600;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina02';\n        src: url(" + escape(__webpack_require__(3)) + ");\n        src: url(" + escape(__webpack_require__(3)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(26)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(27)) + ") format(\"woff\"), url(" + escape(__webpack_require__(28)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(29)) + "#Eina02-Light) format(\"svg\");\n        font-weight: 300;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina02-BoldItalic';\n        src: url(" + escape(__webpack_require__(4)) + ");\n        src: url(" + escape(__webpack_require__(4)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(30)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(31)) + ") format(\"woff\"), url(" + escape(__webpack_require__(32)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(33)) + "#Eina02-BoldItalic) format(\"svg\");\n        font-weight: bold;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina02-RegularItalic';\n        src: url(" + escape(__webpack_require__(5)) + ");\n        src: url(" + escape(__webpack_require__(5)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(34)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(35)) + ") format(\"woff\"), url(" + escape(__webpack_require__(36)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(37)) + "#Eina02-RegularItalic) format(\"svg\");\n        font-weight: normal;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina02';\n        src: url(" + escape(__webpack_require__(6)) + ");\n        src: url(" + escape(__webpack_require__(6)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(38)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(39)) + ") format(\"woff\"), url(" + escape(__webpack_require__(40)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(41)) + "#Eina02-SemiBold) format(\"svg\");\n        font-weight: 600;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina02';\n        src: url(" + escape(__webpack_require__(7)) + ");\n        src: url(" + escape(__webpack_require__(7)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(42)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(43)) + ") format(\"woff\"), url(" + escape(__webpack_require__(44)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(45)) + "#Eina02-Bold) format(\"svg\");\n        font-weight: bold;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina02';\n        src: url(" + escape(__webpack_require__(8)) + ");\n        src: url(" + escape(__webpack_require__(8)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(46)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(47)) + ") format(\"woff\"), url(" + escape(__webpack_require__(48)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(49)) + "#Eina02-Regular) format(\"svg\");\n        font-weight: normal;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina03-BoldItalic';\n        src: url(" + escape(__webpack_require__(50)) + ");\n        src: url(" + escape(__webpack_require__(50)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(101)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(102)) + ") format(\"woff\"), url(" + escape(__webpack_require__(103)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(104)) + "#Eina03-BoldItalic) format(\"svg\");\n        font-weight: bold;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina04';\n        src: url(" + escape(__webpack_require__(51)) + ");\n        src: url(" + escape(__webpack_require__(51)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(105)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(106)) + ") format(\"woff\"), url(" + escape(__webpack_require__(107)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(108)) + "#Eina04-SemiBold) format(\"svg\");\n        font-weight: 600;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina04-LightItalic';\n        src: url(" + escape(__webpack_require__(52)) + ");\n        src: url(" + escape(__webpack_require__(52)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(109)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(110)) + ") format(\"woff\"), url(" + escape(__webpack_require__(111)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(112)) + "#Eina04-LightItalic) format(\"svg\");\n        font-weight: 300;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina04';\n        src: url(" + escape(__webpack_require__(53)) + ");\n        src: url(" + escape(__webpack_require__(53)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(113)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(114)) + ") format(\"woff\"), url(" + escape(__webpack_require__(115)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(116)) + "#Eina04-Regular) format(\"svg\");\n        font-weight: normal;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina03-LightItalic';\n        src: url(" + escape(__webpack_require__(54)) + ");\n        src: url(" + escape(__webpack_require__(54)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(117)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(118)) + ") format(\"woff\"), url(" + escape(__webpack_require__(119)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(120)) + "#Eina03-LightItalic) format(\"svg\");\n        font-weight: 300;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina04';\n        src: url(" + escape(__webpack_require__(55)) + ");\n        src: url(" + escape(__webpack_require__(55)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(121)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(122)) + ") format(\"woff\"), url(" + escape(__webpack_require__(123)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(124)) + "#Eina04-Bold) format(\"svg\");\n        font-weight: bold;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina03';\n        src: url(" + escape(__webpack_require__(56)) + ");\n        src: url(" + escape(__webpack_require__(56)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(125)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(126)) + ") format(\"woff\"), url(" + escape(__webpack_require__(127)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(128)) + "#Eina03-SemiBold) format(\"svg\");\n        font-weight: 600;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina03';\n        src: url(" + escape(__webpack_require__(57)) + ");\n        src: url(" + escape(__webpack_require__(57)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(129)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(130)) + ") format(\"woff\"), url(" + escape(__webpack_require__(131)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(132)) + "#Eina03-Light) format(\"svg\");\n        font-weight: 300;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina03';\n        src: url(" + escape(__webpack_require__(58)) + ");\n        src: url(" + escape(__webpack_require__(58)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(133)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(134)) + ") format(\"woff\"), url(" + escape(__webpack_require__(135)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(136)) + "#Eina03-Regular) format(\"svg\");\n        font-weight: normal;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina04-RegularItalic';\n        src: url(" + escape(__webpack_require__(59)) + ");\n        src: url(" + escape(__webpack_require__(59)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(137)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(138)) + ") format(\"woff\"), url(" + escape(__webpack_require__(139)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(140)) + "#Eina04-RegularItalic) format(\"svg\");\n        font-weight: normal;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina03-RegularItalic';\n        src: url(" + escape(__webpack_require__(60)) + ");\n        src: url(" + escape(__webpack_require__(60)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(141)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(142)) + ") format(\"woff\"), url(" + escape(__webpack_require__(143)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(144)) + "#Eina03-RegularItalic) format(\"svg\");\n        font-weight: normal;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina04-SemiboldItalic';\n        src: url(" + escape(__webpack_require__(61)) + ");\n        src: url(" + escape(__webpack_require__(61)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(145)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(146)) + ") format(\"woff\"), url(" + escape(__webpack_require__(147)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(148)) + "#Eina04-SemiboldItalic) format(\"svg\");\n        font-weight: 600;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina04-BoldItalic';\n        src: url(" + escape(__webpack_require__(62)) + ");\n        src: url(" + escape(__webpack_require__(62)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(149)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(150)) + ") format(\"woff\"), url(" + escape(__webpack_require__(151)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(152)) + "#Eina04-BoldItalic) format(\"svg\");\n        font-weight: bold;\n        font-style: italic; }\n\n@font-face {\n        font-family: 'Eina04';\n        src: url(" + escape(__webpack_require__(63)) + ");\n        src: url(" + escape(__webpack_require__(63)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(153)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(154)) + ") format(\"woff\"), url(" + escape(__webpack_require__(155)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(156)) + "#Eina04-Light) format(\"svg\");\n        font-weight: 300;\n        font-style: normal; }\n\n@font-face {\n        font-family: 'Eina03-SemiboldItalic';\n        src: url(" + escape(__webpack_require__(64)) + ");\n        src: url(" + escape(__webpack_require__(64)) + "?#iefix) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(157)) + ") format(\"woff2\"), url(" + escape(__webpack_require__(158)) + ") format(\"woff\"), url(" + escape(__webpack_require__(159)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(160)) + "#Eina03-SemiboldItalic) format(\"svg\");\n        font-weight: 600;\n        font-style: italic; }\n\nbody {\n        -moz-font-feature-settings: \"liga\", \"kern\";\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n        text-rendering: optimizeLegibility; }\n\n.reveal .slides > section,\n.reveal .slides > section > section {\n        display: none;\n        position: absolute;\n        width: 100%;\n        padding: 0px 0px !important;\n        pointer-events: auto;\n        z-index: 10;\n        -webkit-transform-style: flat;\n           -moz-transform-style: flat;\n                transform-style: flat;\n        -webkit-transition: visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -webkit-transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -webkit-transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n        transition: visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -webkit-transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -webkit-transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n        -o-transition: visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -o-transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -o-transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n        -moz-transition: transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -moz-transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -moz-transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n        transition: transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n        transition: transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -webkit-transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -moz-transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -o-transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -webkit-transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -moz-transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -o-transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n        margin: 40px !important;\n        color: black !important;\n        line-height: 0.8em;\n        letter-spacing: -0.002em;\n        text-shadow: none; }\n\n.reveal h1 {\n        margin: 40px !important;\n        font-size: 5rem !important;\n        font-weight: 600 !important;\n        font-family: \"Eina03\", \"Helvetica\", sans-serif !important;\n        letter-spacing: -1.2em;\n        text-align: left;\n        line-height: 1.55em !important;\n        text-transform: none !important; }\n\n.reveal h2 {\n        margin: 40px !important;\n        font-size: 6rem !important;\n        font-weight: 400 !important;\n        font-family: \"Eina03\", \"Helvetica\", sans-serif !important;\n        letter-spacing: -1.2em;\n        text-align: left;\n        line-height: 1.55em !important;\n        text-transform: none !important; }\n\n.reveal h4 {\n        font-size: 2.1rem !important;\n        font-family: \"Eina02\", \"Helvetica\", sans-serif !important;\n        letter-spacing: -1.2em;\n        text-align: center;\n        line-height: 1.055em !important; }\n\nh1.quote {\n        max-width: 100%;\n        font-size: 2em;\n        font-family: \"Eina02\", \"Helvetica\", sans-serif !important;\n        letter-spacing: -1.2em;\n        text-align: center; }\n\nh1.main {\n        max-width: 100%;\n        font-size: 2.3em;\n        font-family: \"Eina03\", Helvetica, sans-serif !important;\n        letter-spacing: -1.2em;\n        text-align: center;\n        line-height: 1.055em !important; }\n\n[data-state=\"main\"] h1 {\n        color: black !important; }\n\n[data-state=\"main\"] h3 {\n        max-width: 100%;\n        font-size: 2.3em;\n        font-family: \"Eina03\", Helvetica, sans-serif !important;\n        letter-spacing: -1.2em;\n        text-align: left !important;\n        line-height: 1.055em !important; }\n\n[data-state=\"main\"] p {\n        font-size: 1.8rem !important;\n        line-height: 2.5rem !important;\n        text-align: left !important;\n        font-weight: 600 !important; }\n\n[data-state=\"parts\"] h1 {\n        color: white !important; }\n\n[data-state=\"parts\"] h2 {\n        color: white !important; }\n\n[data-state=\"parts\"] ul {\n        text-align: left !important;\n        margin: 40px 0px 0px 0px !important;\n        color: white !important; }\n\n[data-state=\"parts\"] ul li {\n        line-height: 1.5em !important; }\n\n[data-state=\"parts\"] a {\n        font-size: 1.5rem !important;\n        line-height: 1.5rem !important;\n        margin: 0px !important;\n        color: white !important; }\n\n[data-state=\"parts\"] p {\n        font-size: 2.8rem !important;\n        line-height: 2.5rem !important;\n        text-align: left !important;\n        font-weight: 600 !important; }\n\n[data-state=\"parts\"] .split ul {\n        text-align: left !important;\n        margin: 40px 0px 0px 0px !important;\n        color: black !important; }\n\n[data-state=\"parts\"] ul li {\n        line-height: 1.5em !important; }\n\n[data-state=\"parts\"] .split a {\n        font-size: 24px !important;\n        font-size: 1.5rem !important;\n        line-height: 24px !important;\n        line-height: 1.5rem !important;\n        margin: 0px !important;\n        color: black !important; }\n\n[data-state=\"blank\"] h1 {\n        color: black !important; }\n\n[data-state=\"quote\"] h1,\n[data-state=\"quote\"] h2,\n[data-state=\"quote\"] h3 {\n        color: white !important;\n        text-align: left !important; }\n\n[data-state=\"quote\"] h2 {\n        padding-top: 90px !important;\n        color: white !important;\n        line-height: 1.5em !important; }\n\n[data-state=\"quote\"] h1 div, [data-state=\"quote\"] h2 div {\n        color: white !important;\n        background-color: black !important; }\n\n[data-state=\"quote\"] p {\n        text-align: left !important; }\n\n[data-state=\"image\"] .reveal .slides > section {\n        background-color: rgba(0, 0, 0, 0.9); }\n\nsection > section p.inline {\n        text-align: center !important;\n        display: inline-block !important;\n        margin-right: 8px; }\n\n[data-state=\"iframe\"] h2 {\n        position: relative;\n        z-index: 1000;\n        font-size: 3rem !important;\n        padding-top: 50px; }\n\n.iframe .side {\n        top: 250px;\n        position: relative;\n        z-index: 1000;\n        width: 350px;\n        text-align: left;\n        font-size: 3rem !important;\n        padding-top: 0px;\n        float: left !important; }\n\n[data-state=\"iframe\"] h4 {\n        position: relative;\n        z-index: 1000;\n        font-size: 2.5rem !important;\n        background-color: rgba(255, 255, 255, 0.6); }\n\n[data-state=\"iframe\"] h4 a {\n        color: black !important; }\n\n[data-state=\"iframe\"] iframe {\n        margin-top: -180px; }\n\n.background-content h1 {\n        color: white !important; }\n\nh2 {\n        font-size: 3rem !important;\n        font-weight: 500 !important;\n        font-family: \"Eina02\", \"Helvetica\", sans-serif !important;\n        letter-spacing: -1.2em;\n        text-align: center;\n        line-height: 1.055em !important;\n        padding-top: 20px;\n        text-transform: none !important; }\n\nh3 {\n        font-size: 2.8rem !important;\n        font-weight: 300 !important;\n        font-family: \"Eina02\", \"Helvetica\", sans-serif !important;\n        letter-spacing: -1.2em;\n        text-align: center;\n        line-height: 1.055em !important;\n        padding-top: 20px;\n        text-transform: none !important; }\n\nh4 {\n        font-size: 2.5rem !important;\n        font-weight: 300 !important;\n        font-family: \"Eina02\", \"Helvetica\", sans-serif !important;\n        letter-spacing: -1.2em;\n        text-align: center !important;\n        line-height: 1.055em !important;\n        padding-top: 20px;\n        text-transform: none !important; }\n\n.reveal p {\n        margin: 40px !important;\n        font-family: \"Eina03\", \"Helvetica\", sans-serif !important;\n        font-size: 2rem;\n        color: #1D47FF;\n        text-align: center; }\n\n.split {\n        width: 100% !important; }\n\narticle {\n        position: relative;\n        top: 50%;\n        left: 50%;\n        padding: 0;\n        text-align: center;\n        -webkit-transform: translate(-50%, -50%);\n           -moz-transform: translate(-50%, -50%);\n             -o-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%); }\n\n.left {\n        background-color: rgba(0, 0, 0, 0.6);\n        float: left;\n        width: 45%;\n        height: 100vh; }\n\n.right {\n        background-color: rgba(255, 255, 255, 0.4);\n        /* Safari 9+ */\n        backdrop-filter: blur(10px);\n        /* Chrome and Opera */\n        float: right;\n        width: 55%;\n        height: 100vh; }\n\n.title {\n        position: relative; }\n\n.title .misc {\n        position: absolute;\n        top: -100px;\n        left: 0px;\n        z-index: 100;\n        width: 270px;\n        height: 255px; }\n\n.title .column {\n        position: absolute;\n        top: 35%;\n        right: 50px;\n        display: block;\n        width: 15px;\n        height: 175px;\n        z-index: 101; }\n\n.title .misc-quote {\n        position: absolute;\n        top: -100px;\n        left: 0;\n        right: 0;\n        z-index: 100;\n        width: 100%;\n        height: 300px; }\n\n.title h2 {\n        position: relative; }\n\n.title span {\n        display: inline-block;\n        font-size: .4em;\n        position: absolute;\n        top: -8px;\n        padding-left: 5px; }\n\n/*********************************************\n * GLOBAL STYLES\n *********************************************/\nbody {\n        background: white;\n        background-color: white; }\n\n.reveal {\n        font-family: \"Eina02\", \"Helvetica\", sans-serif;\n        font-size: 40px;\n        font-weight: normal;\n        color: #fff; }\n\n::-moz-selection {\n        color: #fff;\n        background: rgba(0, 0, 0, 0.99);\n        text-shadow: none; }\n\n::selection {\n        color: #fff;\n        background: rgba(0, 0, 0, 0.99);\n        text-shadow: none; }\n\n::-moz-selection {\n        color: #fff;\n        background: rgba(0, 0, 0, 0.99);\n        text-shadow: none; }\n\n.reveal .slides > section,\n.reveal .slides > section > section {\n        line-height: 1.3;\n        font-weight: inherit; }\n\n/*********************************************\n * HEADERS\n *********************************************/\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n        margin: 0 0 20px 0;\n        color: black;\n        font-family: \"Eina02\", Helvetica, sans-serif;\n        font-weight: normal;\n        line-height: 0.8em;\n        letter-spacing: -0.002em;\n        text-transform: uppercase;\n        text-shadow: none;\n        word-wrap: break-word; }\n\n.reveal h1 {\n        font-size: 3.77em; }\n\n.reveal h2 {\n        font-size: 2.11em; }\n\n.reveal h3 {\n        font-size: 1.55em; }\n\n.reveal h4 {\n        font-size: 1em; }\n\n.reveal h1 {\n        text-shadow: none; }\n\n/*********************************************\n * OTHER\n *********************************************/\n.reveal p {\n        margin: 20px 0;\n        line-height: 1.3; }\n\n/* Ensure certain elements are never larger than the slide itself */\n.reveal img,\n.reveal video,\n.reveal iframe {\n        max-width: 95%;\n        max-height: 95%; }\n\n.reveal strong,\n.reveal b {\n        font-weight: bold; }\n\n.reveal em {\n        font-style: italic; }\n\n.reveal ol,\n.reveal dl,\n.reveal ul {\n        font-family: \"Eina03\", Helvetica, sans-serif;\n        font-size: 2em !important;\n        font-weight: normal;\n        line-height: 0.8em;\n        display: inline-block;\n        text-align: left;\n        color: black;\n        margin: 0 0 0 1em; }\n\n.reveal ol {\n        list-style-type: decimal; }\n\n.reveal ul {\n        list-style-type: disc; }\n\n.reveal ul ul {\n        list-style-type: square; }\n\n.reveal ul ul ul {\n        list-style-type: circle; }\n\n.reveal ul ul,\n.reveal ul ol,\n.reveal ol ol,\n.reveal ol ul {\n        display: block;\n        margin-left: 40px; }\n\n.reveal dt {\n        font-weight: bold; }\n\n.reveal dd {\n        margin-left: 40px; }\n\n.reveal q,\n.reveal blockquote {\n        quotes: none; }\n\n.reveal blockquote {\n        display: block;\n        position: relative;\n        width: 70%;\n        margin: 20px auto;\n        padding: 5px;\n        font-style: italic;\n        background: rgba(255, 255, 255, 0.05);\n        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2); }\n\n.reveal blockquote p:first-child,\n.reveal blockquote p:last-child {\n        display: inline-block; }\n\n.reveal q {\n        font-style: italic; }\n\n.reveal pre {\n        display: block;\n        position: relative;\n        width: 90%;\n        margin: 20px auto;\n        text-align: left;\n        font-size: 0.55em;\n        font-family: monospace;\n        line-height: 1.2em;\n        word-wrap: break-word;\n        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3); }\n\n.reveal code {\n        font-family: monospace; }\n\n.reveal pre code {\n        display: block;\n        padding: 5px;\n        overflow: auto;\n        max-height: 400px;\n        word-wrap: normal; }\n\n.reveal table {\n        margin: auto;\n        border-collapse: collapse;\n        border-spacing: 0; }\n\n.reveal table th {\n        font-weight: bold; }\n\n.reveal table th,\n.reveal table td {\n        text-align: left;\n        padding: 0.2em 0.5em 0.2em 0.5em;\n        border-bottom: 1px solid; }\n\n.reveal table th[align=\"center\"],\n.reveal table td[align=\"center\"] {\n        text-align: center; }\n\n.reveal table th[align=\"right\"],\n.reveal table td[align=\"right\"] {\n        text-align: right; }\n\n.reveal table tbody tr:last-child th,\n.reveal table tbody tr:last-child td {\n        border-bottom: none; }\n\n.reveal sup {\n        vertical-align: super; }\n\n.reveal sub {\n        vertical-align: sub; }\n\n.reveal small {\n        display: inline-block;\n        font-size: 0.6em;\n        line-height: 1.2em;\n        vertical-align: top; }\n\n.reveal small * {\n        vertical-align: top; }\n\n/*********************************************\n * LINKS\n *********************************************/\n.reveal a {\n        color: white;\n        text-decoration: none;\n        -webkit-transition: color .15s ease;\n        -moz-transition: color .15s ease;\n        -o-transition: color .15s ease;\n        transition: color .15s ease; }\n\n.reveal a:hover {\n        color: white;\n        text-shadow: none;\n        border: none; }\n\n.reveal .roll span:after {\n        color: #fff;\n        background: #d9d9d9; }\n\n/*********************************************\n * IMAGES\n *********************************************/\n.reveal section img {\n        margin: 15px 0px;\n        background: rgba(255, 255, 255, 0.12);\n        border: 4px solid #fff;\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); }\n\n.reveal section img.plain {\n        border: 0;\n        box-shadow: none; }\n\n.reveal a img {\n        -webkit-transition: all .15s linear;\n        -moz-transition: all .15s linear;\n        -o-transition: all .15s linear;\n        transition: all .15s linear; }\n\n.reveal a:hover img {\n        background: rgba(255, 255, 255, 0.2);\n        border-color: white;\n        box-shadow: 0 0 20px rgba(0, 0, 0, 0.55); }\n\n/*********************************************\n * NAVIGATION CONTROLS\n *********************************************/\n.reveal .controls .navigate-left,\n.reveal .controls .navigate-left.enabled {\n        border-right-color: white; }\n\n.reveal .controls .navigate-right,\n.reveal .controls .navigate-right.enabled {\n        border-left-color: white; }\n\n.reveal .controls .navigate-up,\n.reveal .controls .navigate-up.enabled {\n        border-bottom-color: white; }\n\n.reveal .controls .navigate-down,\n.reveal .controls .navigate-down.enabled {\n        border-top-color: white; }\n\n.reveal .controls .navigate-left.enabled:hover {\n        border-right-color: white; }\n\n.reveal .controls .navigate-right.enabled:hover {\n        border-left-color: white; }\n\n.reveal .controls .navigate-up.enabled:hover {\n        border-bottom-color: white; }\n\n.reveal .controls .navigate-down.enabled:hover {\n        border-top-color: white; }\n\n/*********************************************\n * PROGRESS BAR\n *********************************************/\n.reveal .progress {\n        background: rgba(0, 0, 0, 0.2); }\n\n.reveal .progress span {\n        background: white;\n        -webkit-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n        -moz-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n        -o-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n        transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n#creative-content {\n        width: 100%;\n        height: 100%;\n        position: absolute; }\n\n.icono {\n        display: block;\n        width: 100%;\n        height: 550px;\n        text-align: center;\n        margin: 0 auto;\n        z-index: 1000;\n        position: absolute;\n        top: -200px; }\n\n.icono svg {\n        display: block;\n        width: inherit;\n        height: inherit; }\n\n.fade {\n        opacity: 0.5; }\n\n#posicion {\n        position: absolute;\n        bottom: 250px;\n        right: 0;\n        color: #fff; }\n\n#posicion .numero {\n        text-align: center;\n        font-family: \"Eina02\", \"Helvetica\", sans-serif;\n        font-size: 4.8em;\n        padding-right: 15px;\n        padding-bottom: 10px; }\n\n#posicion .separador {\n        display: block;\n        width: 180px; }\n\n#posicion .separador.parte-uno {\n        border-top: 5px solid #7c00ff; }\n\n#posicion .leyenda {\n        font-family: \"Eina02\", \"Helvetica\", sans-serif;\n        text-align: center;\n        padding-top: 20px;\n        padding-bottom: 20px;\n        width: 70%;\n        margin: 0 auto;\n        display: block; }\n\n.reveal section img {\n        margin: 0px;\n        background: none;\n        border: none;\n        box-shadow: none;\n        -webkit-transition: all .2s linear;\n        -o-transition: all .2s linear;\n        -moz-transition: all .2s linear;\n        transition: all .2s linear; }\n\n.reveal a:hover img {\n        background: rgba(255, 255, 255, 0.2);\n        border-color: white;\n        box-shadow: 0 0 20px rgba(0, 0, 0, 0.55); }\n\n.reveal img {\n        max-width: 100%;\n        max-height: 100%; }\n\n.reveal .controls button {\n        padding: 0;\n        position: absolute;\n        opacity: 0.05;\n        width: 0;\n        height: 0;\n        background-color: transparent;\n        border: 12px solid transparent;\n        -webkit-transform: scale(0.5);\n           -moz-transform: scale(0.5);\n             -o-transform: scale(0.5);\n                transform: scale(0.5);\n        -webkit-transition: all 0.2s ease;\n        -o-transition: all 0.2s ease;\n        -moz-transition: all 0.2s ease;\n        transition: all 0.2s ease;\n        -webkit-appearance: none;\n        -webkit-tap-highlight-color: transparent; }\n\n.lista-diamante {\n        position: absolute;\n        top: -230px;\n        right: 50px;\n        z-index: 2000; }\n\n.lista-diamante .item {\n        overflow: hidden;\n        float: left;\n        width: 350px;\n        height: 350px;\n        margin-left: -51.625px;\n        margin-right: -51.625px;\n        margin-bottom: 144.97475px;\n        -webkit-transform: rotate(45deg);\n        -moz-transform: rotate(45deg);\n        -o-transform: rotate(45deg);\n        transform: rotate(45deg); }\n\n.lista-diamante .item:nth-child(even) {\n        -webkit-transform: translateY(247.48737px) translateX(50px) rotate(45deg);\n        -moz-transform: translateY(247.48737px) translateX(50px) rotate(45deg);\n        -o-transform: translateY(247.48737px) translateX(50px) rotate(45deg);\n        transform: translateY(247.48737px) translateX(50px) rotate(45deg); }\n\n.lista-diamante .contenidos {\n        position: relative;\n        width: 494.97475px;\n        height: 494.97475px;\n        -webkit-transform: rotate(-45deg) translateY(-103.25px);\n        -moz-transform: rotate(-45deg) translateY(-103.25px);\n        -o-transform: rotate(-45deg) translateY(-103.25px);\n        transform: rotate(-45deg) translateY(-103.25px); }\n\n.lista-diamante .contenidos img {\n        width: 100%;\n        height: 100%; }\n\n.diamante {\n        position: absolute;\n        top: -130px;\n        right: 50px;\n        z-index: 2000; }\n\n.diamante .item {\n        overflow: hidden;\n        float: left;\n        width: 400px;\n        height: 400px;\n        margin-left: -59px;\n        margin-right: -59px;\n        margin-bottom: 165.68542px;\n        -webkit-transform: rotate(45deg);\n        -moz-transform: rotate(45deg);\n        -o-transform: rotate(45deg);\n        transform: rotate(45deg); }\n\n.diamante .item:nth-child(even) {\n        -webkit-transform: translateY(282.84271px) translateX(50px) rotate(45deg);\n        -moz-transform: translateY(282.84271px) translateX(50px) rotate(45deg);\n        -o-transform: translateY(282.84271px) translateX(50px) rotate(45deg);\n        transform: translateY(282.84271px) translateX(50px) rotate(45deg); }\n\n.diamante .contenidos {\n        position: relative;\n        width: 565.68542px;\n        height: 565.68542px;\n        -webkit-transform: rotate(-45deg) translateY(-118px);\n        -moz-transform: rotate(-45deg) translateY(-118px);\n        -o-transform: rotate(-45deg) translateY(-118px);\n        transform: rotate(-45deg) translateY(-118px); }\n\n.diamante .contenidos img {\n        width: 100%;\n        height: 100%; }\n\nul {\n        list-style: none; }\n\nul li {\n        font-size: 0.7em !important;\n        line-height: 2.1em !important;\n        display: block;\n        margin: 20px; }\n\nnav {\n        position: fixed;\n        background-color: 'white';\n        width: 100%;\n        height: 90px;\n        bottom: -90px;\n        left: 0; }\n\n[data-state=\"iframe\"] {\n        width: 960px !important;\n        height: 700px !important;\n        left: 0px;\n        top: 0px; }\n\n[data-state=\"iframe\"] iframe {\n        width: 100%;\n        height: 100%; }\n\n.iframe {\n        width: 1920px;\n        height: 1080px;\n        left: 0px;\n        right: 0px;\n        top: 0px;\n        margin: 0 auto; }\n\niframe {\n        display: block;\n        position: relative;\n        width: 100%;\n        height: 100%;\n        border: 0; }\n\n.prototypeLinks {\n    position: relative;\n    left: 20px;\n    bottom: -90vh;\n}\n\n.prototypeLinks a {\n    font-family: \"Eina03\", \"Helvetica\", sans-serif;\n    font-weight: 600 !important;\n    font-size: 1.1rem !important;\n    text-align: left;\n    line-height: 2rem !important;\n    display: block;\n}\n\n.prototypeLinks a.inverted {\n    color: black !important;\n}", ""]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "de72f62adab446e237d3d6ff0596ff66.woff2";

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e871dd8ace5467b36a5a12058a0b3880.woff";

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b3a30644333da81b7ba46d7b8f244eb5.ttf";

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "635102816058589c10784a3b38db4a3c.svg";

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4e59ec028131566ff6a3e3ba2389fe9e.woff2";

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6e6dfad1317822e67cf50d44d40001f7.woff";

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "504add34fa92602b6dd0701329c021bc.ttf";

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6aa05a3a2554fce332b99074eb336b9e.svg";

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f2bcf5948bc6693318e1a8fa2c36d93d.woff2";

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "da0ab8e7af3e10fdc50a535a11b14fb4.woff";

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c200c093570a1e9127a8d9774dd79d26.ttf";

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "241b39fb83faba595632f770a15ed137.svg";

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0ec68616a5cbafe24f5e58a3095fca75.woff2";

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d09f434e086b6b5410703a91c6789a8c.woff";

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "178fadba0219213003e33f909e9c4c2e.ttf";

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cf80c8629080cc7eb0b314562f9bb8ec.svg";

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "462d667b329dd6821623424f5043dc63.woff2";

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c429bcb8490c121beead9b585f57e2f8.woff";

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "58db04aabab1744076a99bb6ec3b0314.ttf";

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c9c1d5cf494c1e6a4fd29d934ef26f3e.svg";

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "87abb555e9c331badf04f8f9e9a668b2.woff2";

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ec2a301f26ffe90cfd0f47a4aa803c8b.woff";

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f568e49823e981e46c066b42bd4801e8.ttf";

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "168d91ffbfbddbcd74319e59637e6e2d.svg";

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1e4055fee14678738a9f63860add1e8f.woff2";

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4e6f9091e0f51c1e64b7af90394e947c.woff";

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "89706f66ab85d408414def3abb3e9aed.ttf";

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7942c809b707c14ee2e86aadfbf203df.svg";

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "45d4fbe207b76142cd0818e6f054d7dd.woff2";

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b7150605d621fb308e9721c8953dd0ea.woff";

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "410e4909c7cd59227c069cf9b960ca99.ttf";

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c287fc634d0542e4a7d6d847076ebce4.svg";

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d8e8321318136cb756cbe85325b9e585.woff2";

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bd16bb1f72d96bf628156f5aee2e3622.woff";

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "43378416b9cd833df874ca1752850cba.ttf";

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "424f1a00edd7671399384885f488d0f1.svg";

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0c977ffb98a657dc4e5233c1df6637dd.woff2";

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bf57eae7786b2fca18a3032590e10d63.woff";

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e628078921c0e9cc958252237db44ef2.ttf";

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c1ed3eb3c1297ec733cdb1adf2fdfd8c.svg";

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "408cdd5c8c7a2a89dccb588702641006.woff2";

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a9348bf9fbb32b29bdc210759f8fe579.woff";

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "98ebca7715789595d56536009d366ebb.ttf";

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5ab5e169f2bff5c0612d77a642e5eb06.svg";

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5ce51ca271c8d97872164bcb6a983915.woff2";

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cda0a00b9ee1273337c2bd213636ddf8.woff";

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c1b3a0bafadc3db8edc7b8c16cb5eb74.ttf";

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "162d497f029beb2ed56f1b8b68f1a0f2.svg";

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a2dc9c146cf30e1c5e099533a2f3c61d.woff2";

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4bdaff9354cdc3569d15efbffcd86e8b.woff";

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "54d4d6951e5e2bed6847fd9fcbe47db2.ttf";

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5de8d7ae440b220eaaaa8268fb68d18e.svg";

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fe7048e2b779edb8614a0c5b6630aa5d.woff2";

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8ce9836cc78377562a41ae939e89a8d6.woff";

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "79bc9272324e239c8d12ca585b9193dc.ttf";

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a5168f808400debbf98e442eb408dd70.svg";

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "219cac5a8c9d548ba437fbffe9efc3cc.woff2";

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9cbd70423f570397522368d45cfae1ff.woff";

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fa0d9a9cfc7fec6973046cab2c6bbe20.ttf";

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cdcaba688f60ae73588270e61b4c1ae7.svg";

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2417f688f0fcb72a14f750d2c0444aae.woff2";

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "58048d6667897ffa7ed6136f658cfa22.woff";

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "93af1c15b8c1f6c670a483a604a139cc.ttf";

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1ffe1e19e326577aa2b2bba004631a5d.svg";

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b8383b83f1bfcd0b48bdb33e521a0909.woff2";

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8e9b37a34034ef7b9b3bf5c77512c8ea.woff";

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "20f2b1ac439c14ee574f3dc708a0c6cd.ttf";

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "eb8c3b0ab6d484988dd68433feb3e391.svg";

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4044a7a89316ee5842d087ff375ece44.woff2";

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4cadd1efc801050d9d47d13c31dc5a70.woff";

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "02cac3260952eb7f62501f53bd2cb63e.ttf";

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e07a30dc091ef1ea1d83e952a8018052.svg";

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "612f7e9942615e987571580068065156.woff2";

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a819c5399c5bdc201aa605b423bc1e54.woff";

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ef8462ff9e6e919f05ddf7135fd4fbc6.ttf";

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0df3dd0d29b5a6ddda40bb323801d5e7.svg";

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b7772ba86b8c2cfddce82d08ef369f58.woff2";

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "08efc082ca7f9791818eac6c69e5abf7.woff";

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "07eb6d09f8fb5150ac3dbc5f68b7db10.ttf";

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fa73e14a05063f6980223a531cd64c10.svg";

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "10ffa9545cbc66bcd6760683b9941cd7.woff2";

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "535919d175473e3d95415da506ea5b35.woff";

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3e5121ce67b0e430e0b51eafa526626b.ttf";

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c429287f52ce2f8ed9f3c1951fd3e575.svg";

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "56581693cddc48c99ed7a6c9974bd9d9.woff2";

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8384c5a564db10fda85325b9cb762855.woff";

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bebce2277237867dea44f488a2740aea.ttf";

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a3639b1b92a83773f9a11ef86bae0d54.svg";

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1f6136f1ee517d50fcd75fbacce44a84.woff2";

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3949d71ab2cdcba0b8f5cdbb800705e6.woff";

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f2d0dc32c8bba27a3896c8ac5bcaf15a.ttf";

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6545e965cf654f0ca70749a4cb6048ab.svg";

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(9);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*!\n * reveal.js\n * http://revealjs.com\n * MIT licensed\n *\n * Copyright (C) 2017 Hakim El Hattab, http://hakim.se\n */\n\n@font-face {\n    font-family: 'Eina02-LightItalic';\n    src: url(" + escape(__webpack_require__(1)) + ");\n    src: url(" + escape(__webpack_require__(1)) + "?#iefix) format('embedded-opentype'),\n        url(" + escape(__webpack_require__(18)) + ") format('woff2'),\n        url(" + escape(__webpack_require__(19)) + ") format('woff'),\n        url(" + escape(__webpack_require__(20)) + ") format('truetype'),\n        url(" + escape(__webpack_require__(21)) + "#Eina02-LightItalic) format('svg');\n    font-weight: 300;\n    font-style: italic;\n}\n\n@font-face {\n    font-family: 'Eina02-SemiboldItalic';\n    src: url(" + escape(__webpack_require__(2)) + ");\n    src: url(" + escape(__webpack_require__(2)) + "?#iefix) format('embedded-opentype'),\n        url(" + escape(__webpack_require__(22)) + ") format('woff2'),\n        url(" + escape(__webpack_require__(23)) + ") format('woff'),\n        url(" + escape(__webpack_require__(24)) + ") format('truetype'),\n        url(" + escape(__webpack_require__(25)) + "#Eina02-SemiboldItalic) format('svg');\n    font-weight: 600;\n    font-style: italic;\n}\n\n@font-face {\n    font-family: 'Eina02';\n    src: url(" + escape(__webpack_require__(3)) + ");\n    src: url(" + escape(__webpack_require__(3)) + "?#iefix) format('embedded-opentype'),\n        url(" + escape(__webpack_require__(26)) + ") format('woff2'),\n        url(" + escape(__webpack_require__(27)) + ") format('woff'),\n        url(" + escape(__webpack_require__(28)) + ") format('truetype'),\n        url(" + escape(__webpack_require__(29)) + "#Eina02-Light) format('svg');\n    font-weight: 300;\n    font-style: normal;\n}\n\n@font-face {\n    font-family: 'Eina02-BoldItalic';\n    src: url(" + escape(__webpack_require__(4)) + ");\n    src: url(" + escape(__webpack_require__(4)) + "?#iefix) format('embedded-opentype'),\n        url(" + escape(__webpack_require__(30)) + ") format('woff2'),\n        url(" + escape(__webpack_require__(31)) + ") format('woff'),\n        url(" + escape(__webpack_require__(32)) + ") format('truetype'),\n        url(" + escape(__webpack_require__(33)) + "#Eina02-BoldItalic) format('svg');\n    font-weight: bold;\n    font-style: italic;\n}\n\n@font-face {\n    font-family: 'Eina02-RegularItalic';\n    src: url(" + escape(__webpack_require__(5)) + ");\n    src: url(" + escape(__webpack_require__(5)) + "?#iefix) format('embedded-opentype'),\n        url(" + escape(__webpack_require__(34)) + ") format('woff2'),\n        url(" + escape(__webpack_require__(35)) + ") format('woff'),\n        url(" + escape(__webpack_require__(36)) + ") format('truetype'),\n        url(" + escape(__webpack_require__(37)) + "#Eina02-RegularItalic) format('svg');\n    font-weight: normal;\n    font-style: italic;\n}\n\n@font-face {\n    font-family: 'Eina02';\n    src: url(" + escape(__webpack_require__(6)) + ");\n    src: url(" + escape(__webpack_require__(6)) + "?#iefix) format('embedded-opentype'),\n        url(" + escape(__webpack_require__(38)) + ") format('woff2'),\n        url(" + escape(__webpack_require__(39)) + ") format('woff'),\n        url(" + escape(__webpack_require__(40)) + ") format('truetype'),\n        url(" + escape(__webpack_require__(41)) + "#Eina02-SemiBold) format('svg');\n    font-weight: 600;\n    font-style: normal;\n}\n\n@font-face {\n    font-family: 'Eina02';\n    src: url(" + escape(__webpack_require__(7)) + ");\n    src: url(" + escape(__webpack_require__(7)) + "?#iefix) format('embedded-opentype'),\n        url(" + escape(__webpack_require__(42)) + ") format('woff2'),\n        url(" + escape(__webpack_require__(43)) + ") format('woff'),\n        url(" + escape(__webpack_require__(44)) + ") format('truetype'),\n        url(" + escape(__webpack_require__(45)) + "#Eina02-Bold) format('svg');\n    font-weight: bold;\n    font-style: normal;\n}\n\n@font-face {\n    font-family: 'Eina02';\n    src: url(" + escape(__webpack_require__(8)) + ");\n    src: url(" + escape(__webpack_require__(8)) + "?#iefix) format('embedded-opentype'),\n        url(" + escape(__webpack_require__(46)) + ") format('woff2'),\n        url(" + escape(__webpack_require__(47)) + ") format('woff'),\n        url(" + escape(__webpack_require__(48)) + ") format('truetype'),\n        url(" + escape(__webpack_require__(49)) + "#Eina02-Regular) format('svg');\n    font-weight: normal;\n    font-style: normal;\n}\n/*********************************************\n * RESET STYLES\n *********************************************/\nhtml, body, .reveal div, .reveal span, .reveal applet, .reveal object, .reveal iframe,\n.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6, .reveal p, .reveal blockquote, .reveal pre,\n.reveal a, .reveal abbr, .reveal acronym, .reveal address, .reveal big, .reveal cite, .reveal code,\n.reveal del, .reveal dfn, .reveal em, .reveal img, .reveal ins, .reveal kbd, .reveal q, .reveal s, .reveal samp,\n.reveal small, .reveal strike, .reveal strong, .reveal sub, .reveal sup, .reveal tt, .reveal var,\n.reveal b, .reveal u, .reveal center,\n.reveal dl, .reveal dt, .reveal dd, .reveal ol, .reveal ul, .reveal li,\n.reveal fieldset, .reveal form, .reveal label, .reveal legend,\n.reveal table, .reveal caption, .reveal tbody, .reveal tfoot, .reveal thead, .reveal tr, .reveal th, .reveal td,\n.reveal article, .reveal aside, .reveal canvas, .reveal details, .reveal embed,\n.reveal figure, .reveal figcaption, .reveal footer, .reveal header, .reveal hgroup,\n.reveal menu, .reveal nav, .reveal output, .reveal ruby, .reveal section, .reveal summary,\n.reveal time, .reveal mark, .reveal audio, .reveal video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n.reveal article, .reveal aside, .reveal details, .reveal figcaption, .reveal figure,\n.reveal footer, .reveal header, .reveal hgroup, .reveal menu, .reveal nav, .reveal section {\n  display: block; }\n\n/*********************************************\n * GLOBAL STYLES\n *********************************************/\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\nbody {\n  position: relative;\n  line-height: 1;\n  background-color: #fff;\n  color: #000; }\n\n/*********************************************\n * VIEW FRAGMENTS\n *********************************************/\n.reveal .slides section .fragment {\n  opacity: 0;\n  visibility: hidden;\n  transition: all .2s ease; }\n  .reveal .slides section .fragment.visible {\n    opacity: 1;\n    visibility: inherit; }\n\n.reveal .slides section .fragment.grow {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.grow.visible {\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3); }\n\n.reveal .slides section .fragment.shrink {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.shrink.visible {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n\n.reveal .slides section .fragment.zoom-in {\n  -webkit-transform: scale(0.1);\n          transform: scale(0.1); }\n  .reveal .slides section .fragment.zoom-in.visible {\n    -webkit-transform: none;\n            transform: none; }\n\n.reveal .slides section .fragment.fade-out {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.fade-out.visible {\n    opacity: 0;\n    visibility: hidden; }\n\n.reveal .slides section .fragment.semi-fade-out {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.semi-fade-out.visible {\n    opacity: 0.5;\n    visibility: inherit; }\n\n.reveal .slides section .fragment.strike {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.strike.visible {\n    text-decoration: line-through; }\n\n.reveal .slides section .fragment.fade-up {\n  -webkit-transform: translate(0, 20%);\n          transform: translate(0, 20%); }\n  .reveal .slides section .fragment.fade-up.visible {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.reveal .slides section .fragment.fade-down {\n  -webkit-transform: translate(0, -20%);\n          transform: translate(0, -20%); }\n  .reveal .slides section .fragment.fade-down.visible {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.reveal .slides section .fragment.fade-right {\n  -webkit-transform: translate(-20%, 0);\n          transform: translate(-20%, 0); }\n  .reveal .slides section .fragment.fade-right.visible {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.reveal .slides section .fragment.fade-left {\n  -webkit-transform: translate(20%, 0);\n          transform: translate(20%, 0); }\n  .reveal .slides section .fragment.fade-left.visible {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.reveal .slides section .fragment.current-visible {\n  opacity: 0;\n  visibility: hidden; }\n  .reveal .slides section .fragment.current-visible.current-fragment {\n    opacity: 1;\n    visibility: inherit; }\n\n.reveal .slides section .fragment.highlight-red,\n.reveal .slides section .fragment.highlight-current-red,\n.reveal .slides section .fragment.highlight-green,\n.reveal .slides section .fragment.highlight-current-green,\n.reveal .slides section .fragment.highlight-blue,\n.reveal .slides section .fragment.highlight-current-blue {\n  opacity: 1;\n  visibility: inherit; }\n\n.reveal .slides section .fragment.highlight-red.visible {\n  color: #ff2c2d; }\n\n.reveal .slides section .fragment.highlight-green.visible {\n  color: #17ff2e; }\n\n.reveal .slides section .fragment.highlight-blue.visible {\n  color: #1b91ff; }\n\n.reveal .slides section .fragment.highlight-current-red.current-fragment {\n  color: #ff2c2d; }\n\n.reveal .slides section .fragment.highlight-current-green.current-fragment {\n  color: #17ff2e; }\n\n.reveal .slides section .fragment.highlight-current-blue.current-fragment {\n  color: #1b91ff; }\n\n/*********************************************\n * DEFAULT ELEMENT STYLES\n *********************************************/\n/* Fixes issue in Chrome where italic fonts did not appear when printing to PDF */\n.reveal:after {\n  content: '';\n  font-style: italic; }\n\n.reveal iframe {\n  z-index: 1; }\n\n/** Prevents layering issues in certain browser/transition combinations */\n.reveal a {\n  position: relative; }\n\n.reveal .stretch {\n  max-width: none;\n  max-height: none; }\n\n.reveal pre.stretch code {\n  height: 100%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n/*********************************************\n * CONTROLS\n *********************************************/\n@-webkit-keyframes bounce-right {\n  0%, 10%, 25%, 40%, 50% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0); }\n  20% {\n    -webkit-transform: translateX(10px);\n            transform: translateX(10px); }\n  30% {\n    -webkit-transform: translateX(-5px);\n            transform: translateX(-5px); } }\n@keyframes bounce-right {\n  0%, 10%, 25%, 40%, 50% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0); }\n  20% {\n    -webkit-transform: translateX(10px);\n            transform: translateX(10px); }\n  30% {\n    -webkit-transform: translateX(-5px);\n            transform: translateX(-5px); } }\n\n@-webkit-keyframes bounce-down {\n  0%, 10%, 25%, 40%, 50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  20% {\n    -webkit-transform: translateY(10px);\n            transform: translateY(10px); }\n  30% {\n    -webkit-transform: translateY(-5px);\n            transform: translateY(-5px); } }\n\n@keyframes bounce-down {\n  0%, 10%, 25%, 40%, 50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  20% {\n    -webkit-transform: translateY(10px);\n            transform: translateY(10px); }\n  30% {\n    -webkit-transform: translateY(-5px);\n            transform: translateY(-5px); } }\n\n.reveal .controls {\n  display: none;\n  position: absolute;\n  top: auto;\n  bottom: 48px;\n  right: 48px;\n  left: auto;\n  z-index: 1;\n  color: #000;\n  pointer-events: none;\n  font-size: 10px; }\n  .reveal .controls button {\n    position: absolute;\n    padding: 0;\n    background-color: transparent;\n    border: 0;\n    outline: 0;\n    cursor: pointer;\n    color: currentColor;\n    -webkit-transform: scale(0.9999);\n            transform: scale(0.9999);\n    transition: color 0.2s ease, opacity 0.2s ease, -webkit-transform 0.2s ease;\n    transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;\n    z-index: 2;\n    pointer-events: auto;\n    font-size: inherit;\n    visibility: hidden;\n    opacity: 0;\n    -webkit-appearance: none;\n    -webkit-tap-highlight-color: transparent; }\n  .reveal .controls .controls-arrow:before,\n  .reveal .controls .controls-arrow:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2.6em;\n    height: 0.5em;\n    border-radius: 0.25em;\n    background-color: currentColor;\n    transition: all 0.15s ease, background-color 0.8s ease;\n    -webkit-transform-origin: 0.2em 50%;\n            transform-origin: 0.2em 50%;\n    will-change: transform; }\n  .reveal .controls .controls-arrow {\n    position: relative;\n    width: 3.6em;\n    height: 3.6em; }\n    .reveal .controls .controls-arrow:before {\n      -webkit-transform: translateX(0.5em) translateY(1.55em) rotate(45deg);\n              transform: translateX(0.5em) translateY(1.55em) rotate(45deg); }\n    .reveal .controls .controls-arrow:after {\n      -webkit-transform: translateX(0.5em) translateY(1.55em) rotate(-45deg);\n              transform: translateX(0.5em) translateY(1.55em) rotate(-45deg); }\n    .reveal .controls .controls-arrow:hover:before {\n      -webkit-transform: translateX(0.5em) translateY(1.55em) rotate(40deg);\n              transform: translateX(0.5em) translateY(1.55em) rotate(40deg); }\n    .reveal .controls .controls-arrow:hover:after {\n      -webkit-transform: translateX(0.5em) translateY(1.55em) rotate(-40deg);\n              transform: translateX(0.5em) translateY(1.55em) rotate(-40deg); }\n    .reveal .controls .controls-arrow:active:before {\n      -webkit-transform: translateX(0.5em) translateY(1.55em) rotate(36deg);\n              transform: translateX(0.5em) translateY(1.55em) rotate(36deg); }\n    .reveal .controls .controls-arrow:active:after {\n      -webkit-transform: translateX(0.5em) translateY(1.55em) rotate(-36deg);\n              transform: translateX(0.5em) translateY(1.55em) rotate(-36deg); }\n  .reveal .controls .navigate-left {\n    right: 6.4em;\n    bottom: 3.2em;\n    -webkit-transform: translateX(-10px);\n            transform: translateX(-10px); }\n  .reveal .controls .navigate-right {\n    right: 0;\n    bottom: 3.2em;\n    -webkit-transform: translateX(10px);\n            transform: translateX(10px); }\n    .reveal .controls .navigate-right .controls-arrow {\n      -webkit-transform: rotate(180deg);\n              transform: rotate(180deg); }\n    .reveal .controls .navigate-right.highlight {\n      -webkit-animation: bounce-right 2s 50 both ease-out;\n              animation: bounce-right 2s 50 both ease-out; }\n  .reveal .controls .navigate-up {\n    right: 3.2em;\n    bottom: 6.4em;\n    -webkit-transform: translateY(-10px);\n            transform: translateY(-10px); }\n    .reveal .controls .navigate-up .controls-arrow {\n      -webkit-transform: rotate(90deg);\n              transform: rotate(90deg); }\n  .reveal .controls .navigate-down {\n    right: 3.2em;\n    bottom: 0;\n    -webkit-transform: translateY(10px);\n            transform: translateY(10px); }\n    .reveal .controls .navigate-down .controls-arrow {\n      -webkit-transform: rotate(-90deg);\n              transform: rotate(-90deg); }\n    .reveal .controls .navigate-down.highlight {\n      -webkit-animation: bounce-down 2s 50 both ease-out;\n              animation: bounce-down 2s 50 both ease-out; }\n  .reveal .controls[data-controls-back-arrows=\"faded\"] .navigate-left.enabled,\n  .reveal .controls[data-controls-back-arrows=\"faded\"] .navigate-up.enabled {\n    opacity: 0.3; }\n    .reveal .controls[data-controls-back-arrows=\"faded\"] .navigate-left.enabled:hover,\n    .reveal .controls[data-controls-back-arrows=\"faded\"] .navigate-up.enabled:hover {\n      opacity: 1; }\n  .reveal .controls[data-controls-back-arrows=\"hidden\"] .navigate-left.enabled,\n  .reveal .controls[data-controls-back-arrows=\"hidden\"] .navigate-up.enabled {\n    opacity: 0;\n    visibility: hidden; }\n  .reveal .controls .enabled {\n    visibility: visible;\n    opacity: 0.9;\n    cursor: pointer;\n    -webkit-transform: none;\n            transform: none; }\n  .reveal .controls .enabled.fragmented {\n    opacity: 0.5; }\n  .reveal .controls .enabled:hover,\n  .reveal .controls .enabled.fragmented:hover {\n    opacity: 1; }\n\n.reveal:not(.has-vertical-slides) .controls .navigate-left {\n  bottom: 1.4em;\n  right: 5.5em; }\n\n.reveal:not(.has-vertical-slides) .controls .navigate-right {\n  bottom: 1.4em;\n  right: 0.5em; }\n\n.reveal:not(.has-horizontal-slides) .controls .navigate-up {\n  right: 1.4em;\n  bottom: 5em; }\n\n.reveal:not(.has-horizontal-slides) .controls .navigate-down {\n  right: 1.4em;\n  bottom: 0.5em; }\n\n.reveal.has-dark-background .controls {\n  color: #fff; }\n\n.reveal.has-light-background .controls {\n  color: #000; }\n\n.reveal.no-hover .controls .controls-arrow:hover:before,\n.reveal.no-hover .controls .controls-arrow:active:before {\n  -webkit-transform: translateX(0.5em) translateY(1.55em) rotate(45deg);\n          transform: translateX(0.5em) translateY(1.55em) rotate(45deg); }\n\n.reveal.no-hover .controls .controls-arrow:hover:after,\n.reveal.no-hover .controls .controls-arrow:active:after {\n  -webkit-transform: translateX(0.5em) translateY(1.55em) rotate(-45deg);\n          transform: translateX(0.5em) translateY(1.55em) rotate(-45deg); }\n\n@media screen and (min-width: 500px) {\n  .reveal .controls[data-controls-layout=\"edges\"] {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0; }\n  .reveal .controls[data-controls-layout=\"edges\"] .navigate-left,\n  .reveal .controls[data-controls-layout=\"edges\"] .navigate-right,\n  .reveal .controls[data-controls-layout=\"edges\"] .navigate-up,\n  .reveal .controls[data-controls-layout=\"edges\"] .navigate-down {\n    bottom: auto;\n    right: auto; }\n  .reveal .controls[data-controls-layout=\"edges\"] .navigate-left {\n    top: 50%;\n    left: 8px;\n    margin-top: -1.8em; }\n  .reveal .controls[data-controls-layout=\"edges\"] .navigate-right {\n    top: 50%;\n    right: 8px;\n    margin-top: -1.8em; }\n  .reveal .controls[data-controls-layout=\"edges\"] .navigate-up {\n    top: 8px;\n    left: 50%;\n    margin-left: -1.8em; }\n  .reveal .controls[data-controls-layout=\"edges\"] .navigate-down {\n    bottom: 8px;\n    left: 50%;\n    margin-left: -1.8em; } }\n\n/*********************************************\n * PROGRESS BAR\n *********************************************/\n.reveal .progress {\n  position: absolute;\n  display: none;\n  height: 3px;\n  width: 100%;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n  background-color: rgba(0, 0, 0, 0.2);\n  color: #fff; }\n\n.reveal .progress:after {\n  content: '';\n  display: block;\n  position: absolute;\n  height: 10px;\n  width: 100%;\n  top: -10px; }\n\n.reveal .progress span {\n  display: block;\n  height: 100%;\n  width: 0px;\n  background-color: currentColor;\n  transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n/*********************************************\n * SLIDE NUMBER\n *********************************************/\n.reveal .slide-number {\n  position: fixed;\n  display: block;\n  right: 8px;\n  bottom: 8px;\n  z-index: 31;\n  font-family: \"Eina02\", Helvetica, sans-serif;\n  font-size: 12px;\n  line-height: 1;\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.4);\n  padding: 5px; }\n\n.reveal .slide-number-delimiter {\n  margin: 0 3px; }\n\n/*********************************************\n * SLIDES\n *********************************************/\n.reveal {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  -ms-touch-action: none;\n      touch-action: none; }\n\n@media only screen and (orientation: landscape) {\n  .reveal.ua-iphone {\n    position: fixed; } }\n\n.reveal .slides {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  pointer-events: none;\n  overflow: visible;\n  z-index: 1;\n  text-align: center;\n  -webkit-perspective: 600px;\n          perspective: 600px;\n  -webkit-perspective-origin: 50% 40%;\n          perspective-origin: 50% 40%; }\n\n.reveal .slides > section {\n  -ms-perspective: 600px; }\n\n.reveal .slides > section,\n.reveal .slides > section > section {\n  display: none;\n  position: absolute;\n  width: 100%;\n  padding: 20px 0px;\n  pointer-events: auto;\n  z-index: 10;\n  -webkit-transform-style: flat;\n          transform-style: flat;\n  transition: -webkit-transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -webkit-transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  transition: transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n/* Global transition speed settings */\n.reveal[data-transition-speed=\"fast\"] .slides section {\n  transition-duration: 400ms; }\n\n.reveal[data-transition-speed=\"slow\"] .slides section {\n  transition-duration: 1200ms; }\n\n/* Slide-specific transition speed overrides */\n.reveal .slides section[data-transition-speed=\"fast\"] {\n  transition-duration: 400ms; }\n\n.reveal .slides section[data-transition-speed=\"slow\"] {\n  transition-duration: 1200ms; }\n\n.reveal .slides > section.stack {\n  padding-top: 0;\n  padding-bottom: 0; }\n\n.reveal .slides > section.present,\n.reveal .slides > section > section.present {\n  display: block;\n  z-index: 11;\n  opacity: 1; }\n\n.reveal .slides > section:empty,\n.reveal .slides > section > section:empty,\n.reveal .slides > section[data-background-interactive],\n.reveal .slides > section > section[data-background-interactive] {\n  pointer-events: none; }\n\n.reveal.center,\n.reveal.center .slides,\n.reveal.center .slides section {\n  min-height: 0 !important; }\n\n/* Don't allow interaction with invisible slides */\n.reveal .slides > section.future,\n.reveal .slides > section > section.future,\n.reveal .slides > section.past,\n.reveal .slides > section > section.past {\n  pointer-events: none; }\n\n.reveal.overview .slides > section,\n.reveal.overview .slides > section > section {\n  pointer-events: auto; }\n\n.reveal .slides > section.past,\n.reveal .slides > section.future,\n.reveal .slides > section > section.past,\n.reveal .slides > section > section.future {\n  opacity: 0; }\n\n/*********************************************\n * Mixins for readability of transitions\n *********************************************/\n/*********************************************\n * SLIDE TRANSITION\n * Aliased 'linear' for backwards compatibility\n *********************************************/\n.reveal.slide section {\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.reveal .slides > section[data-transition=slide].past,\n.reveal .slides > section[data-transition~=slide-out].past,\n.reveal.slide .slides > section:not([data-transition]).past {\n  -webkit-transform: translate(-150%, 0);\n          transform: translate(-150%, 0); }\n\n.reveal .slides > section[data-transition=slide].future,\n.reveal .slides > section[data-transition~=slide-in].future,\n.reveal.slide .slides > section:not([data-transition]).future {\n  -webkit-transform: translate(150%, 0);\n          transform: translate(150%, 0); }\n\n.reveal .slides > section > section[data-transition=slide].past,\n.reveal .slides > section > section[data-transition~=slide-out].past,\n.reveal.slide .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate(0, -150%);\n          transform: translate(0, -150%); }\n\n.reveal .slides > section > section[data-transition=slide].future,\n.reveal .slides > section > section[data-transition~=slide-in].future,\n.reveal.slide .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate(0, 150%);\n          transform: translate(0, 150%); }\n\n.reveal.linear section {\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.reveal .slides > section[data-transition=linear].past,\n.reveal .slides > section[data-transition~=linear-out].past,\n.reveal.linear .slides > section:not([data-transition]).past {\n  -webkit-transform: translate(-150%, 0);\n          transform: translate(-150%, 0); }\n\n.reveal .slides > section[data-transition=linear].future,\n.reveal .slides > section[data-transition~=linear-in].future,\n.reveal.linear .slides > section:not([data-transition]).future {\n  -webkit-transform: translate(150%, 0);\n          transform: translate(150%, 0); }\n\n.reveal .slides > section > section[data-transition=linear].past,\n.reveal .slides > section > section[data-transition~=linear-out].past,\n.reveal.linear .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate(0, -150%);\n          transform: translate(0, -150%); }\n\n.reveal .slides > section > section[data-transition=linear].future,\n.reveal .slides > section > section[data-transition~=linear-in].future,\n.reveal.linear .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate(0, 150%);\n          transform: translate(0, 150%); }\n\n/*********************************************\n * CONVEX TRANSITION\n * Aliased 'default' for backwards compatibility\n *********************************************/\n.reveal .slides section[data-transition=default].stack,\n.reveal.default .slides section.stack {\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal .slides > section[data-transition=default].past,\n.reveal .slides > section[data-transition~=default-out].past,\n.reveal.default .slides > section:not([data-transition]).past {\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0); }\n\n.reveal .slides > section[data-transition=default].future,\n.reveal .slides > section[data-transition~=default-in].future,\n.reveal.default .slides > section:not([data-transition]).future {\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0); }\n\n.reveal .slides > section > section[data-transition=default].past,\n.reveal .slides > section > section[data-transition~=default-out].past,\n.reveal.default .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n          transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0); }\n\n.reveal .slides > section > section[data-transition=default].future,\n.reveal .slides > section > section[data-transition~=default-in].future,\n.reveal.default .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n          transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0); }\n\n.reveal .slides section[data-transition=convex].stack,\n.reveal.convex .slides section.stack {\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal .slides > section[data-transition=convex].past,\n.reveal .slides > section[data-transition~=convex-out].past,\n.reveal.convex .slides > section:not([data-transition]).past {\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0); }\n\n.reveal .slides > section[data-transition=convex].future,\n.reveal .slides > section[data-transition~=convex-in].future,\n.reveal.convex .slides > section:not([data-transition]).future {\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0); }\n\n.reveal .slides > section > section[data-transition=convex].past,\n.reveal .slides > section > section[data-transition~=convex-out].past,\n.reveal.convex .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n          transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0); }\n\n.reveal .slides > section > section[data-transition=convex].future,\n.reveal .slides > section > section[data-transition~=convex-in].future,\n.reveal.convex .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n          transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0); }\n\n/*********************************************\n * CONCAVE TRANSITION\n *********************************************/\n.reveal .slides section[data-transition=concave].stack,\n.reveal.concave .slides section.stack {\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal .slides > section[data-transition=concave].past,\n.reveal .slides > section[data-transition~=concave-out].past,\n.reveal.concave .slides > section:not([data-transition]).past {\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0); }\n\n.reveal .slides > section[data-transition=concave].future,\n.reveal .slides > section[data-transition~=concave-in].future,\n.reveal.concave .slides > section:not([data-transition]).future {\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0); }\n\n.reveal .slides > section > section[data-transition=concave].past,\n.reveal .slides > section > section[data-transition~=concave-out].past,\n.reveal.concave .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n          transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0); }\n\n.reveal .slides > section > section[data-transition=concave].future,\n.reveal .slides > section > section[data-transition~=concave-in].future,\n.reveal.concave .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n          transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0); }\n\n/*********************************************\n * ZOOM TRANSITION\n *********************************************/\n.reveal .slides section[data-transition=zoom],\n.reveal.zoom .slides section:not([data-transition]) {\n  transition-timing-function: ease; }\n\n.reveal .slides > section[data-transition=zoom].past,\n.reveal .slides > section[data-transition~=zoom-out].past,\n.reveal.zoom .slides > section:not([data-transition]).past {\n  visibility: hidden;\n  -webkit-transform: scale(16);\n          transform: scale(16); }\n\n.reveal .slides > section[data-transition=zoom].future,\n.reveal .slides > section[data-transition~=zoom-in].future,\n.reveal.zoom .slides > section:not([data-transition]).future {\n  visibility: hidden;\n  -webkit-transform: scale(0.2);\n          transform: scale(0.2); }\n\n.reveal .slides > section > section[data-transition=zoom].past,\n.reveal .slides > section > section[data-transition~=zoom-out].past,\n.reveal.zoom .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate(0, -150%);\n          transform: translate(0, -150%); }\n\n.reveal .slides > section > section[data-transition=zoom].future,\n.reveal .slides > section > section[data-transition~=zoom-in].future,\n.reveal.zoom .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate(0, 150%);\n          transform: translate(0, 150%); }\n\n/*********************************************\n * CUBE TRANSITION\n *\n * WARNING:\n * this is deprecated and will be removed in a\n * future version.\n *********************************************/\n.reveal.cube .slides {\n  -webkit-perspective: 1300px;\n          perspective: 1300px; }\n\n.reveal.cube .slides section {\n  padding: 30px;\n  min-height: 700px;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  box-sizing: border-box;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal.center.cube .slides section {\n  min-height: 0; }\n\n.reveal.cube .slides section:not(.stack):before {\n  content: '';\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  -webkit-transform: translateZ(-20px);\n          transform: translateZ(-20px); }\n\n.reveal.cube .slides section:not(.stack):after {\n  content: '';\n  position: absolute;\n  display: block;\n  width: 90%;\n  height: 30px;\n  left: 5%;\n  bottom: 0;\n  background: none;\n  z-index: 1;\n  border-radius: 4px;\n  box-shadow: 0px 95px 25px rgba(0, 0, 0, 0.2);\n  -webkit-transform: translateZ(-90px) rotateX(65deg);\n          transform: translateZ(-90px) rotateX(65deg); }\n\n.reveal.cube .slides > section.stack {\n  padding: 0;\n  background: none; }\n\n.reveal.cube .slides > section.past {\n  -webkit-transform-origin: 100% 0%;\n          transform-origin: 100% 0%;\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n          transform: translate3d(-100%, 0, 0) rotateY(-90deg); }\n\n.reveal.cube .slides > section.future {\n  -webkit-transform-origin: 0% 0%;\n          transform-origin: 0% 0%;\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(90deg);\n          transform: translate3d(100%, 0, 0) rotateY(90deg); }\n\n.reveal.cube .slides > section > section.past {\n  -webkit-transform-origin: 0% 100%;\n          transform-origin: 0% 100%;\n  -webkit-transform: translate3d(0, -100%, 0) rotateX(90deg);\n          transform: translate3d(0, -100%, 0) rotateX(90deg); }\n\n.reveal.cube .slides > section > section.future {\n  -webkit-transform-origin: 0% 0%;\n          transform-origin: 0% 0%;\n  -webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg);\n          transform: translate3d(0, 100%, 0) rotateX(-90deg); }\n\n/*********************************************\n * PAGE TRANSITION\n *\n * WARNING:\n * this is deprecated and will be removed in a\n * future version.\n *********************************************/\n.reveal.page .slides {\n  -webkit-perspective-origin: 0% 50%;\n          perspective-origin: 0% 50%;\n  -webkit-perspective: 3000px;\n          perspective: 3000px; }\n\n.reveal.page .slides section {\n  padding: 30px;\n  min-height: 700px;\n  box-sizing: border-box;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal.page .slides section.past {\n  z-index: 12; }\n\n.reveal.page .slides section:not(.stack):before {\n  content: '';\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background: rgba(0, 0, 0, 0.1);\n  -webkit-transform: translateZ(-20px);\n          transform: translateZ(-20px); }\n\n.reveal.page .slides section:not(.stack):after {\n  content: '';\n  position: absolute;\n  display: block;\n  width: 90%;\n  height: 30px;\n  left: 5%;\n  bottom: 0;\n  background: none;\n  z-index: 1;\n  border-radius: 4px;\n  box-shadow: 0px 95px 25px rgba(0, 0, 0, 0.2);\n  -webkit-transform: translateZ(-90px) rotateX(65deg); }\n\n.reveal.page .slides > section.stack {\n  padding: 0;\n  background: none; }\n\n.reveal.page .slides > section.past {\n  -webkit-transform-origin: 0% 0%;\n          transform-origin: 0% 0%;\n  -webkit-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n          transform: translate3d(-40%, 0, 0) rotateY(-80deg); }\n\n.reveal.page .slides > section.future {\n  -webkit-transform-origin: 100% 0%;\n          transform-origin: 100% 0%;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0); }\n\n.reveal.page .slides > section > section.past {\n  -webkit-transform-origin: 0% 0%;\n          transform-origin: 0% 0%;\n  -webkit-transform: translate3d(0, -40%, 0) rotateX(80deg);\n          transform: translate3d(0, -40%, 0) rotateX(80deg); }\n\n.reveal.page .slides > section > section.future {\n  -webkit-transform-origin: 0% 100%;\n          transform-origin: 0% 100%;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0); }\n\n/*********************************************\n * FADE TRANSITION\n *********************************************/\n.reveal .slides section[data-transition=fade],\n.reveal.fade .slides section:not([data-transition]),\n.reveal.fade .slides > section > section:not([data-transition]) {\n  -webkit-transform: none;\n          transform: none;\n  transition: opacity 0.5s; }\n\n.reveal.fade.overview .slides section,\n.reveal.fade.overview .slides > section > section {\n  transition: none; }\n\n/*********************************************\n * NO TRANSITION\n *********************************************/\n.reveal .slides section[data-transition=none],\n.reveal.none .slides section:not([data-transition]) {\n  -webkit-transform: none;\n          transform: none;\n  transition: none; }\n\n/*********************************************\n * PAUSED MODE\n *********************************************/\n.reveal .pause-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: black;\n  visibility: hidden;\n  opacity: 0;\n  z-index: 100;\n  transition: all 1s ease; }\n\n.reveal.paused .pause-overlay {\n  visibility: visible;\n  opacity: 1; }\n\n/*********************************************\n * FALLBACK\n *********************************************/\n.no-transforms {\n  overflow-y: auto; }\n\n.no-transforms .reveal .slides {\n  position: relative;\n  width: 80%;\n  height: auto !important;\n  top: 0;\n  left: 50%;\n  margin: 0;\n  text-align: center; }\n\n.no-transforms .reveal .controls,\n.no-transforms .reveal .progress {\n  display: none !important; }\n\n.no-transforms .reveal .slides section {\n  display: block !important;\n  opacity: 1 !important;\n  position: relative !important;\n  height: auto;\n  min-height: 0;\n  top: 0;\n  left: -50%;\n  margin: 70px 0;\n  -webkit-transform: none;\n          transform: none; }\n\n.no-transforms .reveal .slides section section {\n  left: 0; }\n\n.reveal .no-transition,\n.reveal .no-transition * {\n  transition: none !important; }\n\n/*********************************************\n * PER-SLIDE BACKGROUNDS\n *********************************************/\n.reveal .backgrounds {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  -webkit-perspective: 600px;\n          perspective: 600px; }\n\n.reveal .slide-background {\n  display: none;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  visibility: hidden;\n  overflow: hidden;\n  background-color: transparent;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  transition: all 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n.reveal .slide-background.stack {\n  display: block; }\n\n.reveal .slide-background.present {\n  opacity: 1;\n  visibility: visible;\n  z-index: 2; }\n\n.print-pdf .reveal .slide-background {\n  opacity: 1 !important;\n  visibility: visible !important; }\n\n/* Video backgrounds */\n.reveal .slide-background video {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  max-width: none;\n  max-height: none;\n  top: 0;\n  left: 0;\n  -o-object-fit: cover;\n     object-fit: cover; }\n\n.reveal .slide-background[data-background-size=\"contain\"] video {\n  -o-object-fit: contain;\n     object-fit: contain; }\n\n/* Immediate transition style */\n.reveal[data-background-transition=none] > .backgrounds .slide-background,\n.reveal > .backgrounds .slide-background[data-background-transition=none] {\n  transition: none; }\n\n/* Slide */\n.reveal[data-background-transition=slide] > .backgrounds .slide-background,\n.reveal > .backgrounds .slide-background[data-background-transition=slide] {\n  opacity: 1;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.reveal[data-background-transition=slide] > .backgrounds .slide-background.past,\n.reveal > .backgrounds .slide-background.past[data-background-transition=slide] {\n  -webkit-transform: translate(-100%, 0);\n          transform: translate(-100%, 0); }\n\n.reveal[data-background-transition=slide] > .backgrounds .slide-background.future,\n.reveal > .backgrounds .slide-background.future[data-background-transition=slide] {\n  -webkit-transform: translate(100%, 0);\n          transform: translate(100%, 0); }\n\n.reveal[data-background-transition=slide] > .backgrounds .slide-background > .slide-background.past,\n.reveal > .backgrounds .slide-background > .slide-background.past[data-background-transition=slide] {\n  -webkit-transform: translate(0, -100%);\n          transform: translate(0, -100%); }\n\n.reveal[data-background-transition=slide] > .backgrounds .slide-background > .slide-background.future,\n.reveal > .backgrounds .slide-background > .slide-background.future[data-background-transition=slide] {\n  -webkit-transform: translate(0, 100%);\n          transform: translate(0, 100%); }\n\n/* Convex */\n.reveal[data-background-transition=convex] > .backgrounds .slide-background.past,\n.reveal > .backgrounds .slide-background.past[data-background-transition=convex] {\n  opacity: 0;\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0); }\n\n.reveal[data-background-transition=convex] > .backgrounds .slide-background.future,\n.reveal > .backgrounds .slide-background.future[data-background-transition=convex] {\n  opacity: 0;\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0); }\n\n.reveal[data-background-transition=convex] > .backgrounds .slide-background > .slide-background.past,\n.reveal > .backgrounds .slide-background > .slide-background.past[data-background-transition=convex] {\n  opacity: 0;\n  -webkit-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n          transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0); }\n\n.reveal[data-background-transition=convex] > .backgrounds .slide-background > .slide-background.future,\n.reveal > .backgrounds .slide-background > .slide-background.future[data-background-transition=convex] {\n  opacity: 0;\n  -webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n          transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0); }\n\n/* Concave */\n.reveal[data-background-transition=concave] > .backgrounds .slide-background.past,\n.reveal > .backgrounds .slide-background.past[data-background-transition=concave] {\n  opacity: 0;\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0); }\n\n.reveal[data-background-transition=concave] > .backgrounds .slide-background.future,\n.reveal > .backgrounds .slide-background.future[data-background-transition=concave] {\n  opacity: 0;\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0); }\n\n.reveal[data-background-transition=concave] > .backgrounds .slide-background > .slide-background.past,\n.reveal > .backgrounds .slide-background > .slide-background.past[data-background-transition=concave] {\n  opacity: 0;\n  -webkit-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n          transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0); }\n\n.reveal[data-background-transition=concave] > .backgrounds .slide-background > .slide-background.future,\n.reveal > .backgrounds .slide-background > .slide-background.future[data-background-transition=concave] {\n  opacity: 0;\n  -webkit-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n          transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0); }\n\n/* Zoom */\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background,\n.reveal > .backgrounds .slide-background[data-background-transition=zoom] {\n  transition-timing-function: ease; }\n\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background.past,\n.reveal > .backgrounds .slide-background.past[data-background-transition=zoom] {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(16);\n          transform: scale(16); }\n\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background.future,\n.reveal > .backgrounds .slide-background.future[data-background-transition=zoom] {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0.2);\n          transform: scale(0.2); }\n\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background > .slide-background.past,\n.reveal > .backgrounds .slide-background > .slide-background.past[data-background-transition=zoom] {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(16);\n          transform: scale(16); }\n\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background > .slide-background.future,\n.reveal > .backgrounds .slide-background > .slide-background.future[data-background-transition=zoom] {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0.2);\n          transform: scale(0.2); }\n\n/* Global transition speed settings */\n.reveal[data-transition-speed=\"fast\"] > .backgrounds .slide-background {\n  transition-duration: 400ms; }\n\n.reveal[data-transition-speed=\"slow\"] > .backgrounds .slide-background {\n  transition-duration: 1200ms; }\n\n/*********************************************\n * OVERVIEW\n *********************************************/\n.reveal.overview {\n  -webkit-perspective-origin: 50% 50%;\n          perspective-origin: 50% 50%;\n  -webkit-perspective: 700px;\n          perspective: 700px; }\n  .reveal.overview .slides {\n    -moz-transform-style: preserve-3d; }\n  .reveal.overview .slides section {\n    height: 100%;\n    top: 0 !important;\n    opacity: 1 !important;\n    overflow: hidden;\n    visibility: visible !important;\n    cursor: pointer;\n    box-sizing: border-box; }\n  .reveal.overview .slides section:hover,\n  .reveal.overview .slides section.present {\n    outline: 10px solid rgba(150, 150, 150, 0.4);\n    outline-offset: 10px; }\n  .reveal.overview .slides section .fragment {\n    opacity: 1;\n    transition: none; }\n  .reveal.overview .slides section:after,\n  .reveal.overview .slides section:before {\n    display: none !important; }\n  .reveal.overview .slides > section.stack {\n    padding: 0;\n    top: 0 !important;\n    background: none;\n    outline: none;\n    overflow: visible; }\n  .reveal.overview .backgrounds {\n    -webkit-perspective: inherit;\n            perspective: inherit;\n    -moz-transform-style: preserve-3d; }\n  .reveal.overview .backgrounds .slide-background {\n    opacity: 1;\n    visibility: visible;\n    outline: 10px solid rgba(150, 150, 150, 0.1);\n    outline-offset: 10px; }\n  .reveal.overview .backgrounds .slide-background.stack {\n    overflow: visible; }\n\n.reveal.overview .slides section,\n.reveal.overview-deactivating .slides section {\n  transition: none; }\n\n.reveal.overview .backgrounds .slide-background,\n.reveal.overview-deactivating .backgrounds .slide-background {\n  transition: none; }\n\n/*********************************************\n * RTL SUPPORT\n *********************************************/\n.reveal.rtl .slides,\n.reveal.rtl .slides h1,\n.reveal.rtl .slides h2,\n.reveal.rtl .slides h3,\n.reveal.rtl .slides h4,\n.reveal.rtl .slides h5,\n.reveal.rtl .slides h6 {\n  direction: rtl;\n  font-family: \"Eina02\", Helvetica, sans-serif; }\n\n.reveal.rtl pre,\n.reveal.rtl code {\n  direction: ltr; }\n\n.reveal.rtl ol,\n.reveal.rtl ul {\n  text-align: right; }\n\n.reveal.rtl .progress span {\n  float: right; }\n\n/*********************************************\n * PARALLAX BACKGROUND\n *********************************************/\n.reveal.has-parallax-background .backgrounds {\n  transition: all 0.8s ease; }\n\n/* Global transition speed settings */\n.reveal.has-parallax-background[data-transition-speed=\"fast\"] .backgrounds {\n  transition-duration: 400ms; }\n\n.reveal.has-parallax-background[data-transition-speed=\"slow\"] .backgrounds {\n  transition-duration: 1200ms; }\n\n/*********************************************\n * LINK PREVIEW OVERLAY\n *********************************************/\n.reveal .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1000;\n  background: rgba(0, 0, 0, 0.9);\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease; }\n\n.reveal .overlay.visible {\n  opacity: 1;\n  visibility: visible; }\n\n.reveal .overlay .spinner {\n  position: absolute;\n  display: block;\n  top: 50%;\n  left: 50%;\n  width: 32px;\n  height: 32px;\n  margin: -16px 0 0 -16px;\n  z-index: 10;\n  background-image: url(data:image/gif;base64,R0lGODlhIAAgAPMAAJmZmf%2F%2F%2F6%2Bvr8nJybW1tcDAwOjo6Nvb26ioqKOjo7Ozs%2FLy8vz8%2FAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ%2FV%2FnmOM82XiHRLYKhKP1oZmADdEAAAh%2BQQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY%2FCZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB%2BA4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6%2BHo7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq%2BB6QDtuetcaBPnW6%2BO7wDHpIiK9SaVK5GgV543tzjgGcghAgAh%2BQQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK%2B%2BG%2Bw48edZPK%2BM6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE%2BG%2BcD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm%2BFNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk%2BaV%2BoJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0%2FVNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc%2BXiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30%2FiI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE%2FjiuL04RGEBgwWhShRgQExHBAAh%2BQQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR%2BipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY%2BYip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd%2BMFCN6HAAIKgNggY0KtEBAAh%2BQQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1%2BvsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d%2BjYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg%2BygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0%2Bbm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h%2BKr0SJ8MFihpNbx%2B4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX%2BBP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA%3D%3D);\n  visibility: visible;\n  opacity: 0.6;\n  transition: all 0.3s ease; }\n\n.reveal .overlay header {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 40px;\n  z-index: 2;\n  border-bottom: 1px solid #222; }\n\n.reveal .overlay header a {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  line-height: 36px;\n  padding: 0 10px;\n  float: right;\n  opacity: 0.6;\n  box-sizing: border-box; }\n\n.reveal .overlay header a:hover {\n  opacity: 1; }\n\n.reveal .overlay header a .icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background-position: 50% 50%;\n  background-size: 100%;\n  background-repeat: no-repeat; }\n\n.reveal .overlay header a.close .icon {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkklEQVRYR8WX4VHDMAxG6wnoJrABZQPYBCaBTWAD2g1gE5gg6OOsXuxIlr40d81dfrSJ9V4c2VLK7spHuTJ/5wpM07QXuXc5X0opX2tEJcadjHuV80li/FgxTIEK/5QBCICBD6xEhSMGHgQPgBgLiYVAB1dpSqKDawxTohFw4JSEA3clzgIBPCURwE2JucBR7rhPJJv5OpJwDX+SfDjgx1wACQeJG1aChP9K/IMmdZ8DtESV1WyP3Bt4MwM6sj4NMxMYiqUWHQu4KYA/SYkIjOsm3BXYWMKFDwU2khjCQ4ELJUJ4SmClRArOCmSXGuKma0fYD5CbzHxFpCSGAhfAVSSUGDUk2BWZaff2g6GE15BsBQ9nwmpIGDiyHQddwNTMKkbZaf9fajXQca1EX44puJZUsnY0ObGmITE3GVLCbEhQUjGVt146j6oasWN+49Vph2w1pZ5EansNZqKBm1txbU57iRRcZ86RWMDdWtBJUHBHwoQPi1GV+JCbntmvok7iTX4/Up9mgyTc/FJYDTcndgH/AA5A/CHsyEkVAAAAAElFTkSuQmCC); }\n\n.reveal .overlay header a.external .icon {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAcElEQVRYR+2WSQoAIQwEzf8f7XiOMkUQxUPlGkM3hVmiQfQR9GYnH1SsAQlI4DiBqkCMoNb9y2e90IAEJPAcgdznU9+engMaeJ7Azh5Y1U67gAho4DqBqmB1buAf0MB1AlVBek83ZPkmJMGc1wAR+AAqod/B97TRpQAAAABJRU5ErkJggg==); }\n\n.reveal .overlay .viewport {\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  top: 40px;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n\n.reveal .overlay.overlay-preview .viewport iframe {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  border: 0;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease; }\n\n.reveal .overlay.overlay-preview.loaded .viewport iframe {\n  opacity: 1;\n  visibility: visible; }\n\n.reveal .overlay.overlay-preview.loaded .viewport-inner {\n  position: absolute;\n  z-index: -1;\n  left: 0;\n  top: 45%;\n  width: 100%;\n  text-align: center;\n  letter-spacing: normal; }\n\n.reveal .overlay.overlay-preview .x-frame-error {\n  opacity: 0;\n  transition: opacity 0.3s ease 0.3s; }\n\n.reveal .overlay.overlay-preview.loaded .x-frame-error {\n  opacity: 1; }\n\n.reveal .overlay.overlay-preview.loaded .spinner {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0.2);\n          transform: scale(0.2); }\n\n.reveal .overlay.overlay-help .viewport {\n  overflow: auto;\n  color: #fff; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner {\n  width: 600px;\n  margin: auto;\n  padding: 20px 20px 80px 20px;\n  text-align: center;\n  letter-spacing: normal; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner .title {\n  font-size: 20px; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner table {\n  border: 1px solid #fff;\n  border-collapse: collapse;\n  font-size: 16px; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner table th,\n.reveal .overlay.overlay-help .viewport .viewport-inner table td {\n  width: 200px;\n  padding: 14px;\n  border: 1px solid #fff;\n  vertical-align: middle; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner table th {\n  padding-top: 20px;\n  padding-bottom: 20px; }\n\n/*********************************************\n * PLAYBACK COMPONENT\n *********************************************/\n.reveal .playback {\n  position: absolute;\n  left: 15px;\n  bottom: 20px;\n  z-index: 30;\n  cursor: pointer;\n  transition: all 400ms ease;\n  -webkit-tap-highlight-color: transparent; }\n\n.reveal.overview .playback {\n  opacity: 0;\n  visibility: hidden; }\n\n/*********************************************\n * ROLLING LINKS\n *********************************************/\n.reveal .roll {\n  display: inline-block;\n  line-height: 1.2;\n  overflow: hidden;\n  vertical-align: top;\n  -webkit-perspective: 400px;\n          perspective: 400px;\n  -webkit-perspective-origin: 50% 50%;\n          perspective-origin: 50% 50%; }\n\n.reveal .roll:hover {\n  background: none;\n  text-shadow: none; }\n\n.reveal .roll span {\n  display: block;\n  position: relative;\n  padding: 0 2px;\n  pointer-events: none;\n  transition: all 400ms ease;\n  -webkit-transform-origin: 50% 0%;\n          transform-origin: 50% 0%;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.reveal .roll:hover span {\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-transform: translate3d(0px, 0px, -45px) rotateX(90deg);\n          transform: translate3d(0px, 0px, -45px) rotateX(90deg); }\n\n.reveal .roll span:after {\n  content: attr(data-title);\n  display: block;\n  position: absolute;\n  left: 0;\n  top: 0;\n  padding: 0 2px;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform-origin: 50% 0%;\n          transform-origin: 50% 0%;\n  -webkit-transform: translate3d(0px, 110%, 0px) rotateX(-90deg);\n          transform: translate3d(0px, 110%, 0px) rotateX(-90deg); }\n\n/*********************************************\n * SPEAKER NOTES\n *********************************************/\n.reveal aside.notes {\n  display: none; }\n\n.reveal .speaker-notes {\n  display: none;\n  position: absolute;\n  width: 25vw;\n  height: 100%;\n  top: 0;\n  left: 100%;\n  padding: 14px 18px 14px 18px;\n  z-index: 1;\n  font-size: 18px;\n  line-height: 1.4;\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  color: #222;\n  background-color: #f5f5f5;\n  overflow: auto;\n  box-sizing: border-box;\n  text-align: left;\n  font-family: \"Eina02\", Helvetica, sans-serif;\n  -webkit-overflow-scrolling: touch; }\n  .reveal .speaker-notes .notes-placeholder {\n    color: #ccc;\n    font-style: italic; }\n  .reveal .speaker-notes:focus {\n    outline: none; }\n  .reveal .speaker-notes:before {\n    content: 'Speaker notes';\n    display: block;\n    margin-bottom: 10px;\n    opacity: 0.5; }\n\n.reveal.show-notes {\n  max-width: 75vw;\n  overflow: visible; }\n\n.reveal.show-notes .speaker-notes {\n  display: block; }\n\n@media screen and (min-width: 1600px) {\n  .reveal .speaker-notes {\n    font-size: 20px; } }\n\n@media screen and (max-width: 1024px) {\n  .reveal.show-notes {\n    border-left: 0;\n    max-width: none;\n    max-height: 70%;\n    overflow: visible; }\n  .reveal.show-notes .speaker-notes {\n    top: 100%;\n    left: 0;\n    width: 100%;\n    height: 42.8571428571%; } }\n\n@media screen and (max-width: 600px) {\n  .reveal.show-notes {\n    max-height: 60%; }\n  .reveal.show-notes .speaker-notes {\n    top: 100%;\n    height: 66.6666666667%; }\n  .reveal .speaker-notes {\n    font-size: 14px; } }\n\n/*********************************************\n * ZOOM PLUGIN\n *********************************************/\n.zoomed .reveal *,\n.zoomed .reveal *:before,\n.zoomed .reveal *:after {\n  -webkit-backface-visibility: visible !important;\n          backface-visibility: visible !important; }\n\n.zoomed .reveal .progress,\n.zoomed .reveal .controls {\n  opacity: 0; }\n\n.zoomed .reveal .roll span {\n  background: none; }\n\n.zoomed .reveal .roll span:after {\n  visibility: hidden; }\n", ""]);

// exports


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/* Tomorrow Night Bright Theme */\n/* Original theme - https://github.com/chriskempson/tomorrow-theme */\n/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */\n\n/* Tomorrow Comment */\n.hljs-comment,\n.hljs-quote {\n  color: #777777;\n}\n\n/* Tomorrow Red */\n.hljs-variable,\n.hljs-template-variable,\n.hljs-tag,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-regexp,\n.hljs-deletion {\n  color: #d54e53;\n}\n\n/* Tomorrow Orange */\n.hljs-number,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-literal,\n.hljs-type,\n.hljs-params,\n.hljs-meta,\n.hljs-link {\n  color: #e78c45;\n}\n\n/* Tomorrow Yellow */\n.hljs-attribute {\n  color: #e7c547;\n}\n\n/* Tomorrow Green */\n.hljs-string,\n.hljs-symbol,\n.hljs-bullet,\n.hljs-addition {\n  color: #a5f575;\n}\n\n/* Tomorrow Blue */\n.hljs-title,\n.hljs-section {\n  color: #FFFFFF;\n}\n\n/* Tomorrow Purple */\n.hljs-keyword,\n.hljs-selector-tag {\n  color: #81ddfe;\n}\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  background: black;\n  color: #eaeaea;\n  padding: 0.5em;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 163 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reveal__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reveal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reveal__);



      // // More info about config & dependencies:
      // // - https://github.com/hakimel/reveal.js#configuration
      // // - https://github.com/hakimel/reveal.js#dependencies
      // Reveal.initialize({
      //   history: true,
      //   center: true,
      //   controls: true,
      //   progress: false,
      //   width: '100%', //'100%',
      //   height: '100%', //'100%',
      //   margin: 0,
      //   transition: 'none', // none/fade/slide/convex/concave/zoom
      //   dependencies: [
      //     { src: 'components/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
      //     { src: 'components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
      //   ]
      // });

var libPath = '../node_modules/reveal.js/';

__WEBPACK_IMPORTED_MODULE_0_reveal___default.a.initialize({
  width: '100%',
  height: '100%',
  margin: 0,
  minScale: 1,
  maxScale: 1,
  history: true,
  progress: false,
  dependencies: [
    // Cross-browser shim that fully implements classList
    {
      src: libPath + 'lib/js/classList.js',
      condition: function() {
        return !document.body.classList;
      }
    },

    // // Interpret Markdown in <section> elements
    // {
    //   src: libPath + 'plugin/markdown/marked.js',
    //   condition: function() {
    //     return !!document.querySelector( '[data-markdown]' );
    //   }
    // },

    // {
    //   src: libPath + 'plugin/markdown/markdown.js',
    //   condition: function() {
    //     return !!document.querySelector( '[data-markdown]' );
    //   }
    // },

    // Syntax highlight for <code> elements
    {
      src: libPath + 'plugin/highlight/highlight.js',
      async: true,
      callback: function() {
        hljs.initHighlightingOnLoad();
      }
    },

    // // Zoom in and out with Alt+click
    // { src: libPath + 'plugin/zoom-js/zoom.js', async: true },

    // // Speaker notes
    // { src: libPath + 'plugin/notes/notes.js', async: true }
  ]
});

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = Reveal;

/***/ })
/******/ ]);