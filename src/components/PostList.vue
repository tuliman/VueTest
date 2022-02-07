<template>
  <div v-if="posts.length">
    <transition-group name="list">
      <PostItem v-for="post in  posts" :key="post.id" :post="post" @remove="$emit('remove',post)"/>
    </transition-group>
  </div>
  <div v-else>
    Dialogov net
  </div>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>
<style>
.list-complete-item {
  transition: all 2s ease;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
