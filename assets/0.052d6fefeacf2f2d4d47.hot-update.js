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
     onTransitionEnd: function onTransitionEnd(swiper) {
          console.log("num: %o", swiper.activeIndex);
     }
});

/***/ })
])