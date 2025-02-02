<script setup>
import { computed, defineProps, ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    job: {
        title: String,
        description: String,
        salary: String,
        location: String,
        id: String
    }
});

const showMoreDes = ref(false);

const truncateDescriptionText = computed(() => {
    const des = props.job.description;
    if (!showMoreDes.value) {
        return des.substring(0, 90) + '...';
    }
    return des;
});

const triggerShowMoreDes = () => {
    showMoreDes.value = !showMoreDes.value;
}

</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div class="mb-6">
                <div class="text-gray-600 my-2">Full-Time</div>
                <h3 class="text-xl font-bold">{{ job.title }}</h3>
            </div>

            <div class="mb-5">
                <div>
                    {{ truncateDescriptionText }}
                </div>
                <button class="text-green-300" @click="triggerShowMoreDes">{{ showMoreDes ? 'Less' : 'More' }}</button>
            </div>

            <h3 class="text-green-500 mb-2">{{ job.salary }}</h3>

            <div class="border border-gray-100 mb-5"></div>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
                <div class="text-orange-700 mb-3">
                    <i class="pi pi-map-marker text-orange-700"></i>
                    {{ job.location }}
                </div>
                <RouterLink :to="'/job/' + job.id"
                    class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                    Read More
                </RouterLink>
            </div>
        </div>
    </div>
</template>
