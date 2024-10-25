export const useExaminee = () => {
  const createExaminee = async (
    examinee: ExamineeModel
  ): Promise<ApiResponse> => {
    return await $fetch(`/api/examinee`, {
      method: "POST",
      body: examinee,
    });
  };

  const updateExaminee = async (
    examinee: ExamineeModel,
    id: number
  ): Promise<ApiResponse> => {
    return await $fetch(`/api/examinee/${id}`, {
      method: "PUT",
      body: examinee,
    });
  };

  const deleteExaminee = async (id: number): Promise<ApiResponse> => {
    return await $fetch(`/api/examinee/${id}`, {
      method: "DELETE",
    });
  };

  return {
    createExaminee,
    updateExaminee,
    deleteExaminee,
  };
};
