import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '@/router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    gradeData: {}
  },
  mutations: {
    SET_USER(state, { username, password }) {
      state.user = {
        username,
        password
      }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    SET_GRADE_DATA(state, gradeData) {
      state.gradeData = gradeData
    }
  },
  actions: {
    async getGrade({ commit, state }, { username, password, bvToast }) {
      try {
        const res = await axios.post('/api/grade', {
          username: username || state.user.username,
          password: password || state.user.password
        })
        console.log(res)
        commit('SET_GRADE_DATA', res.data)
        // bvToast.toast(`用户 ${username || state.user.username} 成绩获取成功`, {
        //   title: `成绩获取成功`,
        //   variant: 'success',
        //   solid: true
        // })
      } catch (err) {
        console.log(err)
        bvToast.toast(err.message || JSON.stringify(err), {
          title: `成绩获取失败`,
          variant: 'danger',
          solid: true
        })
      }
    },
    async login({ commit }, { username, password, bvToast }) {
      try {
        commit('SET_USER', { username, password })

        // bvToast.toast(`用户 ${username} 登录成功`, {
        //   title: `登录成功`,
        //   variant: 'success',
        //   solid: true
        // })
        setTimeout(() => {
          router.replace('/')
        }, 1000)
      } catch (err) {
        console.log(err)
        bvToast.toast(err.message || JSON.stringify(err), {
          title: `登录失败`,
          variant: 'danger',
          solid: true
        })
      }
    },

    logout({ commit }) {
      // remove user from local storage to log user out
      localStorage.removeItem('user')
      commit('SET_USER', {})

      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }
  }
})
