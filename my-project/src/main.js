import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory, useRouter } from 'vue-router'
import { usePocketBase } from './composables/usePocketBase';
import HomePage from './views/HomePage.vue'
import CreateAccountPage from './views/CreateAccountPage.vue'
import LoginPage from './views/LoginPage.vue'
import RequestChangePasswordPage from './views/RequestChangePasswordPage.vue'

const router = createRouter( {
    history : createWebHistory(),
    routes : [
        { path: '/', redirect: "/home" },
        { path: '/home', component: HomePage, meta: { reqAuth: true } },
        { path: '/create-account', component: CreateAccountPage },
        { path: '/login', component: LoginPage },
        { 
            path: '/request-change-password', 
            component: RequestChangePasswordPage 
        },
    ]
});

router.beforeEach((to, from, next) => {

    const pb = usePocketBase();
    const router = useRouter();


    if (to.meta?.reqAuth && !pb.value.authStore.isValid) {
        router.replace("/login");
    } else {
        next();
    }
});

const app = createApp(App);
app.use(router).mount('#app')
