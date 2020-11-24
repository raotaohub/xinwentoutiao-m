<template>
  <div class="user-chat">
    <van-nav-bar
      title="QQ小冰"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <van-list
      class="messageList"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
    <!-- 底部发送按钮 -->
    <van-cell-group class="sendMessage">
      <van-field v-model="message" placeholder="请输入消息" :border="false" />
      <van-button type="primary">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script >
// 引入 socket.io-client
import io from 'socket.io-client'

// 建立连接
const socket = io('http://ttapi.research.itcast.cn')

socket.on('connect', function () {
  console.log('建立连接成功！！！')
})
socket.on('event', function (data) {})
socket.on('disconnect', function () {
  console.log('断开连接')
})
export default {
  name: 'UserChat',
  props: {},
  components: {},
  data() {
    return {
      message: '',
      list: [],
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true
        }
      }, 1000)
    }
  },
  beforeCreate() {},
  // 生命周期-创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {},
  // 生命周期-挂载完成（可以访问DOM元素）
  mounted() {},
  beforeUpdate() {},
  // 生命周期-更新之后
  updated() {},
  // keep-alive组件激活时
  activated() {},
  // keep-alive组件停用时
  deactivated() {},
  // 生命周期-销毁之前,
  beforeDestroy() {},
  // 生命周期-销毁完成
  destroyed() {}
}
</script>
<style lang='less' scoped>
/* @import url(); 引入公共css类 */
.user-chat {
  .app-nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
  .messageList {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 60px;
    top: 50px;
    overflow-y: auto;
  }
  .sendMessage {
    display: flex;
    padding: 10px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>