<template>
    <aside :class="getToggleState ? 'lg:w-60' : '-translate-x-full lg:w-20 lg:translate-x-0'" class="flex flex-col justify-between bg-white dark:bg-darken h-full row-span-2 px-2 py-2 z-50 shadow-lg 
      overflow-hidden border-r w-60 fixed left-0 top-0 border-slate-100 dark:border-colorBorder rounded-lg
      transition-all ease-in-out">
        <div class="flex ml-2 items-center border-b border-slate-300 dark:border-colorBorder pb-2 text-center mb-2">
            <span class="sprite sprite-small-lg ml-2"></span>
            <span :class="getToggleState ? 'lg:block' : 'lg:hidden'" class="font-titleFont font-bold text-lg ml-2">
                Testify</span>
        </div>
        <ul class="flex flex-col grow ">
            <AppMenuList :menu-items="item"></AppMenuList>
        </ul>

    </aside>
</template>

<script setup>
import Home from '~icons/lucide/home'
import HugeiconsStudentCard from '~icons/hugeicons/student-card';
import FluentMdl2PartyLeader from '~icons/fluent-mdl2/party-leader';
import LucideBook from '~icons/lucide/book';
import SubwayBook from '~icons/subway/book';
import SolarPenLineDuotone from '~icons/solar/pen-line-duotone';
import MdiChartLine from '~icons/mdi/chart-line';
const store = useStore();
const { getToggleState } = storeToRefs(store)

const item = ref(
    [
        { label: 'Home', routerName: 'Home', icon: Home },
        { label: 'Examinee', routerName: 'Examinee', icon: HugeiconsStudentCard },
        { label: 'Deans', routerName: 'Deans', icon: FluentMdl2PartyLeader },
        { label: 'Department', routerName: 'Department', icon: LucideBook },
        { label: 'Course', routerName: 'Course', icon: SubwayBook },
        { label: 'Exam', routerName: 'Exam', icon: SolarPenLineDuotone },
        { label: 'Rankings', routerName: 'Rankings', icon: MdiChartLine },
    ]
)
</script>

<style scoped></style>