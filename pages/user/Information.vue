<template>
    <div class="w-8/12 mx-auto translate-y-0 lg:translate-y-1/4">
        <UICard :body="{ padding: 'sm:px-4' }" :header="{ padding: 'sm:p-0 p-0', }">
            <template #header>
                <UserDashboardHeader title="FOLLOW UP INFORMATION" icon="/images/data.png" />

            </template>
            <h2 class="text-sm border-b border-gray-300 dark:border-gray-700 pb-2 mb-4 font-semibold">Date Examination:
                {{ dateNow
                }} </h2>
            <UForm :schema="schema" :state="formFollowup" class="gap-2 grid grid-cols-2" @submit="onSubmit">
                <UFormGroup class="col-span-2 lg:col-span-1" label="Gender" name="gender" required>
                    <USelect v-model.number="formFollowup.gender" color="gray" :options="gender"
                        option-attribute="name" />
                </UFormGroup>
                <UFormGroup class="col-span-2 lg:col-span-1" label="Birth Date" name="birth_date" required>
                    <UInput type="date" v-model="formFollowup.birth_date" color="gray" />
                </UFormGroup>
                <UFormGroup class="col-span-2 lg:col-span-1" label="Contact Number" name="contact_number" required>
                    <UInput type="text" v-model="formFollowup.contact_number" color="gray" />
                </UFormGroup>
                <UFormGroup class="col-span-2 lg:col-span-1" label="Email" name="email" required>
                    <UInput type="email" v-model="formFollowup.email" color="gray" />
                </UFormGroup>
                <UFormGroup class="col-span-2 lg:col-span-1" label="School Graduated" name="school" required>
                    <UInput v-model="formFollowup.school" color="gray" />
                </UFormGroup>
                <UFormGroup class="col-span-2 lg:col-span-1" label="Address" name="address" required>
                    <UTextarea v-model="formFollowup.address" :rows="4" size="lg" color="gray" />

                </UFormGroup>

                <div class="col-span-2 border-t dark:border-gray-600 pt-2">
                    <UButton type="submit" color="gray" size="md" :ui="{
                        color: {
                            gray: {
                                solid: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 text-white hover:dark:bg-emerald-600'
                            }
                        }
                    }">Submit</UButton>
                </div>

            </UForm>

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



const { $api, $datefns, $joi } = useNuxtApp();


const { info } = useAuthentication();
const { setToast } = useToasts();
const followUp = repository<ApiResponse<Followup>>($api)
const inf = JSON.parse(info.value);
const dateNow = $datefns.format(new Date(), "MMMM d, yyyy");
const gender = [
    {
        name: 'Male',
        value: 'Male'
    },
    {
        name: 'Female',
        value: 'Female'
    },
]



const formFollowup = ref<FollowupModel>({
    gender: undefined,
    birth_date: undefined,
    contact_number: undefined,
    school: undefined,
    email: undefined,
    address: undefined,

});


const schema = $joi.object({
    gender: $joi.string().required().messages({
        "any.required": `Gender is Required`,
    }),
    birth_date: $joi.string().required().messages({
        "any.required": `Birth Date is Required`,
    }),
    contact_number: $joi.string().required().messages({
        "any.required": `Contact Number is Required`,
    }),
    school: $joi.string().required().messages({
        "any.required": `School is Required`,
    }),
    email: $joi.string().required().messages({
        "any.required": `Email is Required`,
    }),
    address: $joi.string().required().messages({
        "any.required": `Address is Required`,
    })


})


const onSubmit = async (event: FormSubmitEvent<Followup>) => {
    try {
        if (inf) {
            const data = {
                ...event.data,
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
