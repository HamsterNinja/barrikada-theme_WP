<template>
    <div class="products-items products-items--favorites">
    <template v-for="product in favorite_products">
        <product-item :product="product" class="products-item--viewed"></product-item>
    </template>
    </div>
</template>

<script>
  export default {
    name: 'product-favorite',
    async created () {
      if (this.$root.favorite_products.length === 0) {
            let productIDs = this.favorites.join();
            if (productIDs) {
                const responseFavoriteProducts = await fetch(`${SITEDATA.url}/wp-json/wc/v3/products/?include=${productIDs}`);
                const dataFavoriteProducts = await responseFavoriteProducts.json();
                this.$root.favorite_products = dataFavoriteProducts;  
            }
      }
    },
    computed: {
      favorites () {
        return  this.$store.state.favorites;
      },
      favorite_products () {
        return  this.$root.favorite_products;
      }
    },
  }
</script>