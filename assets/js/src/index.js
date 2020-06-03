new UISearch( document.getElementById( 'sb-search' ) );

$(document).ready(function (){
$('.btn-hamburger').click(function() {    
  $('.sidebar').toggleClass('active');
  $('.main-header-menu').removeClass('active');
});
$('.btn-hamburger-2').click(function() {    
  $('.main-header-menu').toggleClass('active');
  $('.sidebar').removeClass('active');
});
$('.catalog-filter-title').click(function() {    
    $('.catalog-filter-content').slideToggle();
});
$('.product-description-content').masonry({
  // options
  itemSelector: '.description-item',
  percentPosition: true,
  columnWidth: '.description-item',
  gutter: 130
});
var swiper = new Swiper('.swiper-container.main-swiper', {
      slidesPerView: 1,
      loop: true,
      allowTouchMove: false,
      navigation: {
      nextEl: '.main-slider-bottom .swiper-button-next',
      prevEl: '.main-slider-bottom .swiper-button-prev',
    },
    pagination: {
     el: '.swiper-pagination',
     type: 'fraction',
     formatFractionCurrent: function(number) {
if (number < 10) {
number = '0' + number;
}
return number;
},
formatFractionTotal: function(number) {
if (number < 10) {
number = '0' + number;
}
return number;
},
    }
    });



var swiper = new Swiper('.swiper-container.new-products-swiper', {
      slidesPerView: 1,
      loop: true,
      allowTouchMove: false,
      breakpoints: {
        420: {
          slidesPerView: 2,
        },
        1380: {
          slidesPerView: 3,
        },
        1650: {
          slidesPerView: 4,
        },
      }
    });
var swiper = new Swiper('.swiper-container.popular-products-swiper', {
      slidesPerView: 1,
      loop: true,
      allowTouchMove: false,
      breakpoints: {
        420: {
          slidesPerView: 2,
        },
        1380: {
          slidesPerView: 3,
        },
        1650: {
          slidesPerView: 4,
        },
      }
    });


var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });

});

import sidebarBlockItem from './components/sidebarBlockItem.vue';
Vue.component('sidebar-block-item', sidebarBlockItem);

import ProductList from './components/ProductList.vue';
Vue.component('product-list', ProductList);

import productItem from './components/productItem.vue';
Vue.component('product-item', productItem);

import countProduct from './components/countProduct.vue'
Vue.component('count-product', countProduct);

document.addEventListener('DOMContentLoaded', () => {
    modalViews.init();
    formSubmitListeners.init();
});

  
import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import { mapState, mapGetters } from 'vuex';
Vue.use(Vuex);
Vue.use(mapState);
Vue.use(mapGetters);

import store from './store';

import MaskedInput from 'vue-masked-input';

import favorite from './components/favorite.vue';
Vue.component('favorite', favorite);

import ProductFavorite from './components/ProductFavorite.vue';
Vue.component('product-favorite', ProductFavorite);


import countProductCart from './components/countProductCart.vue'
Vue.component('count-product-cart', countProductCart);

import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);


import numeral from 'numeral';
numeral.register('locale', 'ru', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'тыс.',
        million: 'млн.',
        billion: 'млрд.',
        trillion: 'трлн.'
    },
    ordinal: function () {
        return '.';
    },
    currency: {
        symbol: 'руб.'
    }
});

numeral.locale('ru');


Vue.filter("formatNumber", function (value) {
    return numeral(value).format(); 
});

