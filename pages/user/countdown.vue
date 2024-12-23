<template>
    <div class="flex justify-center">
        <UICard :has-header="false" :defaults="{ base: 'max-w-xl p-5' }">
            <div class="flex justify-center items-center">
                <h1>Hello</h1>
            </div>
        </UICard>
    </div>

</template>
<script lang="ts" setup>
definePageMeta({
    requiredRole: 'examinee',
    layout: 'user'
})
</script>
