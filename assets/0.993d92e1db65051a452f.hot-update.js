webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var swiper = new Swiper('.swiper-container.main-swiper', {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.main-slider-bottom .swiper-button-next',
    prevEl: '.main-slider-bottom .swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  }
});

var swiper = new Swiper('.swiper-container.new-products-swiper', {
  slidesPerView: 4,
  loop: true
});
var swiper = new Swiper('.swiper-container.popular-products-swiper', {
  slidesPerView: 4,
  loop: true
});

/***/ })
])