<template>
  <div class="app">
    <h1> Для добавление клините на добавить Пост </h1>
    <input v-model="searchQuery" type="text" placeholder="Поиск">
    <div class="app__buttons">
      <MyButton @click="openDialog"> Создать Пост</MyButton>
      <my-select :options="sortOptions" v-model="selectedSort"></my-select>
      <my-dialog :modelValue="dialogVisible">
        <PostForm @create="createPost"/>
      </my-dialog>
      <PostList :posts="searchPost" @remove='removePost'/>
    </div>
    <!--    <div class="page_wrapper">-->
    <!--      <div class="page" v-for="pageNum in total" :key="pageNum" :class="{'current': page===pageNum}"-->
    <!--           @click="changePage(pageNum)"> {{-->
    <!--          pageNum-->
    <!--        }}-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="observer" ref="observer">

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
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      total: 0
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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.posts = response.data
        this.total = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (e) {
        console.log(e)
      }
    },
    async updatePost() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.posts = [...this.posts, ...response.data]
        this.total = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (e) {
        console.log(e)
      }
    },
    // changePage(e) {
    //   this.page = e
    // }
  },
  mounted() {
    this.fetchUsers()

    var options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    var callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.page += 1
        console.log(observer)
        this.updatePost()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
  computed: {
    selectedSortP() {
      let l = []
      if (this.selectedSort.length > 0) {
        l = [...this.posts].sort((p_1, p_2) => {
          return p_1[this.selectedSort]?.localeCompare(p_2[this.selectedSort])
        })
      } else {
        l = [...this.posts]
      }
      return l
    },
    searchPost() {
      return this.selectedSortP.filter(p => p.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // page() {
    //   this.fetchUsers()
    // }
  }
}
</script>

<style>
.app__buttons {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.page_wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
