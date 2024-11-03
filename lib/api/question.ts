const config = useRuntimeConfig();
export const createQuestion = async (Question: QuestionModel) => {
  return await $fetch<QuestionModel>(`${config.public.baseURL}/question`, {
    method: "POST",
    body: Question,
  });
};

export const updateQuestion = async (Question: QuestionModel, id: number) => {
  return await $fetch<QuestionModel>(`${config.public.baseURL}/question/${id}`, {
    method: "PUT",
    body: Question,
  });
};

export const deleteQuestion = async (id: number) => {
  return await $fetch<QuestionModel>(`${config.public.baseURL}/question/${id}`, {
    method: "DELETE",
  });
};