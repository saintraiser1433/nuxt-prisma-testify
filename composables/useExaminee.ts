import type { Examinee } from "~/types/types";

export const useExaminee = () => {
  const createExaminee = async (examinee: Examinee) => {
    return await $fetch(`/api/examinee`, {
      method: "POST",
      body: examinee,
    });
  };

  const updateExaminee = async (examinee: Examinee, id: Number) => {
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
