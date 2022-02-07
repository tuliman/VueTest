<template>
  <div v-if="posts.length">
    <PostItem v-for="post in  posts" :key="post.id" :post="post" @remove="$emit('remove',post)"/>
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

</style>
