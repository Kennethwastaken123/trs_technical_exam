<script setup>
    import {  onMounted,ref } from "vue";
    import axiosClient from '../../axios.js';
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as Yup from "yup";
    import router from '../../router.js';
    import { getCurrentInstance } from 'vue'
    import { useRoute } from 'vue-router'
    import { useUserStore } from '../../store/user.js'

    const auth = useUserStore()

    const data = ref({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    const { appContext } = getCurrentInstance()
    const toastr = appContext.config.globalProperties.$toastr
    const route = useRoute()


    const schema = Yup.object({
        name: Yup.string().required("Product name is required").max(100, "Name must be less than 100 characters"),
        price: Yup.number().typeError("Price must be a number").required("Price is required").positive("Price must be greater than 0"),
        stock: Yup.number().typeError("Stock must be a number").required("Stock is required").min(0, "Stock cannot be negative"),
    });

    const successMessage = ref("");

    onMounted(() => {
        fetchProducts()
    });

    const fetchProducts = () => {
        axiosClient.get(`/products/${route.params.id}`)
        .then(res => {
        console.log(res.data)
        data.value = res.data
        })
        .catch(err => {
           auth.logout()
        });
    }
    async function submit() {

        axiosClient.put(`/products/${route.params.id}`, data.value)
        .then(res => {
            toastr.success('Product edited successfully!', 'Success')
            setTimeout(() => {
                successMessage.value = "";
                router.push({name: 'Products'});
            }, 1000);

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
           <Form  class="space-y-6" @submit="submit"  :validation-schema="schema">
                <div class="space-y-12">
                    <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base/7 font-semibold text-gray-900">Edit Form</h2>

                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-4">
                                <label for="name" class="block text-sm/6 font-medium text-gray-900">Product Name <span class="text-red-500">*</span></label>
                                <div class="mt-2">
                                    <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <Field type="text" name="name" id="name" v-model="data.name" class="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                                    </div>
                                    <ErrorMessage name="name" class="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div class="col-span-full">
                                <label for="description" class="block text-sm/6 font-medium text-gray-900">Description</label>
                                <div class="mt-2">
                                <textarea name="description" id="description" rows="3" v-model="data.description" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="border-b border-gray-900/10 pb-12">

                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-3">
                                    <label for="price" class="block text-sm/6 font-medium text-gray-900">Product Price <span class="text-red-500">*</span></label>
                                    <div class="mt-2">
                                        <Field type="text" name="price" id="price" v-model="data.price" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    </div>
                                    <ErrorMessage name="price" class="text-red-500 text-sm" />
                                </div>
                                <div class="sm:col-span-3">
                                    <label for="stock" class="block text-sm/6 font-medium text-gray-900">Product Stock <span class="text-red-500">*</span></label>
                                    <div class="mt-2">
                                        <Field type="text" name="stock" id="stock" v-model="data.stock" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    </div>
                                    <ErrorMessage name="stock" class="text-red-500 text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <RouterLink type="button" class="text-sm/6 font-semibold text-gray-900" :to="{name:'Products'}">Back</RouterLink>
                    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
            </Form>
        </div>
      </div>
    </main>
  </div>
</template>


<style scoped>

</style>
