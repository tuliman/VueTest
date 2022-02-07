<template>
  <div class="post">
    <div> {{ post.title }}</div>
    <div> {{ post.body }}</div>
    <div class="post_button">
      <MyButton> Изменить</MyButton>
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
