import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/Lunar.vue'),
        children: [
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