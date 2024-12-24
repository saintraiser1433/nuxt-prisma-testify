<template>
    <div class="w-8/12 mx-auto translate-y-0 lg:translate-y-1/4">
        <UICard :body="{ padding: 'sm:px-4' }" :header="{ padding: 'sm:p-0 p-0', }">
            <template #header>
                <UserDashboardHeader title="FOLLOW UP INFORMATION" icon="/images/data.png" />

            </template>
            <h2 class="text-sm border-b border-gray-300 dark:border-gray-700 pb-2 mb-4 font-semibold">Date Examination:
                {{ dateNow }} </h2>
            <UserFormInformation @data-information="onSubmit" />

        </UICard>


    </div>
</template>


<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
    requiredRole: 'examinee',
    layout: 'user',
    middleware: ['check-information']
})

useSeoMeta({
    title: 'Testify Information',
    description: 'This is information page',
    ogTitle: 'Testify Information',
    ogDescription: 'This is information page',
});



const { $api, $datefns } = useNuxtApp();
const { info } = useAuthentication();
const { setToast } = useToasts();
const followUp = repository<ApiResponse<Followup>>($api)
const inf = JSON.parse(info.value);
const dateNow = computed(() =>
    $datefns.format(new Date(), "MMMM d, yyyy")
);



const onSubmit = async (response:Followup) => {
    try {
        if (inf) {
            const data = {
                ...response,
                ...{ examineeId: inf.id }
            }
            await followUp.addFollowup(data);
            await navigateTo({ name: 'user-exam' });
        } else {
            setToast('error', 'Cant find id');
        }
    } catch (err: any) {
        setToast('error', err.value?.data.message || 'An error occurred');
    }
}


</script>



<style scoped></style>
