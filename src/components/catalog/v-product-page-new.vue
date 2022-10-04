<template>
  <div class='v-product-page'>
    <label class="input-field" for="product-name">
      Product Name
      <input id="product-name" v-model="name" />
    </label>
    <label class="input-field" for="product-company">
      Company
      <input id="product-company" v-model="company" />
    </label>
    <label class="input-field" for="product-store">
      Store
      <input id="product-store" v-model="store" />
    </label>
    <label class="input-field" for="product-deliveryDate">
      Delivery Date
      <input id="product-deliveryDate" v-model="deliveryDate" type="date"/>
    </label>
    <button
        class="v-catalog-item__add_to_cart_btn btn"
        @click="onSaveProduct"
    >
      Save product
    </button>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "v-product-page",
    props: {},
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'PRODUCT'
      ]),
      product() {
        return this.PRODUCT;
      },
      name: {
        get () {
          return this.$store.state.product.name
        },
        set (value) {
          this.$store.commit('SET_PRODUCT_FIELD_TO_STATE', { key: 'name', value });
        }
      },
      company: {
        get () {
          return this.$store.state.product.company
        },
        set (value) {
          this.$store.commit('SET_PRODUCT_FIELD_TO_STATE', { key: 'company', value });
        }
      },
      store: {
        get () {
          return this.$store.state.product.store
        },
        set (value) {
          this.$store.commit('SET_PRODUCT_FIELD_TO_STATE', { key: 'store', value });
        }
      },
      deliveryDate: {
        get () {
          return this.$store.state.product.deliveryDate
        },
        set (value) {
          const date = new Date(value);
          const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
          this.$store.commit('SET_PRODUCT_FIELD_TO_STATE', { key: 'deliveryDate', value: dateString });
        }
      },
    },
    methods: {
      ...mapActions([
        'ADD_PRODUCT_TO_API'
      ]),
      async onSaveProduct() {
        const product = await this.ADD_PRODUCT_TO_API();
        this.$router.push(`/product/${product.id}`);
      },
    }
  }
</script>

<style scoped>
  .v-product-page {
    width: 50%;
    display: block;
    margin: 0 auto;
  }
</style>
