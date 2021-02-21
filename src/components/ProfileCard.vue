<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        {{ icon }}
      </v-icon>
      <span class="title font-weight-light">{{ title }}</span>
    </v-card-title>

    <v-card-text
      v-if="isChangeable"
      class="font-weight-bold"
    >
    </v-card-text>
    <v-card-text
      v-else
      class="font-weight-bold"
    >
      <v-text-field
        v-model="trueValue"
        @change="showUpload"
      ></v-text-field>
    </v-card-text>
    <v-card-actions
      v-show="changed"
    >
      <v-btn
        color="accent"
        text
        @click="save"
      >
        保存
      </v-btn>

      <v-btn
        color="accent"
        text
        @click="cancel"
      >
        取消
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { Base64 } from 'js-base64'

  export default {
    name: 'ProfileCard',
    props: {
      isChangeable: Boolean,
      title: String,
      value: String,
      icon: String,
    },
    data () {
      return {
        trueValue: '',
        changed: false,
        loading: false,
      }
    },
    watch: {
      value () {
        this.trueValue = this.value
      },
    },
    methods: {
      showUpload () {
        this.changed = true
      },
      cancel () {
        this.trueValue = this.value
        this.changed = false
      },
      save () {
        const token = localStorage.getItem('token')
        const data = {
          token: token,
          options: this.icon,
          r: Base64.encode(this.value),
          u: Base64.encode(this.trueValue),
        }
        this.axios.post()
      },
    },
  }
</script>

<style scoped>

</style>
