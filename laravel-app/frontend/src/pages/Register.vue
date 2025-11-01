<script setup>
    import { ref } from 'vue';
    import GuestLayout from '../components/GuestLayout.vue';
    import axiosClient from '../axios.js';
    import { useUserStore } from '../store/user.js'
    import router from '../router.js';
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as Yup from "yup";
    import { getCurrentInstance } from 'vue'

    const auth = useUserStore()
    const serverError = ref('');

    const { appContext } = getCurrentInstance()
    const toastr = appContext.config.globalProperties.$toastr

    const data = ref({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const schema = Yup.object({
        name: Yup.string().required("Name is required").max(255, "Name must be less than 255 characters"),
        email: Yup.string().required("Email is required").email("Invalid email address"),
        password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
        password_confirmation: Yup.string().required("Please confirm your password").oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    async function submit() {
        axiosClient.post("/register", data.value)
        .then(res => {

            auth.setUser(res.data.auth.user)
            auth.setToken(res.data.auth.token)
            router.push({name: 'Home'});
        })
        .catch(err => {
            if (err.response.status === 401) {
                toastr.error('The email has already been taken', 'Error')
            } else {
                toastr.error(err.response.data.message, 'Error')
            }
        });
    }
</script>

<template>
  <GuestLayout>
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create New Account</h2>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form class="space-y-4" @submit="submit" :validation-schema="schema">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
                    <div class="mt-2">
                        <Field name="name" id="name" required="" v-model="data.name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <ErrorMessage name="name" class="text-red-500 text-sm" />
                </div>
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <Field type="email" name="email" id="email" v-model="data.email" autocomplete="email" required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <ErrorMessage name="email" class="text-red-500 text-sm" />
                </div>
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div class="mt-2">
                        <Field type="password" name="password" id="password" required="" v-model="data.password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <ErrorMessage name="password" class="text-red-500 text-sm" />
                </div>
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Confirmation Password</label>
                    <div class="mt-2">
                        <Field type="password" name="password_confirmation" id="password_confirmation" v-model="data.password_confirmation" required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <ErrorMessage name="password_confirmation" class="text-red-500 text-sm" />
                </div>
                <p v-if="serverError" class="text-red-600 text-sm text-center">
                    {{ serverError }}
                </p>
                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create an Account</button>
                </div>
                <p class="mt-10 text-center text-sm/6 text-gray-500">
                    Already have an account?
                    {{ ' ' }}
                    <RouterLink :to="{name:'Login'}" class="font-semibold text-indigo-600 hover:text-indigo-500">
                        Login from here
                    </RouterLink>

                </p>
            </Form>
        </div>
 </GuestLayout>
</template>

<style scoped>

</style>
