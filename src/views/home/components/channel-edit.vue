<template>
  <div class="channle-edit">
    <van-cell center :border="false">
      <div slot="title">我的频道</div>
      <van-button
        class="channle-btn"
        plain
        hairline
        round
        type="primary"
        size="mini"
        @click="isEdit = !isEdit"
      >
        <span v-text="isEdit ? '完成' : '编辑'"></span>
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(value, index) in userChannels"
        :class="{ active: index === active }"
        :key="index"
        :text="value.name"
        @click="visitChannelClick(value, index)"
      >
        <van-icon
          slot="icon"
          @click="onUserChannelClick(value, index)"
          :name="isEdit && index !== 0 ? 'clear' : ''"
        />
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell center :border="false">
      <div slot="title">推荐频道</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(value, index) in recommendChannels"
        :key="index"
        :text="value.name"
        @click="onAdd(value, index)"
        clickable="true"
      >
        <van-icon slot="icon" :name="isEdit && index >= 0 ? 'add-o' : ''" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannels
} from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'Channle-Edit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  components: {},
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    ...mapState(['user']),
    // 筛选频道列表 全部频道 ——— 我的频道 === 推荐频道
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.userChannels.find((find) => {
          return find.id === channel.id
        })
      })
    }
  },
  watch: {},
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },

    // 添加频道
    async onAdd(channel, index) {
      // 若是编辑状态则 进行频道增删
      if (this.isEdit) {
        this.userChannels.push(channel)
      } else if (!this.isEdit) {
        // 若不是编辑状态则访问频道
        this.visitChannelClick(channel, index)
      }
      // 数据持久化: 若用户登录状态 则发请求保存到先上，若非登录则保存到本地Storage
      if (this.user) {
        await addUserChannels({
          channels: [{ id: channel.id, seq: this.userChannels.length }]
        })
      } else {
        setItem('user-channels', this.userChannels)
      }
    },

    // 删除频道
    async onUserChannelClick(channel, index) {
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)

      // 数据的持久化 判断用户是否登入
      if (this.user) {
        await deleteUserChannels(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },

    // 访问频道
    visitChannelClick(channel, index) {
      if (!this.isEdit) {
        // 切换频道
        this.$emit('update-active', index)
        // 关闭弹出层
        this.$emit('close')
      }
    }
  },
  // 生命周期-创建完成（可以访问当前this实例）
  created() {
    this.loadAllChannels()
  },
  // 生命周期-挂载完成（可以访问DOM元素）
  mounted() {},
  // 生命周期-创建之前
  beforeCreate() {},
  // 生命周期-挂载之前
  beforeMount() {},
  // 生命周期-更新之前
  beforeUpdate() {},
  // 生命周期-更新之后
  updated() {},
  // 生命周期-销毁之前,
  beforeDestroy() {},
  // 生命周期-销毁完成
  activated() {}
}
</script>
<style lang='less' scoped>
.channle-edit {
  padding-top: 54px;
  .van-cell {
    margin-bottom: 0px;
  }
  .van-cell__title {
    font-size: 16px;
    color: #333333;
    font-weight: 600;
  }
  .van-grid {
    margin-bottom: 18px;
    .van-grid-item {
      /deep/.van-grid-item__content {
        width: 80px;
        height: 43px;
        background: #f4f5f6da;
        .van-icon {
          position: absolute;
          font-size: 18px;
          right: -46px;
          top: -18px;
          color: rgba(255, 55, 55, 0.85);
          z-index: 2;
        }
      }
      /deep/.van-grid-item__text {
        font-size: 14px;
        color: #333333;
        margin-top: 0;
      }
    }
    .active {
      /deep/.van-grid-item__content {
        box-sizing: border-box;
        border-bottom: 3px rgba(11, 192, 41, 0.329) solid;
      }
      /deep/.van-grid-item__text {
        color: rgb(11, 192, 41) !important;
      }
    }
  }
  .channle-btn {
    width: 50px;
  }
}
</style>