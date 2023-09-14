import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: "/lunar",
        children: [
            {
                path: '/lunar',
                name: 'lunar',
                component: () => import('../components/Lunar.vue'),
            },
            {
                path: '/search',
                name: 'search',
                component: () => import('../components/SearchPage.vue'),
            },
            {
                path: '/tool',
                name: 'tool',
                component: () => import('../components/Tool.vue'),
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router