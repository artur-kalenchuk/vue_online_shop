<template>
  <div class='v-catalog-item'>
    <label class="input-field">
      Delivery date filter:
      <input v-model="filter_date" v-on:change="filters" type="date">
    </label>


    <vuetable ref="vuetable"
      :fields="['id', 'name', 'company', 'store', 'deliveryDate', 'createdDate']"
      :api-mode="false"
      :data="filteredData"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Vuetable from 'vuetable-2'

  export default {
    name: "v-product-statistics",
    components: {
      Vuetable
    },
    data() {
      return {
        filter_date: null,
        filteredData: [],
      }
    },
    computed: {
      ...mapGetters([
        'PRODUCTS'
      ]),
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
      ]),

      filters() {
        if(this.filter_date === null){
          return;
        }
        const filterDate = new Date(this.filter_date);
        const filterDateString = `${filterDate.getDate() < 10 ? '0' + filterDate.getDate() : filterDate.getDate()}-${filterDate.getMonth() < 10 ? '0' + filterDate.getMonth() : filterDate.getMonth()}-${filterDate.getFullYear()}`;
        this.filteredData = this.PRODUCTS.filter((product) => {
          return product.deliveryDate === filterDateString;
        });
      }
    },
    async activated() {
      await this.GET_PRODUCTS_FROM_API();
      this.filteredData = this.PRODUCTS;
      console.log(123);
    }
  }
</script>

<style lang="scss">
  .v-catalog-item {
    text-align: left;
    & > .input-field {
      width: 200px;
    }
  }

</style>
