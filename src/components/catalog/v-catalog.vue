<template>
  <div class='v-catalog'>
    <v-notification
        :messages="messages"
    />

    <h1>Products</h1>
    <button
        class="btn v-catalog_create_product"
        @click="onCreateNewProduct()"
    >
      Create new product
    </button>
    <div class="v-catalog__list">
      <vuetable ref="vuetable"
        :fields="['id', 'name', 'company', 'store', 'deliveryDate', 'createdDate', 'actions']"
        :api-mode="false"
        :data="filteredProducts"
      >
        <div slot="actions" slot-scope="props">
          <button
              class="ui small button"
              @click="onEditProduct('edit-item', props.rowData)"
          >
            Edit
          </button>
        </div>
      </vuetable>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import Vuetable from 'vuetable-2'
  import vNotification from '../notifications/v-notification'

  export default {
    name: "v-catalog",
    components: {
      Vuetable,
      vNotification
    },
    props: {},
    data() {
      return {
        categories: [
          {name: 'Все', value: 'ALL'},
          {name: 'Тест1', value: 'м'},
          {name: 'Тест2', value: 'ж'},
        ],
        selected: 'Все',
        sortedProducts: [],
        messages: []
      }
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'IS_MOBILE',
        'IS_DESKTOP',
      ]),
      filteredProducts() {
        if (this.sortedProducts.length) {
          return this.sortedProducts
        } else {
          return this.PRODUCTS
        }
      },
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'SET_PRODUCT_TO_STATE'
      ]),
      productClick(article) {
        this.$router.push( {name: 'product', query: { 'product': article }})
      },
      onEditProduct(action, data) {
        this.$router.push(`product/${data.id}`);
      },
      onCreateNewProduct() {
        this.SET_PRODUCT_TO_STATE({});
        this.$router.push('product/new');
      }
    },
    watch: {
      SEARCH_VALUE() {
        this.sortProductsBySearchValue(this.SEARCH_VALUE);
      }
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API();
    }
  }
</script>

<style lang="scss">
  .v-catalog {
    &_create_product {
      float: right;
      margin-bottom: 20px;
    }
  }
</style>
<!--<template>-->
<!--  <div class='v-catalog'>-->

<!--    <v-notification-->
<!--        :messages="messages"-->
<!--    />-->


<!--    <router-link :to="{name: 'cart', params: {cart_data: CART}}">-->
<!--      <div class="v-catalog__link_to_cart">Cart: {{CART.length}}</div>-->
<!--    </router-link>-->
<!--    <h1>Catalog</h1>-->
<!--    <div class="filters">-->
<!--      <v-select-->
<!--          :selected="selected"-->
<!--          :options="deliveryDate"-->
<!--          @select="sortByDate"-->
<!--      />-->
<!--    </div>-->
<!--    <div class="v-catalog__list">-->
<!--      <v-catalog-item-->
<!--          v-for="product in filteredProducts"-->
<!--          :key="product.article"-->
<!--          :product_data="product"-->
<!--          @addToCart="addToCart"-->
<!--          @productClick="productClick"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import vCatalogItem from './v-catalog-item'-->
<!--  import {mapActions, mapGetters} from 'vuex'-->
<!--  import vSelect from '../v-select'-->
<!--  import vNotification from '../notifications/v-notification'-->

