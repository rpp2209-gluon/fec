webpackHotUpdate("main",{

/***/ "./node_modules/dotenv/lib/main.js":
false,

/***/ "./node_modules/dotenv/package.json":
false,

/***/ "./node_modules/os-browserify/browser.js":
false,

/***/ "./node_modules/path-browserify/index.js":
false,

/***/ "./public/src/Components/relateditems/relateditems.jsx":
/*!*************************************************************!*\
  !*** ./public/src/Components/relateditems/relateditems.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _productlist_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productlist.jsx */ \"./public/src/Components/relateditems/productlist.jsx\");\n/* harmony import */ var _youroutfitlist_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./youroutfitlist.jsx */ \"./public/src/Components/relateditems/youroutfitlist.jsx\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\n\n\n\n//const dotenv = require('dotenv')\n\nfunction RelatedItems() {\n  Object(axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n    method: 'get',\n    url: '/products/:product_id/related'\n  });\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Related Items Section\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_productlist_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_youroutfitlist_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null)));\n}\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (RelatedItems);\n\n//# sourceURL=webpack:///./public/src/Components/relateditems/relateditems.jsx?");

/***/ })

})