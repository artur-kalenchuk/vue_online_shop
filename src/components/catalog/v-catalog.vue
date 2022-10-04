<template>
  <div class='v-catalog'>
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

  export default {
    name: "v-catalog",
    components: {
      Vuetable
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'PRODUCT',
        'IS_MOBILE',
        'IS_DESKTOP',
      ]),
      filteredProducts() {
          return this.PRODUCTS;
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
        this.SET_PRODUCT_TO_STATE(data);
        this.$router.push(`product/${data.id}`);
      },
      onCreateNewProduct() {
        this.SET_PRODUCT_TO_STATE({});
        this.$router.push('product/new');
      }
    },
    activated() {
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
