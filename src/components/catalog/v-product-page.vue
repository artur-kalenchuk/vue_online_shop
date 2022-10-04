<template>
  <div class='v-product-page'>
    <label class="input-field" for="product-name">
      <span>Product Name:</span>
      <input id="product-name" v-model="name" />
    </label>
    <p><b>Company:</b> {{product.company}}</p>
    <p><b>Store:</b> {{product.store}}</p>
    <p><b>Delivery Date:</b> {{product.deliveryDate}}</p>
    <p><b>Created Date:</b> {{product.createdDate}}</p>
    <div class="v-product-page_actions">
      <router-link class="v-product-page_cancel btn btn_default" :to="{name: 'products'}">
        Cancel
      </router-link>
      <button
          class="btn"
          @click="onUpdateProduct"
      >
        Update product
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "v-product-page",
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
    },
    methods: {
      ...mapActions([
        'UPDATE_PRODUCT_TO_API'
      ]),
      async onUpdateProduct() {
        await this.UPDATE_PRODUCT_TO_API();
        this.$router.push('/products');
      },
    }
  }
</script>

<style lang="scss">
  .v-product-page {
    text-align: left;
    width: 50%;
    &_cancel {
      text-decoration: none;
      margin-bottom: 20px;
    }
    &_actions {
      display: flex;
      align-items: start;
      justify-content: right;
      & > :first-child {
        margin-right: 20px;
      }
    }
  }
</style>
