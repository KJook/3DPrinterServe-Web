<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        :loading="loading"
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      flat
      nav
    >
      <template>
        <app-bar-item>
          <v-list-item-title
            @click="logOut"
            v-text="profile.title"
          />
        </app-bar-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  import { get, call } from 'vuex-pathify'

  export default {
    name: 'DefaultAccount',
    data: () => ({
      profile: { title: 'Log out' },
    }),
    computed: {
      icon: get('userinfo/icon'),
      loading: get('userinfo/loading'),
    },
    mounted () {
      this.updateInfo()
    },
    methods: {
      ...call('userinfo/*'),
      logOut () {
      },
    },
  }
</script>
