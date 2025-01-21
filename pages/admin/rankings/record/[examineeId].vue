<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});
useSeoMeta({
  title: "Testify Rankings Module",
  description: "Rankings",
  ogTitle: "Testify Rankings Module",
  ogDescription: "Rankings",
});
const { setToast } = useToasts();
const { params } = useRoute();
const { $api } = useNuxtApp();
const statuses = computed(() => status.value === "pending");
const repo = repository<null>($api);
const { data, status, error } = await useAsyncData(
  "ranks",
  async () => {
    const [course, summary] = await Promise.all([
      repo.getAllCourses(),
      repo.getSummaryResultById(params.examineeId.toString()),
    ]);
    return {
      course,
      summary,
    };
  },
  {
    server: false,
  }
);

if (error.value) {
  setToast("error", error.value.message || "Failed to fetch items");
}

const { summaryData, examineeName, courseData, summaryScores } = useExamineeSummary(
  data.value?.summary,
  data.value?.course
);




</script>

<template>

  <div class="grid grid-cols-12 gap-3">
    <div class="col-span-12 lg:col-span-4">
      <RankingRecordInformation :data="summaryData" :correct-answer="summaryScores.totalCorrect"
        :total-question="summaryScores.totalQuestions" />
    </div>
    <div class="col-span-12 lg:col-span-8">
      <RankingRecordCourse :examinee-name="examineeName" :is-loading="statuses" :data="courseData" />
    </div>
  </div>
</template>
