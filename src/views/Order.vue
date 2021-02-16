<template>
  <v-container
    id="user-profile-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <material-card
          color="primary"
          icon="mdi-account-outline"
        >
          <template #title>
            编辑信息 — <small class="text-body-1">完善订单信息</small>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>

                <v-col cols="12">
                  <v-text-field
                    color="purple"
                    label="为要打印的物品取一个名字吧"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="City"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Country"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Postal Code"
                    type="number"
                  />
                </v-col>



                <v-col cols="6">
                  <v-overflow-btn
                    dense
                    :items="color"
                    label="选择颜色"
                    item-value="text"
                  ></v-overflow-btn>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-text-field
                    color="purple"
                    label="选择数量"
                    type="number"
                    value="1"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    color="purple"
                    label="备注"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="primary"
                    min-width="150"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <app-card class="mt-4 text-center">

          <v-card-text class="text-center">
            <h6 class="text-h6 mb-2 text--secondary">
              3d预览框
            </h6>
          </v-card-text>
          <v-col
            cols="12"
          >
            <model-stl
              :src="stlUrl"
              :rotation="rotation"
              @on-load="onLoad"
            ></model-stl>
          </v-col>
          <v-file-input
            label="点击上传你的3d-STL文件"
            outlined
            dense
          ></v-file-input>

        </app-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { ModelStl } from 'vue-3d-model'
  export default {
    name: 'OrderView',
    data: () => ({
      rotation: {
        x: -Math.PI / 2,
        y: 0,
        z: 0,
      },
      stlUrl: 'https://wow.techbrood.com/uploads/141201/stl/binary/pr2_head_pan.stl',
      color: [
        { text: '颜色' },
        { text: '75%' },
        { text: '50%' },
        { text: '25%' },
        { text: '0%' },
      ],
    }),
    methods: {
      onLoad () {
        this.rotate();
      },
      rotate () {
        this.rotation.z += 0.01;
        requestAnimationFrame( this.rotate );
      }
    },
    components: {
      ModelStl,
    },
  }
</script>
