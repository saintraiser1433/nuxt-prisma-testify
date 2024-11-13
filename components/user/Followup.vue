<template>
    <form @submit.prevent="">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <label class="text-sm" for="course">Gender:</label>
                <UIInput type="text" id="course" required />
            </div>
            <div class="col-span-12  md:col-span-6 lg:col-span-4">
                <label class="text-sm" for="score">Age:</label>
                <UIInput type="number" id="score" required />
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

    </form>
</template>
<script lang="ts" setup>

</script>



<style lang="postcss" scoped></style>
