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
        path: "/Category/:pid",
        name: 'Category',
        meta: {
            title: '商品分类',
            requiresAuth: false
        },
        component: () => import('../views/goodsList/CategoryGoods')
    },
    {
        path: "/goods/:key",
        name: "goodsByKey",
        meta: {
            title: '搜索商品',
            requiresAuth: false
        },
        component: () => import('../views/goodsList/CategoryGoodsByKey')
    },
    {
        path: '/goodsDetails/:id',
        name: 'goodsDetails',
        meta: {
            title: "商品详情",
            requiresAuth: true
        },
        component: () => import('../views/goods/goodsDetails')
    },
    {
        path: '/shopCartList',
        name: 'shopCartList',
        meta: {
            title: '购物车',
            requiresAuth: true
        },
        component: () => import('../views/shopCart/shopCartList')
    },
    {
        path: '/myInfo',
        name: 'myInfo',
        meta: {
            title: '我的信息',
            requiresAuth: true
        },
        component: () => import('../views/myInfo/myInfo')
    },
    {
        path: '/myOrders',
        name: 'myOrders',
        meta: {
            title: '我的订单',
            requiresAuth: true
        },
        component: () => import('../views/order/myOrders')
    },
    {
        path: '/myOrders-01',
        name: 'myOrders-01',
        meta: {
            title: '我的订单-01',
            requiresAuth: true
        },
        component: () => import('../components/order-01')
    },
    {
        path: "/login",
        name: 'login',
        meta: {
            title: "登录",
            requiresAuth: false
        },
        component: () => import('../views/login/login')
    },
    {
        path: "/message",
        name: 'message',
        meta: {
            title: "信息",
            requiresAuth: true
        },
        component: () => import('../views/message/userChat')
    },
    {
        path: "/success",
        name: 'success',
        meta: {
            title: "支付成功",
            requiresAuth: false
        },
        component: () => import('../views/goods/success')
    },
    {
        path: "/register",
        name: "register",
        meta: {
            title: "注册",
            requiresAuth: false
        },
        component: () => import('../views/login/register')
    },
    {
        path: '/findPassword',
      name : 'findPassword'  ,
        meta: {
          title: "找回密码",
            requiresAuth: false
        },
        component: () => import('../views/login/findpassword')
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
        path: "/userComment",
        name: "userComment",
        meta: {
            title: "评论",
            requiresAuth: true
        },
        component: () => import('../views/comments/userComment.vue')
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
        //console.log(islogin,"是否登录！")
        if(islogin){
            next();
        }
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
    window.scrollTo(0, 0)
})

export default router
