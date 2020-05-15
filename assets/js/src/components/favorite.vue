<template>
  <button ref="favoriteButton" class="button product-variations-title__favorite add_favorite" tabindex="0" title="добавить в избранные" v-on:click="setFavorite" :class="{ 'favorited': favorited}">
      <svg width="32" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.595 4.901l.405.56.405-.56a9.79 9.79 0 011.934-2.02c1.403-1.085 2.988-1.631 4.722-1.631 2.333 0 4.472.932 6.033 2.625C30.638 5.55 31.5 7.851 31.5 10.367c0 2.563-.948 4.93-3.059 7.477h0c-1.903 2.297-4.648 4.639-7.883 7.395h0l-.028.023c-1.094.933-2.335 1.991-3.623 3.117h0a1.377 1.377 0 01-1.815 0h0c-1.297-1.135-2.546-2.199-3.646-3.136l-.003-.003h0c-3.235-2.757-5.98-5.1-7.884-7.396C1.449 15.298.5 12.93.5 10.367c0-2.516.862-4.817 2.406-6.492 1.56-1.693 3.7-2.625 6.033-2.625 1.734 0 3.319.546 4.722 1.631h0a9.781 9.781 0 011.934 2.02z" stroke="#D1D1D1"/></svg>
  </button>
</template>

<script>
export default {
  props: {
    productId: [String, Number],
    width: Number,
    height: Number,
    favorites: Array,
    color:{
      type: String,
      required: false,
      default: 'fff'
    },
    textbutton:{
      type: String,
      required: false,
      default: ''
    }
  },
  mounted(){
    if (this.favorites.includes(String(this.productId))) {
      this.$refs.favoriteButton.parentNode.classList.add('show');
    }
  },
  computed: {
      colorSVG: function () {
        return `#${this.color}`;
      },
			favorited: function () {
          if (this.favorites) {
            if (this.favorites.includes(String(this.productId))) {
              return true;
            }
            else{
              return false;
            }
          }
          else{
            return false;
          }
      }
  },
  methods: {
    addFavorite: function(dataFavorite, vm) {
      fetch(`${SITEDATA.url}/wp-json/optiko/v1/add-favorite`, {
            method: "POST",
            body: dataFavorite
          }).then(function(response) {
            if (response.status !== 200) {
                  throw new Error("Пустой запрос")
            } 
            return response.json();
          }).then(function(json) {
            let dataFavorite = json;
            let favorites = Object.values(dataFavorite.data);
            vm.$root.favorites = favorites;
          }).catch(function (err) {
              console.log(err);
          });
    },
    removeFavorite: function(dataFavorite, vm) {
        fetch(`${SITEDATA.url}/wp-json/optiko/v1/remove-favorite`, {
              method: "POST",
              body: dataFavorite
          }).then(function (response) {
              if (response.status !== 200) {
                  throw new Error("Пустой запрос")
              } 
              return response.json();
          }).then(function (json) {
              let dataFavorite = json;
              let favorites = Object.values(dataFavorite.data);
              vm.$root.favorites = favorites;
          }).catch(function (err) {
              console.log(err);
          });
    },
    setFavorite: function() {
      let vm = this;
      let dataFavorite = new FormData();
      dataFavorite.append('product_id', this.productId);
      dataFavorite.append('user_id', SITEDATA.current_user_id); 
      let disabled = false;
      if (this.productId && SITEDATA.current_user_id == true && disabled) {
        if(this.favorited){
            this.removeFavorite(dataFavorite, vm);
            this.$refs.favoriteButton.parentNode.classList.remove('show');
        }
        else{
          this.addFavorite(dataFavorite, vm);
          this.$refs.favoriteButton.parentNode.classList.add('show');
        }
      }
      else{
        if(this.favorited){
          this.$store.commit('removeFavorites', this.productId.toString());
          this.$refs.favoriteButton.parentNode.classList.remove('show');
        }
        else{
          this.$store.commit('addFavorites', this.productId.toString());
          if (this.favorites.includes(String(this.productId))) {
            this.$refs.favoriteButton.parentNode.classList.add('show');
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.product-variations-title__favorite {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  font-size: 14px;
  line-height: 16px;
  color: #808D9A;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  span{
    padding-left: 5px;
  }
  svg{
	  path{
		  transition: 0.3s;
	  }
  }
  &.favorited {
    opacity: 1;
    svg {
		path{
			fill: #01B9B3;
		}
	}
  }
}
</style>