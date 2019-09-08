// Copied from https://youtu.be/Vu5QKn24uYs
<template>
  <div>
    <b-container>
      <b-row align-h="center" class="mt-5 recol-6">
        <b-col>
          <b-card class="p-3">
            <h3 class="mb-4">哈工大统一身份认证登录</h3>
            <b-form
              @submit.prevent="onSubmit"
              @reset.prevent="onReset"
              v-if="show"
            >
              <b-form-group
                id="exampleInputGroup1"
                label="学号"
                label-for="exampleInput1"
              >
                <b-form-input
                  id="exampleInput1"
                  type="text"
                  v-model="form.username"
                  required
                  placeholder="1160300625"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="exampleInputGroup2"
                label="密码"
                label-for="exampleInput2"
              >
                <b-form-input
                  id="exampleInput2"
                  type="password"
                  v-model="form.password"
                  required
                  placeholder="输入密码"
                ></b-form-input>
              </b-form-group>

              <div class="d-flex justify-content-between">
                <div class="justify-content-end">
                  <b-button type="submit" variant="primary">登录</b-button
                  >&nbsp;
                  <b-button type="reset" variant="danger">重置</b-button>
                </div>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        bvToast: this.$bvToast
      },
      show: true
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('login', this.form).then(() => {
        this.onReset()
      })
    },
    onReset() {
      /* Reset our form values */
      this.form.username = ''
      this.form.password = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      // after `show` changed, the DOM will update, and then we show the form again
      // https://vuejs.org/v2/api/#Vue-nextTick
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
