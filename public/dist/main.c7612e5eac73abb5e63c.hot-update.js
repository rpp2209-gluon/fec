webpackHotUpdate("main",{

/***/ "./public/src/Components/relateditems/productcard.jsx":
/*!************************************************************!*\
  !*** ./public/src/Components/relateditems/productcard.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction ProductCard(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"Product Card\");\n}\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductCard);\n\n//# sourceURL=webpack:///./public/src/Components/relateditems/productcard.jsx?");

/***/ }),

/***/ "./public/src/Components/relateditems/productlist.jsx":
/*!************************************************************!*\
  !*** ./public/src/Components/relateditems/productlist.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _productcard_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productcard.jsx */ \"./public/src/Components/relateditems/productcard.jsx\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i[\"return\"] && (_r = _i[\"return\"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\nfunction ProductList(props) {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]),\n    _useState2 = _slicedToArray(_useState, 2),\n    relatedProductsList = _useState2[0],\n    setRelatedProductsList = _useState2[1];\n  console.log(props.relProd.data);\n  function getRelProd(array) {\n    array.forEach(function () {});\n  }\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, \"Product List\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_productcard_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null)));\n}\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductList);\n\n//# sourceURL=webpack:///./public/src/Components/relateditems/productlist.jsx?");

/***/ })

})