webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var swiper = new Swiper('.swiper-container.main-swiper', {
     slidesPerView: 1,
     loop: true,
     allowTouchMove: false,
     navigation: {
          nextEl: '.main-slider-bottom .swiper-button-next',
          prevEl: '.main-slider-bottom .swiper-button-prev'
     },
     pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          formatFractionCurrent: function formatFractionCurrent(number) {
               if (number < 10) {
                    number = '0' + number;
               }
               return number;
          },
          formatFractionTotal: function formatFractionTotal(number) {
               if (number < 10) {
                    number = '0' + number;
               }
               return number;
          }
     }
});

var swiper = new Swiper('.swiper-container.new-products-swiper', {
     slidesPerView: 4,
     loop: true,
     allowTouchMove: false
});
var swiper = new Swiper('.swiper-container.popular-products-swiper', {
     slidesPerView: 4,
     loop: true,
     allowTouchMove: false
});

$(document).ready(function () {
     $('.product-description-content').masonry({
          // options
          itemSelector: '.description-item',
          percentPosition: true,
          columnWidth: '.description-item',
          gutter: 130
     });
});

/***/ })
])