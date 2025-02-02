import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';
import JobsView from '@/views/Jobs.vue';
import JobsAddView from '@/views/JobsAdd.vue';
import JobView from '@/views/JobView.vue';
import NotFoundView from '@/views/NotFound.vue';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobsView
        },
        {
            path: '/jobs/add',
            name: 'jobs-add',
            component: JobsAddView
        },
        {
            path: '/job/:id',
            name: 'job-view',
            component: JobView
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView
        }
    ]
});

export default router;