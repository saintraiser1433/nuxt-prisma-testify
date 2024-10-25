export const useExaminee = () => {
  const createExaminee = async (examinee: ExamineeModel) => {
    return await $fetch(`/api/examinee`, {
      method: "POST",
      body: examinee,
    });
  };

  const updateExaminee = async (examinee: ExamineeModel, id: number) => {
    return await $fetch(`/api/examinee/${id}`, {
      method: "PUT",
      body: examinee,
    });
  };

  const deleteExaminee = async (id: number) => {
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