<!--  export default {-->
<!--    name: "v-catalog",-->
<!--    components: {-->
<!--      vCatalogItem,-->
<!--      vSelect,-->
<!--      vNotification-->
<!--    },-->
<!--    props: {},-->
<!--    data() {-->
<!--      return {-->
<!--        categories: [-->
<!--          {name: 'Все', value: 'ALL'},-->
<!--          {name: 'Тест1', value: 'м'},-->
<!--          {name: 'Тест2', value: 'ж'},-->
<!--        ],-->
<!--        selected: 'Все',-->
<!--        sortedProducts: [],-->
<!--        messages: []-->
<!--      }-->
<!--    },-->
<!--    computed: {-->
<!--      ...mapGetters([-->
<!--        'PRODUCTS',-->
<!--        'CART',-->
<!--        'IS_MOBILE',-->
<!--        'IS_DESKTOP',-->
<!--        'SEARCH_VALUE'-->
<!--      ]),-->
<!--      filteredProducts() {-->
<!--        if (this.sortedProducts.length) {-->
<!--          return this.sortedProducts-->
<!--        } else {-->
<!--          return this.PRODUCTS-->
<!--        }-->
<!--      },-->
<!--    },-->
<!--    methods: {-->
<!--      ...mapActions([-->
<!--        'GET_PRODUCTS_FROM_API',-->
<!--        'ADD_TO_CART'-->
<!--      ]),-->
<!--      productClick(article) {-->
<!--        this.$router.push( {name: 'product', query: { 'product': article }})-->
<!--      },-->
<!--      // sortByDate(dateDelivery) {-->
<!--      //   let vm = this;-->
<!--      //   this.sortedProducts = [...this.PRODUCTS]-->
<!--      //   this.sortedProducts = this.sortedProducts.filter(function (item) {-->
<!--      //     *********-&#45;&#45;******-->
<!--      //   })-->
<!--      //   if (dateDelivery) {-->
<!--      //     this.sortedProducts = this.sortedProducts.filter(function (e) {-->
<!--      //       vm.selected === category.name;-->
<!--      //       return e.category === category.name-->
<!--      //     })-->
<!--      //   }-->
<!--      // },-->
<!--      addToCart(data) {-->
<!--        this.ADD_TO_CART(data)-->
<!--          .then(() => {-->
<!--            let timeStamp = Date.now().toLocaleString();-->
<!--            this.messages.unshift(-->
<!--              {name: 'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp}-->
<!--            )-->
<!--          })-->
<!--      },-->
<!--      // sortProductsBySearchValue(value) {-->
<!--      //   this.sortedProducts = [...this.PRODUCTS]-->
<!--      //   if (value) {-->
<!--      //     this.sortedProducts = this.sortedProducts.filter(function (item) {-->
<!--      //       return item.name.toLowerCase().includes(value.toLowerCase())-->
<!--      //     })-->
<!--      //   } else {-->
<!--      //     this.sortedProducts = this.PRODUCTS;-->
<!--      //   }-->
<!--      // }-->
<!--    },-->
<!--    watch: {-->
<!--      SEARCH_VALUE() {-->
<!--        this.sortProductsBySearchValue(this.SEARCH_VALUE);-->
<!--      }-->
<!--    },-->
<!--    mounted() {-->
<!--      this.GET_PRODUCTS_FROM_API()-->
<!--        .then((response) => {-->
<!--          if (response.data) {-->
<!--            // this.sortByDate()-->
<!--            this.sortProductsBySearchValue(this.SEARCH_VALUE)-->
<!--          }-->
<!--        })-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style lang="scss">-->
<!--  .v-catalog {-->
<!--    &__list {-->
<!--      display: flex;-->
<!--      flex-wrap: wrap;-->
<!--      justify-content: space-between;-->
<!--      align-items: center;-->
<!--    }-->

<!--    &__link_to_cart {-->
<!--      position: fixed;-->
<!--      top: 80px;-->
<!--      right: 10px;-->
<!--      padding: 16px;-->
<!--      border: solid 1px #aeaeae;-->
<!--      background: #ffffff;-->
<!--    }-->
<!--  }-->

<!--  .filters {-->
<!--    display: flex;-->
<!--    justify-content: space-between;-->
<!--    align-items: center;-->
<!--  }-->

<!--  .range-slider {-->
<!--    width: 200px;-->
<!--    margin: auto 16px;-->
<!--    text-align: center;-->
<!--    position: relative;-->
<!--  }-->

<!--  .range-slider svg, .range-slider input[type=range] {-->
<!--    position: absolute;-->
<!--    left: 0;-->
<!--    bottom: 0;-->
<!--  }-->

<!--  input[type=range]::-webkit-slider-thumb {-->
<!--    z-index: 2;-->
<!--    position: relative;-->
<!--    top: 2px;-->
<!--    margin-top: -7px;-->
<!--  }-->
<!--</style>-->
