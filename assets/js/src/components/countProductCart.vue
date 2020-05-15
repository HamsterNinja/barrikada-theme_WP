<template>
<div class="cart-list-item-quantity">
    <div class="count-product">
        <button v-on:click="incrementProduct">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" fill="none">
                <path stroke="#323232" d="M9 4L4.81 1 1 4"/>
            </svg>
        </button> 
        <input type="number" min="1" :value="productCountComponent" name="" class="inputNumber"> 
        <button v-on:click="decrementProduct">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none">
                <path stroke="#323232" d="M1 1l4.19 4L9 1"/>
            </svg>
        </button>
    </div>
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
    //TODO: Обьединить метод incrementProduct и decrementProduct
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
        let instance = this;
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
                    instance.$store.commit('updateCartSubtotal', res.data.subtotal);
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