<template>
    <div class="similar-products">
        <div class="similar-products-title">Похожие товары</div>
        <div name="products" tag="section" class="similar-products-inner">
            <template v-if="products.length > 0" v-for="(product, index) in products" >
                <product-item :product="product" :class="classItem" :key='index'></product-item>
            </template>
        </div>       
    </div>
</template>
        
<script>
  export default {
    name: 'product-list-recommended',
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

    },
    data() {
        return {
            loading: true,
            products: [],
            site_url: SITEDATA.url,
        };
    }
  }
</script>