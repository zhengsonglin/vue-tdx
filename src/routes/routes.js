export default [
    { path: "/page1", exact: true, name: "Page1", component: () => import('./page1/Index'), models: () => [import('../models/page1')] },
    { path: "/testLife", exact: true, name: "TestLife", component: () => import('./testDemo/testLife') },
    { path: "/testDemo", exact: true, name: "TestDemo", component: () => import('./testDemo/testDemo') },
    { path: "/login", exact: true, name: "Login", component: () => import('./login/Login'), models: () => [import('../models/login')] },
    { path: "/register", exact: true, name: "Register", component: () => import('./register/register'), models: () => [import('../models/login')] },
    { path: "/forgetPwd", exact: true, name: "ForgetPwd", component: () => import('./forgetPwd/forget'), models: () => [import('../models/login')] },
    { path: "/home",  name:"Home", component: () => import('./home/layout/layout'), models: () => [import('../models/home')], //redirect: '/home/index',
        routes: [
            {path: '/home/product', exact: true, name:"Product", component: () => import('./home/product/product'),models: () => [],},
            {path: '/home/question', exact: true, name:"Question", component: () => import('./home/question/question'),models: () => [],},
            {path: '/home/order', exact: true, name:"Order",  component: () => import('./home/order/order'),models: () => [],},
            {path: '/home/setting', exact: true, name:"Seting", component: () => import('./home/userCenter/setting'),models: () => [],},
        ]
    },
]