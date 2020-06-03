import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const set = key => (state, val) => {
    state[key] = val
}

const store = new Vuex.Store({
    state: {
        favorites: [],
        viewedProducts: [],
        cartSubtotal: parseFloat(SITEDATA.cart_subtotal),
        catalogCategory: SITEDATA.category_slug,
        productCount: 1,
        pageNum: 1,
        showLoader: false,
        loadingProducts: false,
        product: {},
        products: [],
        category_count: '',
        category_count_page: 21,
        searchString: SITEDATA.search_query,
        
        catalogSort: '',
        catalogPrices: [],
        catalogColors: [],
        catalogSizes: [],
        catalogWidths: [],
        catalogMaterials: [],


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
    plugins: [createPersistedState({
reducer: state => ({
favorites: state.favorites,
})
})],
    getters: {
        getProductCount: state => state.productCount,
        allProducts: (state, getters) => {
            return state.products
        },
    },
    mutations: {
        ALL_PRODUCTS(state) {
            state.showLoader = true
        },
        ALL_PRODUCTS_SUCCESS(state, payload) {
            state.showLoader = false;
            state.products = payload;
        },
        updateCatalogSort: set('catalogSort'),
        updateSearchString: set('searchString'),
        updateCategoryCount: set('category_count'),
        updateCategoryCountPage: set('category_count_page'),
        updatePageNum: set('pageNum'),
        updateLoadingProducts: set('loadingProducts'),
        updateProductCount: set('productCount'),
        updateCatalogCategory: set('catalogCategory'),
        updateCatalogColors: set('catalogColors'),
        updateCatalogPrices: set('catalogPrices'),
        updateCatalogSizes: set('catalogSizes'),
        updateCatalogWidths: set('catalogWidths'),
        updateCatalogMaterials: set('catalogMaterials'),
        updateFavorites: set('favorites'),

        updateCvet: set('cvet'),
        updateDlina: set('dlina'),
        updateDlina_max: set('dlina_max'),
        updateDvuxyarusnye: set('dvuxyarusnye'),
        updateForma: set('forma'),
        updateGlubina: set('glubina'),
        updateMaterial_fasada: set('material_fasada'),
        updateMaterial_karkasa: set('material_karkasa'),
        updateMaterial_obivki: set('material_obivki'),
        updateMexanizm: set('mexanizm'),
        updateNapolnenie: set('napolnenie'),
        updateObivka: set('obivka'),
        updateOsnovanie: set('osnovanie'),
        updateOsobennosti: set('osobennosti'),
        updateRaskladka: set('raskladka'),
        updateRaskladnoj: set('raskladnoj'),
        updateRazmer: set('razmer'),
        updateS_yashhikom: set('s_yashhikom'),
        updateShirina: set('shirina'),
        updateSidene: set('sidene'),
        updateSo_spalnym_mestom: set('so_spalnym_mestom'),
        updateSpalnoe_mesto_dlina: set('spalnoe_mesto_dlina'),
        updateSpalnoe_mesto_shirina: set('spalnoe_mesto_shirina'),
        updateStil: set('stil'),
        updateStoleshnica: set('stoleshnica'),
        updateStrana_proizvodstva: set('strana_proizvodstva'),
        updateTip: set('tip'),
        updateTolshhina: set('tolshhina'),
        updateVid: set('vid'),
        updateVysota: set('vysota'),
        updateZamki: set('zamki'),
        updateZhestkost: set('zhestkost'),

        updateViewedProducts(state, value) {
            state.viewedProducts = value
        },
        updateFavorites(state, value) {
            state.favorites = value
        },   
        clearFavorites(state) {
            state.favorites = [];
        },  
        removeFavorites(state, value) {
            var index = state.favorites.indexOf(value);
            if (index > -1) {
                state.favorites.splice(index, 1);
            }
        },   
        addFavorites(state, value) {
            if (state.favorites) {
                state.favorites.push(value);
            }
            else{
                state.favorites = [];
                state.favorites.push(value);
            }
        },
        updateCartSubtotal: set('cartSubtotal'),
        updateProductCount: set('productCount'),
    },
    actions: {
        async allProducts ({commit}, vm ) {
            try {
            commit('ALL_PRODUCTS');
            let catalogCategory = this.state.catalogCategory !=='null' ? this.state.catalogCategory: '';
            let rangePrice = this.state.catalogPrices;
            let catalogColors = this.state.catalogColors;
            let catalogSizes = this.state.catalogSizes;
            let catalogMaterials = this.state.catalogMaterials;
            let catalogPaged = this.state.pageNum ?  this.state.pageNum : SITEDATA.paged;
            let catalogWidths = this.state.catalogWidths;
            let searchString = this.state.searchString;
            let catalogSort = this.state.catalogSort;
            let searchData = `product-cat=${catalogCategory}&sizes=${catalogSizes}&materials=${catalogMaterials}&colors=${catalogColors}&paged=${catalogPaged}&widths=${catalogWidths}&range_price=${rangePrice}&sort=${catalogSort}`;
            let responseProducts = "";


            function isAttibute(element) {
                //TODO: получать атрибуты из wp
                let AttibuteParametrNames = [
                    'colors',
                    'materials',
                    'patterns',
                    'sizes',
                ];
                if (AttibuteParametrNames.includes(element)) {
                    return element;
                }
                else{
                    return false;
                }
            }

            let pathArray = window.location.pathname.split('/');
            let pathArrayFiltered = pathArray.filter((el) => {return el != ''});
            let AttibuteParametr = pathArrayFiltered[pathArrayFiltered.findIndex(isAttibute)];
            let AttibuteValue = pathArrayFiltered[pathArrayFiltered.findIndex(isAttibute) + 1];
            
            commit('updateLoadingProducts', true);
            if(SITEDATA.category_slug || (SITEDATA.is_shop === 'true')){
                console.log('glasse branch');
                responseProducts = await fetch(`${SITEDATA.url}/wp-json/amadreh/v1/get-products/?${searchData}`);
            }
            else if (SITEDATA.category_slug && !(SITEDATA.is_filter === 'true')) {
                console.log('filter branch');
                responseProducts = await fetch(`${SITEDATA.url}/wp-json/amadreh/v1/get-products/?${searchData}&product-cat=${SITEDATA.category_slug}&paged=${catalogPaged}`);
            }
            else if(SITEDATA.current_brand){
                console.log('current_brand branch');
                responseProducts = await fetch(`${SITEDATA.url}/wp-json/amadreh/v1/get-products/?brands=${SITEDATA.current_brand}&paged=${catalogPaged}&order_by=${catalogItemsOrderBy}`);
            }
            else if(AttibuteParametr && AttibuteValue){
                console.log('AttibuteParametr branch');
                responseProducts = await fetch(`${SITEDATA.url}/wp-json/amadreh/v1/get-products/?${AttibuteParametr}=${AttibuteValue}&paged=${catalogPaged}&order_by=${catalogItemsOrderBy}`);
            }
            else if(SITEDATA.is_search === 'true'){
                console.log('search branch');
                let product_name = searchString;
                responseProducts = await fetch(`${SITEDATA.url}/wp-json/amadreh/v1/get-products?search=${product_name}&${searchData}`);
            }
            
            if(responseProducts){
                const dataProducts = await responseProducts.json();
                commit('ALL_PRODUCTS_SUCCESS', dataProducts.data.posts);
                commit('updateCategoryCount', dataProducts.data.found_posts);
                commit('updateCategoryCountPage', Math.ceil(dataProducts.data.found_posts / 16));
            }
            commit('updateLoadingProducts', false);

            } catch (error) {
                console.error(error);
            }
        },
    },
});

export default store;