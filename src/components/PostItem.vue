<template>
  <div class="post">
    <div> {{ post.id }}</div>
    <div> {{ post.title }}</div>
    <div> {{ post.body }}</div>
    <div class="post_button">
      <MyButton @click="$emit('remove',post)"> Удалить</MyButton>
      <my-button @click="$router.push(`/pages/${post.id}`)"> Перейти к посту</my-button>
    </div>
  </div>
</template>
<script>

import MyButton from "@/components/UI/MyButton";

export default {
  components: {MyButton},
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.post {
  border: groove 1em
}
</style>
