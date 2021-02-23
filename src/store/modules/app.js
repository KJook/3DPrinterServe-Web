// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: '我的面板',
      icon: 'mdi-view-dashboard',
      to: '/',
    },
    {
      title: '创建订单',
      icon: 'mdi-form-select',
      to: '/order/',
    },
    {
      title: '我的信息',
      icon: 'mdi-clipboard-outline',
      to: '/profile/',
    },
    {
      title: 'Typography',
      icon: 'mdi-format-font',
      to: '/components/typography/',
    },
    {
      title: 'Icons',
      icon: 'mdi-chart-bubble',
      to: '/components/icons/',
    },
    {
      title: 'Google Maps',
      icon: 'mdi-map-marker',
      to: '/maps/google/',
    },
    {
      title: 'Notifications',
      icon: 'mdi-bell',
      to: '/components/notifications/',
    },
    {
      title: 'Login',
      icon: 'mdi-bell',
      to: '/login/',
    },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
