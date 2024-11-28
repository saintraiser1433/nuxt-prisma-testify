<template>
    <div class="w-8/12 mx-auto translate-y-0 lg:translate-y-1/4">
        <UICard :body="{ padding: 'sm:px-4' }" :header="{ padding: 'sm:p-0 p-0', }">
            <template #header>
                <div class="bg-[url('@/assets/images/bgheaders.png')] w-full h-20 bg-cover flex items-center px-3">
                    <h2 class="text-2xl font-semibold text-white">FOLLOW UP INFORMATION</h2>
                </div>
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
                    <UInput type="number" v-model="formFollowup.contact_number" color="gray" />
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
        <!-- <UCard class="w-full" :ui="{
            base: 'overflow-hidden  ',
            ring: '',
            body: { padding: 'sm:p-0 p-0' },
            header: { padding: '' },
            footer: { padding: '' },

        }"> -->

        <!-- <div class="p-3">
                
            </div> -->
        <!-- </UCard> -->

    </div>
</template>


<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
definePageMeta({
    requiredRole: 'examinee',
    layout: 'user'
})
const { $datefns } = useNuxtApp();
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

const { $joi } = useNuxtApp()

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


const onSubmit = async (event: FormSubmitEvent<DepartmentModel>) => {
    // emits('dataDepartment', event.data)
    console.log('submitted');
}
</script>



<style scoped></style>
