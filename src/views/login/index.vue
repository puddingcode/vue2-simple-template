<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      ref="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon
        ></span>
        <el-input
          v-model="loginForm.username"
          ref="username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon
        ></span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          ></svg-icon
        ></span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%;margin-bottom:30px"
        @click.native.prevent="handleLogin"
        >Login
      </el-button>
      <div class="tips">
        <span style="margin-right:20px">username:admin</span>
        <span>password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';
import SvgIcon from '@/components/SvgIcon';
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'admin',
        password: 'wwwwww',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit');
          return false;
        }
      });
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
  },
  components: {
    SvgIcon,
  },
};
</script>

<style lang="scss" scoped>
$light_gray: #fff;
$cursor: #fff;
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  input {
    background: transparent;
    border: 0px;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
    caret-color: $cursor;
  }
}
</style>
