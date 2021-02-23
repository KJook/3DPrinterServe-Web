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
      class="font-weight-bold black--text"
    >
      {{ staticValue }}
    </v-card-text>
    <v-card-text
      v-else
      class="font-weight-bold"
    >
      <v-text-field
        ref="form"
        v-model="trueValue"
        :rules="rules"
        @change="showUpload"
      />
    </v-card-text>
    <v-card-actions
      v-show="changed"
    >
      <v-btn
        :loading="loading"
        color="accent"
        text
        @click="save"
      >
        保存
      </v-btn>

      <v-btn
        :disabled="loading"
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
  import { call, get } from 'vuex-pathify'
  import { Base64 } from 'js-base64'

  export default {
    name: 'ProfileCard',
    props: {
      vKey: String,
      isChangeable: Boolean,
      title: String,
      icon: String,
      rules: Array,
    },
    data () {
      return {
        trueValue: '',
        changed: false,
        loading: false,
      }
    },
    computed: {
      staticValue () {
        return this.$store.getters['userinfo/' + this.vKey]
      },
    },
    watch: {
      staticValue: function () {
        this.trueValue = this.staticValue
      },
    },
    mounted () {
      this.trueValue = this.staticValue
    },
    methods: {
      showUpload () {
        this.changed = !!this.$refs.form.validate()
      },
      cancel () {
        this.trueValue = this.staticValue
        this.changed = false
      },
      save () {
        this.loading = true
        const token = localStorage.getItem('token')
        const data = {
          token: token,
          options: this.icon,
          r: Base64.encode(this.staticValue),
          u: Base64.encode(this.trueValue),
        }
        this.axios.post('http://localhost:5000/user/update', data)
          .then((response) => {
            const data = response.data
            if (data.code === 0) {
              this.$store.dispatch('userinfo/updateInfo')
              this.changed = false
            } else {
              this.trueValue = this.staticValue
            }
            this.loading = false
          }).catch((error) => {
            console.log(error)
            this.trueValue = this.staticValue
            this.loading = false
          })
      },
    },
  }
</script>

<style scoped>

</style>
