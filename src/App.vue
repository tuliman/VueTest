<template>
  <div class="app">
    <h1> Для добавление клините на добавить Пост </h1>
    <div class="app__buttons">
      <MyButton @click="openDialog"> Создать Пост</MyButton>
      <my-select :options="sortOptions" v-model="selectedSort"></my-select>
      <my-dialog :modelValue="dialogVisible">
        <PostForm @create="createPost"/>
      </my-dialog>
      <PostList :posts="posts" @remove='removePost'/>
      <div v-for="doctor in doctors" :key="doctor.id">
        <h1>{{ doctor.name }}</h1>
        <h1>{{ doctor.in_progres }}</h1>
        <h1>{{ doctor.complete }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog";
import axios from "axios";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";

export default {
  components: {
    MySelect,
    MyButton,
    MyDialog,
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      selectedSort: '',
      sortOptions: [{value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ]
    }
  },
  methods: {
    createPost(post) {
      post['id'] = Date.now()
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    openDialog() {
      this.dialogVisible = true
    },
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        this.posts = response.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.fetchUsers()
  },
  
  watch: {
    selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[newValue]?.localeCompare(post2[newValue])
      })
    }
  }
}
</script>

<style>
.app__buttons {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
