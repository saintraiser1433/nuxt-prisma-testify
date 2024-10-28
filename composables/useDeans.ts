import type { DeansModel } from "#imports";

export const useDeans = () => {
  const createDeans = async (deans: DeansModel) => {
    return await $fetch(`/api/deans`, {
      method: "POST",
      body: deans,
    });
  };

  const updateDeans = async (deans: DeansModel, id: number) => {
    return await $fetch(`/api/deans/${id}`, {
      method: "PUT",
      body: deans,
    });
  };

  const deleteAssignCourse = async (deansId: number, courseId: number) => {
    return await $fetch(`/api/deans/assign/${deansId}/${courseId}`, {
      method: "DELETE",
    });
  };

  return {
    createDeans,
    updateDeans,
    deleteAssignCourse,
  };
};
