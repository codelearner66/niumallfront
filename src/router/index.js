import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'; //直接导入store对象

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: "主页",
            requiresAuth: false
        },
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: "关于",
            requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: "/login",
        name: 'login',
        meta: {
            title: "登录",
            requiresAuth: false
        },
        component: () => import(/*webpackChunkName: "login"*/'../views/login/login')
    },
    {
        path: "/register",
        name: "register",
        meta: {
            title: "注册",
            requiresAuth: false
        },
        component: () => import(/*webpackChunkName: "register"*/'../views/login/register')
    },
    {
      path: '/findPassword',
      name : 'findPassword'  ,
        meta: {
          title: "找回密码",
            requiresAuth: false
        },
        component: ()=>import(/*webpackChunkName: "register"*/'../views/login/findpassword')
    },
    {
        path: "/404",
        name: "404",
        meta: {
            title: "404错误",
            requiresAuth: false
        },
        component: () => import('../views/404')
    },
    {
        path: "/500",
        name: "500",
        meta: {
            title: "500错误",
            requiresAuth: false
        },
        component: () => import('../views/500')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
//前置守卫 没有登陆时 跳转到登录页面
router.beforeEach((to, from, next) => {
    //不需要鉴权的放行
    if (!to.matched.some(record => record.meta.requiresAuth)) {
        next();
    } else {
       let islogin= store.getters.getIsLogin;
        console.log(islogin,"是否登录！")
        if(islogin){
            next();
        }
        // //获取cookie后向后台鉴权
        // let token = Cookies.get('token');
        // if (token !== undefined) {
        //     postRequest('/getUserInfo', {}).then(response => {
        //         console.log("鉴权回调：  ", response)
        //         if (response.code == 200) {
        //
        //         }
        //     })
        // }
         else {
            //访问的是受保护资源或页面 没有登陆跳转到登陆页面
            //并将当前路由的完整路径作为查询参数传给login组件，以便登陆成功后进行页面跳转
            next({
                path: "login",
                query: {redirect: to.fullPath},
            });
        }
    }
})
// 后置守卫 修改页头
router.afterEach((to, from) => {
    document.title = to.meta.title;
})

export default router
