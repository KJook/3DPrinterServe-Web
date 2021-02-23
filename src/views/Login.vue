<template>
  <v-container
    id="icons-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Sign In"
    />

    <material-card
      icon-small
      class="mx-auto"
      max-width="600"
      icon="mdi-account"
      title="使用cust.club账号来登录"
      color="accent"
    >
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-container class="py-0">
          <v-row
            class="ma-8"
          >
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="formValue.email"
                :rules="[rules.required,]"
                label="邮箱或用户名"
                outlined
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formValue.password"
                :error-messages="error.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                :rules="[rules.required]"
                label="密码"
                outlined
                counter
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col
              v-if="hasPicCode"
              cols="12"
              sm="4"
            >
              <v-img
                :src="picSource"
                @click="refreshCode"
              >
              </v-img>
            </v-col>
            <v-col
              v-if="hasPicCode"
              cols="12"
              sm="8"
            >
              <v-text-field
                v-model="formValue.code"
                :error-messages="error.code"
                :rules="[rules.required,]"
                refs="code"
                type="text"
                label="图形验证码"
                outlined
              />
            </v-col>
            <v-col
              class="mb-10 text-center"
              cols="12"
            >
              <v-btn
                min-width="150"
                :color="btn.color"
                :loading="btn.onLoading"
                :disable="btn.onLoading"
                @click="login"
              >
                提交订单
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </material-card>
    <v-snackbar
      v-model="snackbar.enable"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  import sha1 from 'sha1'
  import { get, call } from 'vuex-pathify'
  export default {
    name: 'LoginView',
    data: () => ({
      btn: {
        onLoading: false,
        color: 'accent',
      },
      snackbar: {
        enable: false,
        text: '网络出错啦',
        timeout: 2000,
      },
      valid: true,
      hasPicCode: false,
      picSource: '',
      picToken: '',
      formValue: {
        email: '',
        password: '',
        code: '',
      },
      error: {
        password: '',
        code: '',
      },
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        counter: value => value.length <= 20 || 'Max 20 characters',
        min: value => value.length >= 8 || 'At least 20 characters',
      },
      showPassword: false,
    }),
    methods: {
      login () {
        if (!this.$refs.form.validate()) {
          this.$refs.form.resetValidation()
          return
        }
        this.btn.onLoading = true
        const data = {
          name: this.formValue.email,
          password: sha1(this.formValue.password),
        }
        if (this.hasPicCode) {
          data.captcha_token = this.picToken
          data.captcha_code = this.formValue.code
        }
        this.axios.post('https://cust.club/api/tokens', data)
          .then((response) => {
            console.log(response)
            const data = response.data
            if (data.code === 200001) {
              const errors = data.errors
              if (Object.prototype.hasOwnProperty.call(errors, 'captcha_code')) {
                this.error.code = errors.captcha_code
                this.formValue.code = ''
              } else {
                this.error.code = ''
              }

              if (Object.prototype.hasOwnProperty.call(errors, 'password')) {
                this.error.password = errors.password
                this.formValue.password = ''
              } else {
                this.error.code = ''
              }
            } else if (data.code === 0) {
              localStorage.setItem('token', data.data.token)
              console.log('set')
              this.updateInfo()
              this.$router.push('/')
            }
            if (Object.prototype.hasOwnProperty.call(data, 'captcha_image')) {
              this.picSource = data.captcha_image
              this.picToken = data.captcha_token
              this.hasPicCode = true
            }
            this.btn.onLoading = false
          })
          .catch((error) => {
            this.btn.onLoading = false
            this.snackbar.enable = true
            console.log(error)
          })
      },
      ...call('userinfo/*'),
      refreshCode () {
        this.axios.post('https://cust.club/api/captchas')
          .then((response) => {
            const data = response.data
            if (data.code === 0) {
              this.picSource = data.data.captcha_image
              this.picToken = data.data.captcha_token
              this.hasPicCode = true
            }
          }).catch((error) => {
            console.log(error)
            this.snackbar.enable = true
          })
      },
    },
  }
</script>
