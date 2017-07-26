<template>
  <view-container>
    <header>
      <h1>Produtos</h1>
      <ui-button v-if="!isEditing" @click.native="add()">Adicionar</ui-button>
    </header>
    <form v-if="isEditing" @submit.prevent="save()">
      <ui-input v-model="product.name" label="Nome" />
      <ui-input v-model="product.description" label="Descrição" />
      <ui-input v-model="product.category" label="Categoria" />
      <ui-input v-model="product.price" label="Preço" />
      <input type="file" @change="event => uploadImage(event.target.files)">
      <div class="images" v-html="images"></div>
      <hr />
      <ui-button type="submit">Salvar</ui-button>
    </form>

    <p v-if="error">{{ error.message || error }}</p>

    <table v-if="products.length > 0">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
  </view-container>
</template>

<script>
  import storage from '@lib/storage'
  import * as types from '@store/types'
  import UiButton from '@components/UiButton'
  import UiForm from '@components/UiForm'
  import UiInput from '@components/UiInput'
  import ViewContainer from '@components/ViewContainer'

  export default {
    components: {
      UiButton,
      UiInput,
      UiForm,
      ViewContainer
    },
    data () {
      return {
        isEditing: false,
        error: ''
      }
    },
    computed: {
      images () {
        const images = this.product.images || []
        return images.reduce((html, image) => `${html}<img src="${image}" />`, '') || ''
      },
      product () {
        return this.$store.getters[types.PRODUCT]
      },
      products () {
        return this.$store.getters[types.PRODUCTS]
      }
    },
    methods: {
      async uploadImage ([ file ]) {
        if (!file) {
          return
        }

        try {
          const extension = /\.(\w)*$/.exec(file.name)[0]
          const reference = storage.ref(`images/${this.product.id}${extension}`)
          await reference.put(file)
          const image = await reference.getDownloadURL()
          const images = this.product.images || []
          this.product.images = [ ...images, image ]
        } catch (error) {
          this.error = error
        }
      },
      async save () {
        try {
          await this.$store.dispatch(types.PRODUCT_SAVE, this.product)
          this.isEditing = false
        } catch (error) {
          this.error = error
        }
      },
      async add () {
        try {
          await this.$store.dispatch(types.PRODUCTS_ADD)
          this.isEditing = true
        } catch (error) {
          this.error = error
        }
      }
    },
    async created () {
      try {
        await this.$store.dispatch(types.PRODUCTS_FETCH)
      } catch (error) {
        this.error = error
      }
    }
  }
</script>
