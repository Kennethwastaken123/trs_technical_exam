// src/store/user.js
import { defineStore } from 'pinia'
import axiosClient from '../axios'
import router from '../router.js'


export const useUserStore = defineStore('auth', {//store jwt auth from api
  state: () => ({
    user: null,
    token: localStorage.getItem('TOKEN') || null,
  }),

  actions: {
    setUser(user) {
      this.user = user
    },
    setToken(token) {
      this.token = token
      localStorage.setItem('TOKEN', token)
    },
    async logout() {
        try {
          await axiosClient.post('/logout', {}, {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          })
        } catch (error) {
          console.error('Logout failed:', error.response?.data || error)
        }

        this.user = null
        this.token = null
        localStorage.removeItem('TOKEN')

        router.push({ name: 'Login' })
      }
  },
})
