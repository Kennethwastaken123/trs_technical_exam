<script setup>
    import { ref } from 'vue';
    import GuestLayout from '../components/GuestLayout.vue';
    import axiosClient from '../axios.js';
    import router from '../router.js';
    import { useUserStore } from '../store/user.js'
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as Yup from "yup";
    import { getCurrentInstance } from 'vue'


    const auth = useUserStore()
    const serverError = ref('');

    const data = ref({
        email: '',
        password: '',
    });

    const { appContext } = getCurrentInstance()
    const toastr = appContext.config.globalProperties.$toastr

    const schema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    });

    async function submit() {
        axiosClient.post("/login", data.value)
        .then(res => {
            auth.setUser(res.data.auth.user)
            auth.setToken(res.data.auth.token)
            router.push({name: 'Home'});
        })
        .catch(err => {
             if (err.response || err.response.status === 401) {
                toastr.error('Invalid email or password!', 'Error')
            } else {
                toastr.error(err.response.data.error, 'Error')
            }
        });
    }
</script>

<template>
    <GuestLayout>
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form  class="space-y-6" @submit="submit"  :validation-schema="schema">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <Field  type="email" name="email" id="email" v-model="data.email" autocomplete="email"  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <ErrorMessage name="email" class="text-red-500 text-sm" />
                </div>

                <div>
                    <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div class="mt-2">
                        <Field  type="password" name="password" id="password" v-model="data.password" autocomplete="current-password"  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <ErrorMessage name="password" class="text-red-500 text-sm" />
                </div>
                <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </Form >

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?
                {{ ' ' }}
                <RouterLink :to="{name:'Register'}" class="font-semibold text-indigo-600 hover:text-indigo-500">
                    Create an account
                </RouterLink>

            </p>
        </div>
    </GuestLayout>
</template>

<style scoped>

</style>
