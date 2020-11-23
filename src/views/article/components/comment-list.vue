<template>
  <div class="comment-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell><h4 class="text-center" slot="title">全部评论</h4></van-cell>
      <comment-Item
        :item="item"
        v-for="(item, index) in list"
        :key="index"
        @comment-update-popup="$emit('comment-update-popup', $event)"
      >
      </comment-Item>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item'
export default {
  name: 'comment-list',
  props: {
    // 文章ID 或 评论的ID
    source: {
      type: [Number, Object, String],
      required: true
    },
    // 如果获取文章的评论传 a 获取文章评论的评论传 c
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      // 如果设置的默认值 是数组或者对象 需要通过函数返回
      default: () => []
    }
  },
  components: {
    CommentItem
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      // 1. 请求获取数据
      // 2. 把数据放入列表
      // 3. 将本次 loading 关闭
      // 4. 判断是否还有数据
      //      若有  更新或许下一次
      //      若无  则将 finshed 设置为 false
      const { data } = await getComments({
        type: this.type, // toString 转字符串
        source: this.source.toString(), // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        offset: this.offset,
        limit: this.limit
      })

      this.$emit('update-total-count', data.data.total_count)

      const { results } = data.data

      this.list.push(...results)

      console.log(this.list)

      this.loading = false // 关闭本次的 loading
      // 判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
        console.log('还有')
      } else {
        this.finished = true
        console.log('没有了')
      }
    }
  },
  // 生命周期-创建完成（可以访问当前this实例）
  created() {},
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
.comment-container {
  padding: 10px 16px 10px 16px;
  background: #ffffff !important;
}
</style>