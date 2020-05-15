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
  slidesPerView: 1,
  loop: true,
  allowTouchMove: false,
  breakpoints: {
    640: {
      slidesPerView: 2
    },
    1380: {
      slidesPerView: 3
    },
    1650: {
      slidesPerView: 4
    }
  }
});
var swiper = new Swiper('.swiper-container.popular-products-swiper', {
  slidesPerView: 1,
  loop: true,
  allowTouchMove: false,
  breakpoints: {
    640: {
      slidesPerView: 2
    },
    1380: {
      slidesPerView: 3
    },
    1650: {
      slidesPerView: 4
    }
  }
});

var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true
});
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  thumbs: {
    swiper: galleryThumbs
  }
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