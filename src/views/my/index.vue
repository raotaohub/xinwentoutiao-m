<template>
  <div class="my-container">
    <van-cell-group
      v-if="!user"
      class="not-login"
      @click="$router.push('/login')"
    >
      <img src="./shouji.png" alt="" srcset="" />
      <div class="text">登录/注册</div>
    </van-cell-group>
    <van-cell-group v-else class="my-info">
      <van-cell class="base-info" center :border="false">
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{ currentUser.intro }}</div>
        <van-button
          class="set-btn"
          round
          size="small"
          slot="right-icon"
          right-icon
          type="default"
          >编辑资料</van-button
        >
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item" text="文字">
          <div class="count">{{ currentUser.art_count }}</div>
          <div class="text">头条</div>
        </van-grid-item>
        <van-grid-item class="data-info-item" text="文字">
          <div class="count">{{ currentUser.follow_count }}</div>
          <div class="text">关注</div>
        </van-grid-item>
        <van-grid-item class="data-info-item" text="文字">
          <div class="count">{{ currentUser.fans_count }}</div>
          <div class="text">粉丝</div>
        </van-grid-item>
        <van-grid-item class="data-info-item" text="文字">
          <div class="count">{{ currentUser.like_count }}</div>
          <div class="text">获赞</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="xinwen"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="xinwen"
        icon="lishi"
        text="浏览历史"
      />
    </van-grid>
    <van-cell class="mb-4" title="消息通知" is-link url="" />
    <van-cell class="mb-4" title="小智同学" is-link to="" />
    <van-cell class="mb-4" title="我的频道" is-link to="" />
    <van-cell
      @click="outLogin"
      class="text-center"
      v-if="user"
      title="退出登录"
      style="color: #d86262"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user.js'
export default {
  name: 'My',
  data() {
    return {
      currentUser: {},
    }
  },
  created() {
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser() {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    },
    // 退出登录
    outLogin() {
      this.$dialog
        .confirm({
          title: '退出账号提示',
          message: '确认退出吗？',
        })
        .then(() => {
          // 清除用户登录信息
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style scoped lang="less">
.my-container {
  .not-login {
    height: 180px;
    background: url('./banner.png') no-repeat !important;
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      height: 66px;
      width: 66px;
    }
    .text {
      margin: 5px 0 0 0;
      font-size: 14px;
      color: #ffffff;
    }
  }
  .my-info {
    background: url('./banner.png') no-repeat !important;
    background-size: cover;
    height: 180px;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        height: 66px;
        width: 66px;
        margin-right: 11px;
        box-sizing: border-box;
        border: 1px solid #ffffff;
      }
      .name {
        font-size: 15px;
        color: #ffffff;
      }
      .set-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    /deep/.van-grid-item__content {
      background-color: unset;
    }
  }
  .data-info {
    .data-info-item {
      text-align: center;
      height: 65px;
      color: #ffffff;
      .count {
        font-size: 18px;
      }
      .text {
        font-size: 11px;
      }
    }
  }
  /deep/.nav-grid {
    .nav-grid-item {
      height: 70px;
      .xinwen {
        font-size: 22px !important;
      }
      .xinwen-shoucang {
        color: #e40f0f !important;
      }
      .xinwen-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 13px;
      }
    }
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
