<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 lg:col-span-4">
            <UICard>
                <template #header>
                    <div class="flex justify-between items-center p-0">
                        <h1 class="text-3xl lg:text-2xl font-semibold">Top 10 Highest Scores</h1>
                        <svg-icon name="seticons/target" title="targeticon" width="64" height="64" />
                    </div>
                </template>
                <template #default>
                    <div class="grid grid-cols-12 gap-3 p-2 text-center">
                        <div class="col-span-3">Rank</div>
                        <div class="col-span-6">Taker Name</div>
                        <div class="col-span-3">Score</div>
                    </div>
                    <div class="grid grid-cols-12 gap-3 p-2 text-center">
                        <div class="col-span-3 flex justify-center items-center gap-2"><svg-icon name="seticons/firstmedal" width="24" height="24" /> 1</div>
                        <div class="col-span-6">John Rey Decosta</div>
                        <div class="col-span-3">10/20</div>
                    </div>
                </template>

            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-8">
            <UICard>


            </UICard>
        </div>

    </div>
</template>

<script setup>
definePageMeta({
    requiredRole: 'admin',
    // middleware: ['checkRole'],

})
useHead({
    title: 'Testify Rankings Module',
    meta: [
        { name: "description", content: 'CRUD for Rankings' },
        { property: "og:title", content: 'Testify Rankings Module' },
        { property: "og:description", content: 'CRUD for Rankings' },
    ],
});
</script>

<style scoped></style>