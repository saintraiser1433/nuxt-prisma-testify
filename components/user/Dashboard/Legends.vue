<template>
    <div class="flex items-center gap-2 px-3 mt-5 border-b pb-3">
        <div class="self-start">
            <p>Legends:</p>
        </div>
        <ul class="flex text-sm items-center gap-5 flex-row flex-wrap">
            <li v-for="map in legends" :key="map.label">
                <UBadge variant="subtle" :color="map.color" size="lg">
                    {{ map.label }}
                </UBadge>
            </li>
        </ul>
    </div>

</template>
<script lang="ts" setup>

const legends: LegendModel[] = [
    {
        label: 'POOR 50 Below %',
        color: 'carnation'
    },
    {
        label: 'GOOD 51-69 %',
        color: 'primary'
    },
    {
        label: 'VERY GOOD 70 - 89%',
        color: 'cyan'
    },
    {
        label: 'EXCELLENT 90-100 %',
        color: 'emerald'
    },
]





</script>
