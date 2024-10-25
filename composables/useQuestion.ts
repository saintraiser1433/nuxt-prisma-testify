export const useQuestion = () => {
  const createQuestion = async (
    Question: QuestionModel
  ): Promise<ApiResponse> => {
    return await $fetch(`/api/question`, {
      method: "POST",
      body: Question,
    });
  };

  const updateQuestion = async (
    Question: QuestionModel,
    id: number
  ): Promise<ApiResponse> => {
    return await $fetch(`/api/question/${id}`, {
      method: "PUT",
      body: Question,
    });
  };

  const deleteQuestion = async (id: number): Promise<ApiResponse> => {
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
