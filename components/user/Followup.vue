<template>

    <UForm :schema="schema" :state="formFollowup" class="space-y-4 grid grid-cols-2" @submit="onSubmit">

        <UFormGroup label="Gender" name="gender" required>
            <USelect v-model.number="formFollowup.course_id" :options="courseList" option-attribute="name" />
        </UFormGroup>
        <UFormGroup label="Birth Date" name="birth_date" required>
            <UInput type="date" v-model="state.last_name" />
        </UFormGroup>
        <UFormGroup label="Contact Number" name="contact_number" required>
            <UInput type="number" v-model="state.last_name" />
        </UFormGroup>
        <UFormGroup label="School Graduated" name="school" required>
            <UInput type="number" v-model="state.last_name" />
        </UFormGroup>
        <UFormGroup label="Address" name="address" required>
            <UInput type="number" v-model="state.last_name" />
        </UFormGroup>
        <UFormGroup label="Address" name="address" required>
            <UTextarea v-model="choice.description" :rows="4" size="lg" />
        </UFormGroup>
        <UButton type="submit">Submit </UButton>
    </UForm>
    <!-- <form @submit.prevent="">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <label class="text-sm" for="course">Gender:</label>
                <UIInput type="text" id="course" required />
            </div>
            <div class="col-span-12  md:col-span-6 lg:col-span-4">
                <label class="text-sm" for="score">Birth Date:</label>
                <UIInput type="date" id="score" required />
            </div>
            <div class="col-span-12  md:col-span-6 lg:col-span-4">
                <label class="text-sm" for="score">Contact Number:</label>
                <UIInput type="number" id="score" required />
            </div>
            <div class="col-span-12  md:col-span-6 lg:col-span-4">
                <label class="text-sm" for="score">Contact Number:</label>
                <UIInput type="number" id="score" required />
            </div>
            <div class="col-span-12  md:col-span-6 lg:col-span-4">
                <label class="text-sm" for="score">Address:</label>
                <UIInput type="number" id="score" required />
            </div>
            <div class="col-span-12  md:col-span-6 lg:col-span-4">
                <label class="text-sm" for="score">School Graduated:</label>
                <UIInput type="number" id="score" required />
            </div>
            <div class="flex justify-end col-span-12">
                <UIButton type="submit" class="bg-success mb-2" size="lg:block">Submit</UIButton>
            </div>
        </div>

    </form> -->
</template>
<script lang="ts" setup>
</script>



<style lang="postcss" scoped></style>
