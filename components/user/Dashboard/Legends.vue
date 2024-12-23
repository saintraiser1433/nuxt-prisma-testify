<template>
    <div class="flex items-center gap-2 px-3 mt-5 border-b pb-3">
        <div class="self-start">
            <p>Legends:</p>
        </div>
        <ul class="flex text-sm items-center gap-5 flex-row flex-wrap">
            <li variant="subtle" :color="map.color" v-for="map in legends" :key="map"></li>
            <li>
                <UBadge variant="subtle" color="carnation" size="lg">
                    POOR 50 Below %
                </UBadge>
            </li>
            <li>
                <UBadge variant="subtle" color="primary" size="lg">
                    GOOD 51-69 %
                </UBadge>
            </li>
            <li>
                <UBadge variant="subtle" color="cyan" size="lg">
                    VERY GOOD 70 - 89%
                </UBadge>
            </li>
            <li>
                <UBadge variant="subtle" color="emerald" size="lg">
                    EXCELLENT 90-100 %
                </UBadge>
            </li>
        </ul>
    </div>

</template>
<script lang="ts" setup>
interface LegendModel {
    label: string,
    value: string,
    color: string
}

const props = defineProps({
    legends: Object as PropType<LegendModel>
})

const { legends } = toRefs(props);



</script>
