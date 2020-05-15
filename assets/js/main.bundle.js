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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: TypeError: C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\assets\\js\\src\\index.js: Cannot read property 'bindings' of null\n    at Scope.moveBindingTo (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\scope\\index.js:822:13)\n    at BlockScoping.updateScopeInfo (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\babel-plugin-transform-es2015-block-scoping\\lib\\index.js:364:17)\n    at BlockScoping.run (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\babel-plugin-transform-es2015-block-scoping\\lib\\index.js:330:12)\n    at PluginPass.BlockStatementSwitchStatementProgram (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\babel-plugin-transform-es2015-block-scoping\\lib\\index.js:70:24)\n    at newFn (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\visitors.js:179:21)\n    at NodePath._call (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\path\\context.js:55:20)\n    at NodePath.call (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\path\\context.js:42:17)\n    at NodePath.visit (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\path\\context.js:90:31)\n    at TraversalContext.visitQueue (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\context.js:112:16)\n    at TraversalContext.visitSingle (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\context.js:84:19)\n    at TraversalContext.visit (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\context.js:140:19)\n    at Function.traverse.node (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\index.js:84:17)\n    at traverse (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\traverse\\lib\\index.js:66:12)\n    at transformFile (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\core\\lib\\transformation\\index.js:119:29)\n    at runSync (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\core\\lib\\transformation\\index.js:48:5)\n    at transformSync (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\core\\lib\\transform.js:43:38)\n    at Object.transform (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\@babel\\core\\lib\\transform.js:22:38)\n    at transpile (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\babel-loader\\lib\\index.js:50:20)\n    at Object.module.exports (C:\\xampp\\htdocs\\barrikada\\wp-content\\themes\\barrikada-theme\\node_modules\\babel-loader\\lib\\index.js:173:20)");

/***/ })
/******/ ]);