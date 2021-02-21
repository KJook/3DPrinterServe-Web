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
          cols="6"
        >
          <profile-card
            :title="item.name"
            :value="item.value"
            :icon="item.icon"
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
          cols="4"
        >
          <profile-card
            :title="item.name"
            :value="item.value"
            :icon="item.icon"
          />
        </v-col>
      </v-row>
      <div
        class="mx-auto pb-5 pl-12 pr-12"
      >
        <v-row>
          <v-col cols="5">
            <v-btn
              class="col-6"
              block
            >
              修改
            </v-btn>
          </v-col>
          <v-col cols="2"></v-col>
          <v-col cols="5">
            <v-btn
              class="col-6"
              block
            >
              撤销
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </material-card>
  </v-container>
</template>

<script>
  // import ProfileCard from '@/components/ProfileCard'
  export default {
    name: 'RegularTablesView',
    components: {
      // ProfileCard,
    },
    data: () => ({
      ProfileCardDataList: [
        { name: '邮箱', value: '', icon: 'mdi-email' },
        { name: '昵称', value: '', icon: 'mdi-account' },
      ],
      connectList: [
        { name: '电话', value: '', icon: 'mdi-phone' },
        { name: 'QQ', value: '', icon: 'mdi-penguin' },
        { name: '微信', value: '', icon: 'mdi-wechat' },
      ],
    }),
    beforeCreate () {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login/')
      }
    },
    mounted () {
      this.axios.get('https://cust.club/api/user', {
        headers: { token: localStorage.getItem('token') },
      }).then((response) => {
        console.log(response)
        const data = response.data
        if (data.code === 0) {
          this.ProfileCardDataList[0].value = data.data.email
          this.ProfileCardDataList[1].value = data.data.username
        }
      }).catch((error) => {
        console.log(error)
      })
    },
  }
</script>
