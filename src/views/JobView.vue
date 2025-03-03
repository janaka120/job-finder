<script setup>
import { reactive, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import BackButton from '@/components/BackButton.vue';
import { useToast } from "vue-toastification";

const route = useRoute();
const jobId = route.params.id;
const router = useRouter();

const state = reactive({
    job: {},
    isLoading: true,
});

// Get toast interface
const toast = useToast();

onMounted(async () => {
    try {
        const res = await axios.get(`api/jobs/${jobId}`);
        state.job = res.data;
    } catch (error) {
        console.log("Fetch job details >>>>", error);
    } finally {
        state.isLoading = false;
    }
})

const onDeleteHandler = async () => {
    try{
        const res = await axios.post(`api/jobs/delete/${jobId}`);
        toast.success('Job deleted successfully');
        router.go(-1);
    }catch(error) {
        console.log("Error delete Job:", error);
        toast.error('Unsuccessful delete Job');
    }

}

</script>

<template>
    <BackButton />
    <section v-if="!state.isLoading" class="bg-blue-50">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 w-full gap-6">
                <main class="lg:col-span-2">
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-600 mb-4">{{state.job.type}}</div>
                        <h1 class="text-3xl font-bold mb-4">{{state.job.title}}</h1>
                        <div class="text-gray-600 mb-4 flex align-middle justify-center md:justify-start">
                            <i class="pi pi-map-marker text-lg text-teal-700 mr-2"></i>
                            <p class="text-teal-700">{{state.job.location}}</p>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-blue-700 text-lg font-bold mb-6">
                            Job Description
                        </h3>

                        <p class="mb-4">
                            {{state.job.description}}
                        </p>

                        <h3 class="text-blue-700 text-lg font-bold mb-2">Salary</h3>

                        <p class="mb-4">{{state.job.salary}}</p>
                    </div>
                </main>

                <!-- Sidebar -->
                <aside>
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>

                        <h2 class="text-2xl">{{state.job.company.name}}</h2>

                        <p class="my-2">
                            {{state.job.company.description}}
                        </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Contact Email:</h3>

                        <p class="my-2 bg-blue-100 p-2 font-bold">
                            {{state.job.company.contactEmail}}
                        </p>

                        <h3 class="text-xl">Contact Phone:</h3>

                        <p class="my-2 bg-blue-100 p-2 font-bold">{{state.job.company.contactPhone}}</p>
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <RouterLink :to="`/jobs/edit/${state.job.id}`"
                            class="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Edit
                            Job</RouterLink>
                        <button
                            @click="onDeleteHandler"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Job
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
    <div v-else="state.isLoading" class="text-center text-gray-600 py-6">
        <PulseLoader />
    </div>
</template>