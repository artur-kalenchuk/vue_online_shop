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
        :fields="fields"
        :api-mode="false"
        :per-page="perPage"
        :data-manager="dataManager"
        pagination-path="pagination"
        @vuetable:pagination-data="onPaginationData"
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
      <div style="padding-top:10px">
        <vuetable-pagination ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import Vuetable from 'vuetable-2'
  import VuetablePagination from "vuetable-2/src/components/VuetablePagination";

  export default {
    name: "v-catalog",
    components: {
      Vuetable,
      VuetablePagination
    },
    data() {
      return {
        fields: ['id', 'name', 'company', 'store', 'deliveryDate', 'createdDate', 'actions'],
        perPage: 3,
      };
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
    watch: {
      filteredProducts() {
        this.$refs.vuetable.refresh();
      }
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
      },
      onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData);
      },
      onChangePage(page) {
        this.$refs.vuetable.changePage(page);
      },
      dataManager(sortOrder, pagination) {
        if (this.filteredProducts.length < 1) return;

        let local = this.filteredProducts;

        pagination = this.$refs.vuetable.makePagination(
            local.length,
            this.perPage
        );

        let from = pagination.from - 1;
        let to = from + this.perPage;

        return {
          pagination: pagination,
          data: local.slice(from, to)
        };
      },
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
