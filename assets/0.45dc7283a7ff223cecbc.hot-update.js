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
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50
    }
  }
});
var swiper = new Swiper('.swiper-container.popular-products-swiper', {
  slidesPerView: 1,
  loop: true,
  allowTouchMove: false,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    1650: {
      slidesPerView: 4,
      spaceBetween: 50
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