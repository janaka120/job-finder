<script setup>
import Card from '@/components/Card.vue';
</script>

<template>
    <section class="py-4">
        <div class="container-xl lg:container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                <Card>
                    <h2 class="text-2xl font-bold">Become a Dev Expert</h2>
                    <p class="mt-2 mb-4">
                        Level up your skills and land your dream job.
                    </p>
                    <RouterLink to="/jobs" class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Find Your Next Dev Role
                    </RouterLink>
                </Card>
                <Card bg="bg-blue-100">
                    <h2 class="text-2xl font-bold">Hire Top Dev Talent</h2>
                    <p class="mt-2 mb-4">
                        Find the perfect Dev developer for your team.
                    </p>
                    <RouterLink to="/jobs/add"
                        class="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
                        Add Job
                    </RouterLink>
                </Card>
            </div>
        </div>
    </section>
</template>