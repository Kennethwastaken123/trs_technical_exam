<script setup>
  import { onMounted, ref } from "vue";
  import axiosClient from '../axios.js';
  import { getCurrentInstance } from 'vue'
  import { useUserStore } from '../store/user.js'

  const auth = useUserStore()
  const { appContext } = getCurrentInstance()
  const products = ref([]);
  const showDeleteModal = ref(false)
  const selectedProduct = ref({})
  const deleteId = ref(null)
  const toastr = appContext.config.globalProperties.$toastr

  onMounted(() => {
    fetchProducts()
  });

  const fetchProducts = () => {
   axiosClient.get("/products")
    .then(res => {
      products.value = res.data;
      console.log(products.value)
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
          auth.logout()
        }else{
          console.error("Error:", err.response?.data || err.message);
      }
    });
  }

  function editProduct(product) {
    console.log('Editing product:', product);
  }

  function confirmDelete(product) {
    deleteId.value = product
    showDeleteModal.value = true
  }

  function deleteProduct() {
    showDeleteModal.value = false
     axiosClient.delete(`/products/${deleteId.value}`)
      .then(res => {
        showDeleteModal.value = false
        deleteId.value = null
        toastr.success('Product deleted successfully!', 'Success')

        fetchProducts()
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          auth.logout()
        }else{
          console.error("Error:", err.response?.data || err.message);
        }
      });

  }
  </script>

<template>
  <div>
    <header class="relative bg-white shadow-sm">
      <div class="mx-auto max-w-1xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
      </div>
    </header>

    <main>
      <div class="mx-auto max-w-1xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="p-4 sm:p-6 bg-white rounded-lg shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800"></h2>
            <RouterLink  class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200" :to="{name:'Create'}">
              + Create
            </RouterLink>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

            <DataTable :value="products" paginator :rows="10" >
              <Column field="name" header="Name"  :style="{ width: '40%' }" />
              <Column field="price" header="Price" :style="{ width: '20%' }" />
              <Column field="stock" header="Stock" :style="{ width: '20%' }" />

              <Column header="Actions"  :style="{ width: '20%' }" >
                <template #body="slotProps">
                  <RouterLink :to="{name:'Edit', params: { id: slotProps.data.id }}" class="mr-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">Edit</RouterLink>
                  <button @click="confirmDelete(slotProps.data.id)" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Delete</button>
                </template>
              </Column>
            </DataTable>
          </div>
          <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg p-6 w-96">
              <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete <strong>{{ selectedProduct.name }}</strong>?</p>
              <div class="mt-6 flex justify-end">
                <button
                  class="bg-gray-300 px-4 py-2 rounded mr-2"
                  @click="showDeleteModal = false"
                >
                  Cancel
                </button>
                <button
                  class="bg-red-500 text-white px-4 py-2 rounded"
                  @click="deleteProduct"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<style scoped>

</style>
