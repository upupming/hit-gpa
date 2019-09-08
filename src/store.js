import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '@/router'
import axios from 'axios'

Vue.use(Vuex)

function getAxiosErrMsg(err) {
  if (err.response) {
    // Request made and server responded
    console.log(err.response.data)
    console.log(err.response.status)
    console.log(err.response.headers)
    return err.response.data
  } else if (err.request) {
    // The request was made but no response was received
    console.log(err.request)
    return err.request
  } else {
    // Something happened in setting up the request that triggered an err
    console.log('err', err.message)
    return err.message
  }
}

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    gradeData: {}
  },
  mutations: {
    INIT_GRADE_DATA(state) {
      state.gradeData = []
    },
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
    async getGrade(
      { commit, state, dispatch },
      { username, password, bvToast }
    ) {
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
        let msg = getAxiosErrMsg(err)
        if (
          msg ===
          `用户名或者密码错误，
        如果确认无误，可能是因为需要输入验证码，
        暂未实现验证码输入功能。`
        ) {
          dispatch('logout')
          msg += '\n 可前往 jwes.hit.edu.cn 手动输入验证码登陆一次再返回使用。'
        }
        bvToast.toast(msg, {
          title: `成绩获取失败`,
          variant: 'danger',
          solid: true
        })
      }
    },
    async login({ commit }, { username, password, bvToast }) {
      try {
        commit('INIT_GRADE_DATA')
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
