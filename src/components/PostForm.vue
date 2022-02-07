<template>
  <div>
    <form @submit.prevent>
      <input v-model="post.title" @input="post.title=$event.target.value" class="input" type="text"
             placeholder="Введите текст"/>
      <input v-model="post.body" @input="post.body=$event.target.value" class="input" type="text"
             placeholder="Введите текст"/>
      <MyButton @click="createPost"> Отправить</MyButton>
    </form>
  </div>
</template>
<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {

      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style>

</style>
