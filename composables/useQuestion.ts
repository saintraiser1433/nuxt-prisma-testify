import type { QuestionModel } from "#imports";

export const useQuestion = () => {
  const createQuestion = async (Question: QuestionModel) => {
    return await $fetch(`/api/question`, {
      method: "POST",
      body: Question,
    });
  };

  const updateQuestion = async (Question: QuestionModel, id: number) => {
    return await $fetch(`/api/question/${id}`, {
      method: "PUT",
      body: Question,
    });
  };

  const deleteQuestion = async (id: number) => {
    return await $fetch(`/api/question/${id}`, {
      method: "DELETE",
    });
  };

  return {
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
};
