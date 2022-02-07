<template>
  <div class="post">
    <div> {{ post.id }}</div>
    <div> {{ post.title }}</div>
    <div> {{ post.body }}</div>
    <div class="post_button">
      <MyButton @click="$emit('remove',post)"> Удалить</MyButton>
    </div>
  </div>
</template>
<script>

export default {
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
