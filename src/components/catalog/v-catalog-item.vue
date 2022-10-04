<template>
  <div class='v-catalog-item'>

    <v-popup
        v-if="isInfoPopupVisible"
        rightBtnTitle="Add to cart"
        :popupTitle="product_data.name"
        @closePopup="closeInfoPopup"
        @rightBtnAction="addToCart"
    >
      <img class="v-catalog-item__image" :src=" require('../../assets/images/' + product_data.image) " alt="img">
      <div>
        <p class="v-catalog-item__name">Product: {{product_data.name}}</p>
        <p class="v-catalog-item__company">Company: {{product_data.Company}} </p>
        <p class="v-catalog-item__store">Store: {{product_data.Store}}</p>
        <p class="v-catalog-item__deliveryDate">Deliver Date: {{product_data.DeliveryDate}}</p>
        <p class="v-catalog-item__CreatedDate">Created Date: {{product_data.CreatedDate}}</p>
      </div>
    </v-popup>


<!--    <img class="v-catalog-item__image" :src=" require('../../assets/images/' + product_data.image) " alt="img" @click="productClick">-->
      <p class="v-catalog-item__name">Product: {{product_data.name}}</p>
      <p class="v-catalog-item__company">Company: {{product_data.company}} </p>
      <p class="v-catalog-item__store">Store: {{product_data.store}}</p>
      <p class="v-catalog-item__deliveryDate">Deliver Date: {{product_data.deliveryDate}}</p>
      <p class="v-catalog-item__CreatedDate">Created Date: {{product_data.createdDate}}</p>
    <button
        class="v-catalog-item__show-info"
        @click="showPopupInfo"
    >
      Show info
    </button>
    <br>
    <button
        class="v-catalog-item__add_to_cart_btn btn"
        @click="addToCart"
    >Add to cart
    </button>
  </div>
</template>

<script>
  import vPopup from '../popup/v-popup'
  // import toFix from '../../filters/toFix'

  export default {
    name: "v-catalog-item",
    components: {
      vPopup
    },
    props: {
      product_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isInfoPopupVisible: false
      }
    },
    // filters: {
    //   toFix,
    //   formattedPrice
    // },
    computed: {},
    methods: {
      productClick() {
        this.$emit('productClick', this.product_data.article)
      },
      showPopupInfo() {
        this.isInfoPopupVisible = true;
      },
      closeInfoPopup() {
        this.isInfoPopupVisible = false;
      },
      addToCart() {
        this.$emit('addToCart', this.product_data);
      }
    },
    mounted() {
      console.log(this.product_data);
      this.$set(this.product_data, 'quantity', 1)
    }
  }
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 16px;
    margin-bottom: 16px;

    &__image {
      width: 100px;
    }
  }
</style>
