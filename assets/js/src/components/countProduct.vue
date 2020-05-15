<template>
  <div class="product-quantity">
    <button class="count-product__decrement" v-on:click="decrementProduct">
      <svg width="5" height="24" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1H8" fill="#fff" stroke="#fff"></path>
      </svg>
    </button>
    <span class="inputNumber">{{ productCountComponent }}</span>
    <button class="count-product__increment" v-on:click="incrementProduct">
      <svg width="9" height="24" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4H4.25M8.5 4H4.25M4.25 4V0V8" stroke="#fff"></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product_id: {
      type: Number,
      default: 1
    },
    cart_id: {
      type: String,
      default: '1'
    },
    productCount: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      productCountComponent: this.productCount
    };
  },
  mounted: function () {
    this.$store.commit('updateProductCount', this.productCountComponent);
  },
  methods: {
    incrementProduct: function() {
      if (event){
        event.preventDefault();
      };
      this.productCountComponent++;
      this.$store.commit('updateProductCount', this.productCountComponent);
      if((SITEDATA.is_cart == 'true')){
        this.updateProductQuantityInCartByCartID(this.cart_id, this.productCountComponent);
      }
    },
    decrementProduct: function() {
      if (event){
        event.preventDefault();
      };
      if(this.productCountComponent > 1){
        this.productCountComponent--;
        this.$store.commit('updateProductCount', this.productCountComponent);
        if((SITEDATA.is_cart == 'true')){
          this.updateProductQuantityInCartByCartID(this.cart_id, this.productCountComponent);
        }
      }
    },
    updateProductQuantityInCartByCartID(cartID, productQuantity) {
        //TODO: убрать jquery
        $.ajax({
            type: "POST",
            url: `${SITEDATA.url}/wp-admin/admin-ajax.php`,
            data: {
                'action': 'set_item_from_cart_by_cart_id',
                'cart_id': cartID,
                'product_quantity': productQuantity
            },
            success: function (res) {
                if (res.success) {
                    $.post(wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'get_refreshed_fragments'), function (data) {
                        if (data && data.fragments) {
                            $.each(data.fragments, function (key, value) {
                                $(key).replaceWith(value);
                            });
                            $(document.body).trigger('wc_fragments_refreshed');
                        }
                    });
                }
                else{
                  console.log('error');
                }
            }
        });
    }
  }
};
</script>