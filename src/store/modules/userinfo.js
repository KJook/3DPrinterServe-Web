// Utilities
import { make } from 'vuex-pathify'
import axios from 'axios'
import router from '@/router'
import { Base64 } from 'js-base64'

// Globals

const state = {
  icon: '',
  loading: false,
  wechat: 'loading~',
  qq: 'loading~',
  phone: 'loading~',
  name: 'loading~',
  email: 'loading~',
  bu: '',
}
const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  updateInfo: ({ dispatch }) => {
    const token = localStorage.getItem('token') || null
    if (!token) {
      dispatch('setIcon', 'mdi-login')
      return
    }
    dispatch('setLoading', true)
    return new Promise((resolve) => {
      axios.get('https://cust.club/api/user', {
        headers: { token: localStorage.getItem('token') },
      }).then((response) => {
        const data = response.data
        if (data.code === 0) {
          dispatch('setName', data.data.username)
          dispatch('setEmail', data.data.email)
          dispatch('setBu', data.data.user_id)
          dispatch('setIcon', 'mdi-account-circle')
          axios.post('http://localhost:5000/user/get', {
            token: localStorage.getItem('token'),
            ticket: Base64.encode(((state.bu + 4789) * 7).toString()),
          }).then((response) => {
            const data = response.data
            console.log(data)
            if (data.code === 0) {
              dispatch('setPhone', data.data.phone)
              dispatch('setQq', data.data.qq)
              dispatch('setWechat', data.data.wechat)
            } else {
              dispatch('setPhone', 'failed')
              dispatch('setQq', 'failed')
              dispatch('setWechat', 'failed')
            }
          }).catch(() => {
            dispatch('setPhone', 'error')
            dispatch('setQq', 'error')
            dispatch('setWechat', 'error')
          })
        } else if (data.code === 201001) {
          localStorage.removeItem('token')
          router.push('/login/')
          dispatch('setIcon', 'mdi-account-clock-outline')
        }
        dispatch('setLoading', false)
      }).catch(() => {
        dispatch('setIcon', 'mdi-wifi-strength-alert-outline')
      })
    })
  },
}

const getters = {
  ...make.getters(state),
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
