<script setup>
import logo from '@/assets/img/app-logo.jpeg';
import { RouterLink, useRoute } from 'vue-router';

const isActiveLink = (path) => {
    const route = useRoute();
    return route.path === path;
}
</script>

<template>
    <nav class="bg-blue-700 border-b border-blue-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
                        <img class="h-10 w-auto" :src="logo" alt="SkillScout" />
                        <span class="hidden md:block text-white text-2xl font-bold ml-2">SkillScout</span>
                    </RouterLink>
                    <div class="md:ml-auto">
                        <div class="flex space-x-2">
                            <RouterLink to="/"
                                :class="[isActiveLink('/') ? 'bg-blue-900' : 'hover:bg-gray-900', 'text-white hover:text-white', 'rounded-md', 'px-3', 'py-2']">Home</RouterLink>
                            <RouterLink to="/jobs"
                                :class="[isActiveLink('/jobs') ? 'bg-blue-900' : 'hover:bg-gray-900', 'text-white hover:text-white', 'rounded-md', 'px-3', 'py-2']">Jobs</RouterLink>
                            <RouterLink to="/jobs/add"
                                :class="[isActiveLink('/jobs/add') ? 'bg-blue-900' : 'hover:bg-gray-900', 'text-white hover:text-white', 'rounded-md', 'px-3', 'py-2']">Add Job</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>