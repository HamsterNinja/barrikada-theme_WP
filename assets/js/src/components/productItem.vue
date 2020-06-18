<template>
    <div class="product-card">
        <a :href="product.permalink" class="card-image">
            <template v-if="percent">
                <div class="sale-tag">-{{ percent }}%</div>
            </template>
            <img :src="currentPhoto" alt />
        </a>
        <div class="card-cat">
            <h3 v-if="product.categories && product.categories[1]">{{ product.categories[1].name }}</h3>
        </div>
        <a :href="product.permalink" class="card-name">
            <h4>{{ product.name }}</h4>
        </a>
        <div class="card-bottom">
            <template v-if="product.sale_price">
                <div class="card-prices">
                    <p>
                        Цена:
                        <span>{{ product.regular_price }} ₽</span>
                    </p>
                    <div
                        class="current-price"
                        v-if="product.regular_price"
                    >{{ product.sale_price }} ₽</div>
                </div>
            </template>
            <template v-else>
                <div
                    class="current-price"
                    v-if="product.regular_price"
                >{{ product.regular_price }} ₽</div>
            </template>
            <favorite :product-id="product.id" :favorites="favorites"></favorite>
            <button
                class="button--products-add card-cart"
                :data-product-id="product.id"
                v-on:click="addToCart"
            >
                <svg width="29" height="27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.009 23.66a2.408 2.408 0 11-4.817 0 2.408 2.408 0 014.817 0zm7.343-2.409a2.408 2.408 0 100 4.817 2.408 2.408 0 000-4.817zm7.476-11.306l-2.964 8.808s-.245 1.308-1.495 1.308H9.405c-1.492 0-1.554-1.639-1.554-1.639S6.26 6.626 6.18 5.913c-.078-.713-.99-1.24-.99-1.24L1.272 2.84C-.878 1.718.098-.419 1.27.072c4.972 2.346 7.282 3.5 7.43 4.425.15.925.412 3.155.412 3.155v.014l.052-.014h18.329c2.213 0 1.334 2.297 1.334 2.293zM24.54 14.85l-.03.002H10.003l.299 2.37h13.534l.705-2.372zm1.413-4.781H9.404l.318 2.534h15.483l.749-2.534z"
                        fill="#A90E2D"
                    />
                </svg>
            </button>
        </div>
        <div class="card-info">
            <div class="card-info-row">
                <div class="card-info-name">Материалы:</div>
                <div class="card-info-value">Дерево, пластик</div>
            </div>
            <div class="card-info-row">
                <div class="card-info-name">Размер:</div>
                <div class="card-info-value">40х30х80</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "product-item",
    props: {
        product: Object
    },
    mounted() {},
    data() {
        return {
            template_url: SITEDATA.themepath,
            is_home: SITEDATA.is_home == "true",
            currentPhoto: this.product.images[0]
                ? this.product.images[0]["shop_single"]
                : ""
        };
    },
    computed: {
        categories(){
            return this.product.categories.filter(category => category.name !== "Uncategorized")
        },
        favorites: {
            get() {
                return this.$store.state.favorites;
            }
        },
        percent: function() {
            let productSalePrice = this.product.sale_price;
            let productRegularPrice = this.product.regular_price;
            if (productSalePrice && productRegularPrice) {
                let percent = Math.ceil(
                    ((productRegularPrice - productSalePrice) /
                        productRegularPrice) *
                        100
                );
                return percent;
            } else {
                return 0;
            }
        }
    },
    watch: {
        product() {
            this.currentPhoto = this.product.images[0]
                ? this.product.images[0]["shop_single"]
                : "";
        }
    },
    methods: {
        async addToCart() {
            let formProduct = new FormData();
            formProduct.append("action", "add_one_product");
            formProduct.append("product_id", this.product.id);
            formProduct.append("quantity", 1);
            let fetchData = {
                method: "POST",
                body: formProduct
            };
            let response = await fetch(
                wc_add_to_cart_params.wc_ajax_url
                    .toString()
                    .replace("%%endpoint%%", "add_to_cart"),
                fetchData
            );
            let jsonResponse = await response.json();
            if (jsonResponse.error != "undefined" && jsonResponse.error) {
                console.log(jsonResponse.error);
            } else if (jsonResponse.success) {
                this.classList.add("added");
            }
            if (jsonResponse.fragments) {
                Array.from(jsonResponse.fragments).forEach(element => {
                    element.classList.add("updating");
                });
                $.each(jsonResponse.fragments, function(key, value) {
                    $(key).replaceWith(value);
                    $(key)
                        .stop(true)
                        .css("opacity", "1");
                });
            }
        }
    }
};
</script>