const app = new Vue({
    el: "#app",
    store,
    delimiters: ["((", "))"],
    data: {
        errors: [],
        favorite_products: [],
        showPopup: true,
        loading: true,
        adding: false,
        is_product: SITEDATA.is_product == 'true',
        cartStep: 1,
        comment: '',
        product_colors: [],
        colorPicked: '',
        main_thumbnail: '',
        cvet: [],
        dlina: [],
        dlina_max: [],
        dvuxyarusnye: [],
        forma: [],
        glubina: [],
        material_fasada: [],
        material_karkasa: [],
        material_obivki: [],
        mexanizm: [],
        napolnenie: [],
        obivka: [],
        osnovanie: [],
        osobennosti: [],
        raskladka: [],
        raskladnoj: [],
        razmer: [],
        s_yashhikom: [],
        shirina: [],
        sidene: [],
        so_spalnym_mestom: [],
        spalnoe_mesto_dlina: [],
        spalnoe_mesto_shirina: [], 
        stil: [],
        stoleshnica: [],
        strana_proizvodstva: [],
        tip: [],
        tolshhina: [],
        vid: [],
        vysota: [],
        zamki: [],
        zhestkost: [],
    },
    watch: {},
    components: {
        'masked-input': MaskedInput,
    },
    computed: {
        cartSubtotal:{
            get () {
                return this.$store.state.cartSubtotal
            }
        },
        thumbnails: {
            get() {
                if (this.product_colors && this.product_colors[0]){
                    return [this.product_colors.find(color => color.title === this.colorPicked).front_photo]
                }
            },
        },
        favorites: {
            get() {
                return this.$store.state.favorites
            },
        },
        viewedProducts: {
            get() {
                return this.$store.state.viewedProducts
            },
            set(value) {
                this.$store.commit('updateViewedProducts', value);
            }
        },
        category_count_page: {
            get() {
                return this.$store.state.category_count_page
            },
            set(value) {
                this.$store.commit('updateCategoryCount', value);
            }
        },
        category_count: {
            get() {
                return this.$store.state.category_count
            },
            set(value) {
                this.$store.commit('updateCategoryCountPage', value);
            }
        },
        pageNum: {
            get() {
                return this.$store.state.pageNum
            },
            set(value) {
                this.$store.commit('updatePageNum', value);
            }
        },
        cartTotal: function () {
            let subtototal = this.cartSubtotal;
            subtototal = subtototal + this.shippingPrice;
            return subtototal;
        },
    },
    async mounted() {
        this.loading = true;


        function RequestDataAttributesByCategory(taxonomy_id, attr_name) {
                this.taxonomy_id = taxonomy_id;
                this.attr_name = attr_name;
                this.url = `${SITEDATA.url}/wp-json/optiko/v1/get-terms-by-category?taxonomy_id=${taxonomy_id}&attr_name=${attr_name}`;
                this.method = 'GET';
                Object.defineProperty(this, "data", {
                    get: function () {
                        return {
                            url: this.url,
                            method: this.method
                        };
                    }
                });
            }

            async function getAttributeProduct(taxonomy_id, attr_name) {
                const requestData = new RequestDataAttributesByCategory(taxonomy_id, attr_name);
                const url = `${requestData.url}`;
                const response = await fetch(url);
                const data = await response.json();
                return data;
            }


        if (SITEDATA.category_slug || SITEDATA.is_filter) {
                [this.cvet] = await Promise.all([
                    getAttributeProduct(SITEDATA.category_slug, 'pa_cvet'),
                ]);

            }

        this.loading = false;
    },

    methods: {
        clearFavorites(){
            this.$store.commit('clearFavorites');
            this.favorite_products = [];
        },
        selectPage(pageNum){
                    this.pageNum = pageNum;
                    this.$store.commit('updatePageNum', pageNum);
                    store.dispatch('allProducts');
                    let topItems = document.querySelector("header");
                    if (topItems){
                    topItems.scrollIntoView({block: "start", behavior: "smooth"});
                    }
                },
        setCartStep(value){
            this.cartStep = value;
        },

        async addCart(ID) {
            this.adding = true;
            let formProduct = new FormData();
            formProduct.append('action', 'add_one_product');
            formProduct.append('product_id', ID);
            formProduct.append('quantity', store.state.productCount ?  store.state.productCount : 1);


            //extra options
            formProduct.append('color', this.colorPicked);
            if(this.thumbnails && this.thumbnails[0]){
                formProduct.append('color_image', this.thumbnails[0].sizes.medium_large);
            }
            // formProduct.append('custom_price', this.currentPrice);
                        
            let fetchData = {
                method: "POST",
                body: formProduct
            };
            let response =  await fetch(wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'), fetchData);
            let jsonResponse = await response.json();
            if (jsonResponse.error != 'undefined' && jsonResponse.error) {
                console.log(jsonResponse.error);
            }else if (jsonResponse.success) {
                        this.$refs.button_cart.innerText = "В корзине"
                        this.updateFragment();
                    }
                    if ( jsonResponse.fragments ) {
                Array.from(jsonResponse.fragments).forEach(element => {
                    element.classList.add('updating');
                });
                $.each( jsonResponse.fragments, function( key, value ) {
                    $( key ).replaceWith( value );
                    $( key ).stop( true ).css( 'opacity', '1' );
                });
            }
            this.adding = false;
        }, 

        showModal: (modalName) => {
            const currentModal = document.querySelector(`.${modalName}`);
            const overlay = document.querySelector('.overlay');
            if (currentModal) {
                currentModal.classList.add('modal--show');
                overlay.classList.add('overlay--show');
            }
        },

        closeModal: () => {
            const overlay = document.querySelector('.overlay');
            const modals = document.querySelectorAll('.modal-window');
            modals.forEach(modal => {
                modal.classList.remove('modal--show');
                overlay.classList.remove('overlay--show');
            });
        },

        validEmail: function (email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        validRussianPhone: function (phone) {
            const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            return re.test(phone);
        },

        onCloseErrors() {
            this.errors = []
        },

        clearOrderForm: function () {
            this.billing_first_name = '';
            this.billing_email = '';
            this.billing_phone = '';
            this.comment = '';
        },
    },

});

const modalViews = {
    init: () => {
        modalViews.bindEvents();
        modalViews.closeModal();
    },
    bindEvents: () => {
        modalViews.settings.modalsButtons.forEach(modal => {
            modal.addEventListener('click', function (event) {
                event.preventDefault();
                const modalClass = this.getAttribute('data-modal');
                modalViews.showModal(`.${modalClass}`);
            });
        });
    },
    closeModal: () => {
        const closeElements = document.querySelectorAll('.modal-window__close, #overlay, .modal-window');
        closeElements.forEach(closeElement => {
            closeElement.addEventListener('click', function (event) {
                if (event.target !== this){
                    return;
                }
                modalViews.settings.modals.forEach(modal => {
                    modal.classList.remove('modal--show');
                    modalViews.settings.overlay.classList.remove('overlay--show');
                });
            });
        });
    },
    showModal: (modalName) => {
        const currentModal = document.querySelector(`${modalName}`);
        if (currentModal) {
            currentModal.classList.add('modal--show');
            modalViews.settings.overlay.classList.add('overlay--show');
        }
    },
    settings: {
        modalsButtons: document.querySelectorAll('.modal-open'),
        modals: document.querySelectorAll('.modal-window'),
        overlay: document.querySelector('.overlay')
    }
}

//Убрать axios
const axios = require('axios');
const formSubmitListeners = {
    init: () => {
        formSubmitListeners.submitForm('modal_form_service');
        formSubmitListeners.submitForm('modal_form_wholesalers');
    },
    submitForm: (formName) => {
        const formElement = document.querySelector(`#${formName}`);
        if (formElement) {
            formElement.addEventListener('submit', function (event) {
                event.preventDefault();
                if (formElement.checkValidity()) {
                    const form = new FormData(formElement);      
                    axios({
                            method: 'post',
                            url: `${SITEDATA.themepath}/email-send.php`,
                            data: form,
                            config: {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }
                        })
                        .then(function (response) {
                            let modals = document.querySelectorAll('.alModal');
                            let overlay = document.querySelector('#overlay');
                            modals.forEach(modal => {
                                modal.classList.remove('modal--show');
                                overlay.classList.remove('overlay--show');
                            });

                            modalViews.showModal('.modal-window--thank');
                        })
                        .catch(function (response) {
                            console.log(response);
                        });
                }
            });
        }
    }
}