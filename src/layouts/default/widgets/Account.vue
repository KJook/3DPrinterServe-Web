<template>
  <v-menu
    v-if="isShow"
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
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
  export default {
    name: 'DefaultAccount',
    data: () => ({
      profile: { title: 'Log out' },
    }),
    methods: {
      logOut () {
        console.log('ok')
        localStorage.removeItem('token')
        this.$router.push('/login/')
      },
    },
  }
</script>
