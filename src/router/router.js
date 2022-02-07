import Main from "@/pages/Main";
import {createRouter, createWebHashHistory} from 'vue-router'
import postsPage from "@/pages/postsPage";
import postPage from "@/components/UI/postPage";

const routes = [
	{
		path: '/',
		component: Main
	},
	{
		path: '/pages',
		component: postsPage
	},
	{
		path: '/pages/:id',
		component: postPage
	}
]
const router = createRouter({routes, history: createWebHashHistory(process.env.BASE_URL)})

export default router;
