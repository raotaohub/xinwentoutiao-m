<template>
  <div class="login-container">
    <van-nav-bar class="app-nav-bar" title="注册/登录" left-text left-arrow @click-left="$router.back()" />
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field v-model="user.mobile" icon-prefix="xinwen" left-icon="shouji" placeholder="请输入手机号" />
      <van-field v-model="user.code" clearable icon-prefix="xinwen" left-icon="yanzhengma" placeholder="请输入验证码">
        <template #button>
          <van-button class="send-btn" size="mini" round>发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-btn-warp">
      <van-button class="login-btn" type="info" block>登录</van-button>
    </div>
  </div>

</template>

<script>
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
    };
  },
};
</script>

<style scoped lang='less'>

.login-container {
  .login-btn-warp {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .send-btn {
    background: #ededed;
    font-size: 11px;
    width: 76px;
    height: 23px;
    .van-button__text {
      color: #666666;
    }
  }
}
</style>
