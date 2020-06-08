import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const set = key => (state, val) => {
    state[key] = val
}

const store = new Vuex.Store({
    state: {
        rangePrice: [SITEDATA.min_price_per_product_cat, SITEDATA.max_price_per_product_cat], 
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

        catalogItemsOrderBy: 'ASC',

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
        updateRangePrice: set('rangePrice'),
        updateCatalogItemsOrderBy: set('catalogItemsOrderBy'),

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
            let rangePrice = this.state.rangePrice;
            let catalogColors = this.state.catalogColors;
            let catalogSizes = this.state.catalogSizes;
            let catalogMaterials = this.state.catalogMaterials;
            let catalogPaged = this.state.pageNum ?  this.state.pageNum : SITEDATA.paged;
            let catalogWidths = this.state.catalogWidths;
            let searchString = this.state.searchString;
            let catalogSort = this.state.catalogSort;
            let cvet = this.state.cvet;
            let dlina = this.state.dlina;
            let dlina_max = this.state.dlina_max;
            let dvuxyarusnye = this.state.dvuxyarusnye;
            let forma = this.state.forma;
            let glubina = this.state.glubina;
            let material_fasada = this.state.material_fasada;
            let material_karkasa = this.state.material_karkasa;
            let material_obivki = this.state.material_obivki;
            let mexanizm = this.state.mexanizm;
            let napolnenie = this.state.napolnenie;
            let obivka = this.state.obivka;
            let osnovanie = this.state.osnovanie;
            let osobennosti = this.state.osobennosti;
            let raskladka = this.state.raskladka;
            let raskladnoj = this.state.raskladnoj;
            let razmer = this.state.razmer;
            let s_yashhikom = this.state.s_yashhikom;
            let shirina = this.state.shirina;
            let sidene = this.state.sidene;
            let so_spalnym_mestom = this.state.so_spalnym_mestom;
            let spalnoe_mesto_dlina = this.state.spalnoe_mesto_dlina;
            let spalnoe_mesto_shirina = this.state.spalnoe_mesto_shirina;
            let stil = this.state.stil;
            let stoleshnica = this.state.stoleshnica;
            let strana_proizvodstva = this.state.strana_proizvodstva;
            let tip = this.state.tip;
            let tolshhina = this.state.tolshhina;
            let vid = this.state.vid;
            let vysota = this.state.vysota;
            let zamki = this.state.zamki;
            let zhestkost = this.state.zhestkost;

            let catalogItemsOrderBy = this.state.catalogItemsOrderBy;
            
            let searchData = `product-cat=${catalogCategory}&order_by=${catalogItemsOrderBy}&range_price=${rangePrice}&sizes=${catalogSizes}&materials=${catalogMaterials}&colors=${catalogColors}&paged=${catalogPaged}&widths=${catalogWidths}&range_price=${rangePrice}&sort=${catalogSort}&cvet=${cvet}&dlina=${dlina}&dlina_max=${dlina_max}&dvuxyarusnye=${dvuxyarusnye}&forma=${forma}&glubina=${glubina}&material_fasada=${material_fasada}&material_karkasa=${material_karkasa}&material_obivki=${material_obivki}&mexanizm=${mexanizm}&napolnenie=${napolnenie}&obivka=${obivka}&osnovanie=${osnovanie}&osobennosti=${osobennosti}&raskladka=${raskladka}&raskladnoj=${raskladnoj}&razmer=${razmer}&s_yashhikom=${s_yashhikom}&shirina=${shirina}&sidene=${sidene}&so_spalnym_mestom=${so_spalnym_mestom}&spalnoe_mesto_dlina=${spalnoe_mesto_dlina}&spalnoe_mesto_shirina=${spalnoe_mesto_shirina}&stil=${stil}&stoleshnica=${stoleshnica}&strana_proizvodstva=${strana_proizvodstva}&tip=${tip}&tolshhina=${tolshhina}&vid=${vid}&vysota=${vysota}&zamki=${zamki}&zhestkost=${zhestkost}`;
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