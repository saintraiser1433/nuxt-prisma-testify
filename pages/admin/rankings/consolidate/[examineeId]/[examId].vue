<script lang="ts" setup>
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "Testify User Exam",
  description: "This is an examination page",
  ogTitle: "Testify User Exam",
  ogDescription: "This is an examination page",
});
const { info } = useAuthentication();
const { setToast } = useToasts();
const inf = JSON.parse(info.value);
const { params } = useRoute();

//top level
const { data: question, status, error } = await useAPI<ConsoQuestionAnswer[]>(
  `/answer/consolidate/${params.examineeId}/${params.examId}`
);
</script>

<template>
  <div>
    <UICard
      :body="{
        padding: 'sm:p-0 p-0',
        base: 'h-[73vh] lg:h-[76vh] w-full overflow-y-auto',
      }"
      :header="{ padding: 'sm:p-0 p-0' }"
      :footer="{
        base: 'flex justify-center items-center py-2 dark:bg-darken',
      }"
    >
      <template #header>
        <!-- <UserDashboardHeader :title="examTitle">
          <h1 class="text-white font-bold">
            SCORE: {{ answerCount }}/{{ totalQuestions }}
          </h1>
        </UserDashboardHeader> -->
      </template>
      <template #default>
        <RankingConsolidateAnswers :question-data="question ?? []" />
      </template>
    </UICard>
  </div>
</template>
