<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        v-for="({ actionIcon, actionText, ...attrs }, i) in stats"
        :key="i"
        cols="12"
        md="6"
        lg="3"
      >
        <material-stat-card v-bind="attrs">
          <template #actions>
            <v-icon
              class="mr-2"
              small
              v-text="actionIcon"
            />
            <div class="text-truncate">
              {{ actionText }}
            </div>
          </template>
        </material-stat-card>
      </v-col>

      <v-col
        cols="12"
        md="12"
      >
        <material-card
          color="orange"
          full-header
        >
          <template #heading>
            <div class="pa-8 white--text">
              <div class="text-h4 font-weight-light">
                Employees Stats
              </div>
              <div class="text-caption">
                New employees on 15th September, 2016
              </div>
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    name: 'DashboardView',

    data: () => ({
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id',
        },
        {
          sortable: false,
          text: 'Name',
          value: 'name',
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right',
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country',
          align: 'right',
        },
        {
          sortable: false,
          text: 'City',
          value: 'city',
          align: 'right',
        },
      ],
      items: [
        {
          id: 1,
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738',
        },
      ],
      stats: [
        {
          actionIcon: 'mdi-tag',
          actionText: '所有订单数的总和啦...',
          color: '#FD9A13',
          icon: 'mdi-buffer',
          title: '订单总数',
          value: '184',
        },
        {
          actionIcon: 'mdi-tag',
          actionText: '这些订单还没有被处理',
          color: 'primary',
          icon: 'mdi-chart-bar',
          title: '未处理',
          value: '75.521',
        },
        {
          actionIcon: 'mdi-tag',
          actionText: '这些订单已经被处理了,可能正在打印中哦',
          color: 'success',
          icon: 'mdi-store',
          title: '已处理',
          value: '',
        },
        {
          actionIcon: 'mdi-tag',
          actionText: '这些订单已经完成了,等待收货',
          color: 'info',
          icon: 'mdi-baby-buggy',
          title: '待收货',
          value: '+245',
        },
      ],
    }),

    computed: {
      sales: get('sales/sales'),
      totalSales () {
        return this.sales.reduce((acc, val) => acc + val.salesInM, 0)
      },
    },
  }
</script>
