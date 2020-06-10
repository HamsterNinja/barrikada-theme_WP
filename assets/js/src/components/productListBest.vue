<template>
<div class="popular-products_block">
    <div class="container">
        <div class="main-page-title">Популярные товары</div>
        <div class="popular-products-slider">
            <div class="swiper-container popular-products-swiper">
                    <div name="products" tag="section" class="swiper-wrapper">
                        <template v-if="products.length > 0" v-for="(product, index) in products" >
                            <div class="swiper-slide popular-products-content">
                                <product-item :product="product" :class="classItem" ></product-item>
                            </div>
                        </template>
                    </div>
            </div>
        </div>
        <a href="http://ca85425.tmweb.ru/amadreh/barrikada/shop" class="view-all">Смотреть каталог</a>
    </div>
</div>
</template>

<script>
  export default {
    name: 'product-list-best',
    props: ['ids', 'classItem'],
    async mounted () {
        this.loading = true;
        const requestData = {
            url: SITEDATA.url + '/wp-json/amadreh/v1/get-products/',
            method: 'GET'
        };
                
        const postGet = requestData.url + '?include=' + this.ids;
        const response = await fetch(postGet);
        try{
            const json = await response.json();
            this.products = json.data.posts;
        }
        catch (e) { 
            console.log(`Failed to retrieve product informations: (${e.message})`);
        };
        this.loading = false;
    },
    updated() {
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
    },
    data() {
        return {
            loading: true,
            products: [],
            site_url: SITEDATA.url
        };
    }
  }
</script>