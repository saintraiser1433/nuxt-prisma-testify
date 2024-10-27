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

  const deleteDeans = async (id: number) => {
    return await $fetch(`/api/deans/${id}`, {
      method: "DELETE",
    });
  };

  return {
    createDeans,
    updateDeans,
    deleteDeans,
  };
};
