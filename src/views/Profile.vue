<template>
  <v-container
    id="profile-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="我的信息"
    />
    <material-card
      icon="mdi-clipboard-text"
      icon-small
      title="基础资料"
      color="accent"
    >
      <v-row
        class="mr-2 ml-2 pb-5"
      >
        <v-col
          v-for="(item,index) in ProfileCardDataList"
          :key="index"
          cols="12"
          sm="6"
        >
          <profile-card
            :vKey="item.key"
            :title="item.name"
            :icon="item.icon"
            :is-changeable="true"
            :rules="[]"
          />
        </v-col>
      </v-row>
    </material-card>
    <div
      class="mt-12 mb-12"
    >
    </div>
    <material-card
      icon="mdi-clipboard-text"
      icon-small
      title="联系方式"
      color="accent"
    >
      <v-row
        class="mr-2 ml-2 pb-5"
      >
        <v-col
          v-for="(item,index) in connectList"
          :key="index"
          cols="12"
          md="4"
          sm="6"
        >
          <profile-card
            :vKey="item.key"
            :title="item.name"
            :icon="item.icon"
            :is-changeable="false"
            :rules="item.rules"
          />
        </v-col>
      </v-row>
    </material-card>
  </v-container>
</template>

<script>
  // import ProfileCard from '@/components/ProfileCard'
  import { get } from 'vuex-pathify'

  export default {
    name: 'ProfileView',
    components: {
      // ProfileCard,
    },
    data: () => ({
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        phone: value => value.length <= 11 || 'Max 11 numbers',
        qq: value => value.length <= 10 || 'Max 10 numbers',
        wechat: value => value.length <= 10 || 'Max 18 numbers',
      },
      ProfileCardDataList: [
        { name: '邮箱', key: 'email', icon: 'mdi-email' },
        { name: '昵称', key: 'name', icon: 'mdi-account' },
      ],
      connectList: [
        { name: '电话', key: 'phone', icon: 'mdi-phone', rules: [value => value.length <= 11 || 'Max 11 numbers'] },
        { name: 'QQ', key: 'qq', icon: 'mdi-qqchat', rules: [value => value.length <= 10 || 'Max 10 numbers'] },
        { name: '微信', key: 'wechat', icon: 'mdi-wechat', rules: [value => value.length <= 10 || 'Max 18 char'] },
      ],
    }),
  }
</script>
