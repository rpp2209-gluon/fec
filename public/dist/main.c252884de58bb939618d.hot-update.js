webpackHotUpdate("main",{

/***/ "./public/src/Components/relateditems/productlist.jsx":
/*!************************************************************!*\
  !*** ./public/src/Components/relateditems/productlist.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _productcard_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productcard.jsx */ \"./public/src/Components/relateditems/productcard.jsx\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\n\n\nfunction ProductList(props) {\n  //array of related product id numbers\n  console.log(props.relProd);\n  var prodIds = props.relProd;\n  console.log(prodIds);\n  function getProducts(prodIds) {\n    for (var i = 0; i < prodIds.length; i++) {\n      console.log(prodIds[i]);\n    }\n  }\n  getProducts();\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, \"Product List\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_productcard_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null)));\n}\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductList);\n\n//# sourceURL=webpack:///./public/src/Components/relateditems/productlist.jsx?");

/***/ })

})