import axios from "axios";

export default {
  GET_PRODUCTS_FROM_API({commit}) {
    return axios('http://localhost:3000/products', {
      method: "GET"
    })
      .then((products) => {
        products= products.data
        function compare( a, b ) {
          const date1 = new Date(a.deliveryDate);
          const date2 = new Date(b.deliveryDate);

          if ( date1 > date2 ){
            return -1;
          }
          if ( date1 < date2 ){
            return 1;
          }
          return 0;
        }

        products.sort( compare );
        commit('SET_PRODUCTS_TO_STATE', products);
        return products;
      })
      .catch((error) => {
        console.log(error)
        return error;
      })
  },
  async ADD_PRODUCT_TO_API({ state, commit }) {
    try {
      const newProduct = await axios.post('http://localhost:3000/products', {
          ...state.product
      });
      commit('SET_PRODUCT_TO_STATE', newProduct.data);
      return newProduct.data;
    } catch (e) {
      console.log(e)
      return e;
    }

  },
  async UPDATE_PRODUCT_TO_API({ state, commit }) {
    try {
      const updatedProduct = await axios.put('http://localhost:3000/products', {
        ...state.product
      });
      commit('SET_PRODUCT_TO_STATE', updatedProduct.data);
      return updatedProduct.data;
    } catch (e) {
      console.log(e)
      return e;
    }

  }
}
