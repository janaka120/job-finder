<script setup>
import { ref, readonly, defineProps, onMounted, reactive } from 'vue';
import JobListing from './JobListing.vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

// const jobs = ref([]);
const state = reactive({
    jobs: [],
    isLoading: true,
})

onMounted(async () => {
    try {
        state.isLoading = true;
        const response = await axios.get('api/jobs');
        state.jobs = response.data;
    } catch (error) {
        console.log("error | loading jobs list >>", error);
    } finally {
        state.isLoading = false;
    }
})
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
                Find Your Next Dev Role
            </h2>
            <div v-if="state.isLoading" class="text-center text-gray-600 py-6">
                <PulseLoader />
            </div>
            <div v-else="!state.isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing v-for="job in state?.jobs.slice(0, limit || jobs?.length)" :key="job.id" :job="job" />
            </div>
        </div>
    </section>
    <section class="m-auto max-w-lg my-10 px-6" v-if="showButton">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View
            All Opportunities</RouterLink>
    </section>
</template>