<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册/登录"
      left-text
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <!-- 1、使用van-form标签包裹表单
            submit 只有验证通过才会调用绑定的事件
     -->
    <van-form
      @submit="onLogin"
      @failed="onFailed"
      validate-first
      ref="login-form"
      :show-error="false"
      :show-error-message="false"
    >
      <van-cell-group>
        <van-field
          name="mobile"
          v-model="user.mobile"
          icon-prefix="xinwen"
          left-icon="shouji"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <van-field
          name="code"
          v-model="user.code"
          clearable
          icon-prefix="xinwen"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          :rules="formRules.code"
        >
          <template #button>
            <van-button
              class="send-btn"
              size="mini"
              :loading="isSendSmsLoding"
              round
              v-if="!showTime"
              @click.prevent="onSendSms"
              >发送验证码</van-button
            >
            <!-- finsh事件 倒计时结束时候的调用 将showTime设置为false -->
            <van-count-down
              @finish="showTime = false"
              v-else
              :time="3 * 1000"
              format="ss s"
            />
          </template>
        </van-field>
      </van-cell-group>
      <!-- 登录按钮 -->
      <div class="login-btn-warp">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      // https://vant-contrib.gitee.io/vant/#/zh-CN/button Button组件的loding API
      isSendSmsLoding: false,
      showTime: false,
      user: {
        mobile: "17090086870",
        code: "246810",
      },
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号码格式错误" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
    };
  },
  methods: {
    async onLogin() {
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      // 4.处理响应结果
      Toast.loading({
        message: "加载中...", // Vant UI登录提示
        forbidClick: true, // 静止背景点击
        duration: 0, // 展示时长(ms)，值为 0 时，toast 不会消失
      });
      try {
        const res = await login(this.user);
        console.log("login-登录成功");
        Toast.success("登录成功"); // 成功提示
        // 将后端返回的用户登录状态 Token 等数据放到 Vuex 容器中
        this.$store.commit("setUser", res.data.data);
        // 登录成功后 回到上一个页面
        this.$router.back();
      } catch (err) {
        console.log(err);
        Toast.fail("登录失败", err); // 失败提示
      }
    },
    onFailed(err) {
      if (err.errors[0]) {
        Toast({
          message: err.errors[0].message,
          position: "top",
        });
      }
    },
    async onSendSms() {
      try {
        await this.$refs["login-form"].validate("mobile");
        const res = await sendSms(this.user.mobile);
        console.log(res);
        this.showTime = true;
        this.isSendSmsLoding = true;
        // 短信成功发送，显示倒计时
      } catch (err) {
        let message = "";
        // try 里任何代码错误都会进入 catch
        if (err && err.response && err.response.status === 429) {
          message = "发送频繁，请稍后再试";
        } else if (err.name === "mobile") {
          message = "手机号码格式错误";
        } else {
          message = "未知错误，请稍后再试";
        }
        Toast({
          message: message,
          position: "top",
        });
        this.isSendSmsLoding = false;
      }
    },
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
