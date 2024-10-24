export const useExam = () => {
  const createExam = async (Exam: ExamModel) => {
    return await $fetch(`/api/exam`, {
      method: "POST",
      body: Exam,
    });
  };

  const updateExam = async (Exam: ExamModel, id: number) => {
    return await $fetch(`/api/exam/${id}`, {
      method: "PUT",
      body: Exam,
    });
  };

  const deleteExam = async (id: number) => {
    return await $fetch(`/api/exam/${id}`, {
      method: "DELETE",
    });
  };

  return {
    createExam,
    updateExam,
    deleteExam,
  };
};
