<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';
</script>

<template>
    <Hero title="Find Your Dev Dream Role" subtitle="Explore top Dev jobs and launch your career." />
    <HomeCards />
    <JobListings :limit="3" :showButton="true" />
</template>