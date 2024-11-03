
const config = useRuntimeConfig();

export const createExam = async (Exam: ExamModel) => {
  return await $fetch(`${config.public.baseURL}/exam`, {
    method: "POST",
    body: Exam,
  });
};

export const updateExam = async (Exam: ExamModel, id: number) => {
  return await $fetch(`${config.public.baseURL}/exam/${id}`, {
    method: "PUT",
    body: Exam,
  });
};

export const deleteExam = async (id: number) => {
  return await $fetch(`${config.public.baseURL}/exam/${id}`, {
    method: "DELETE",
  });
};

export const checkExistingExam = async (id: number) => {
  return await $fetch(`${config.public.baseURL}/exam/${id}`);
};