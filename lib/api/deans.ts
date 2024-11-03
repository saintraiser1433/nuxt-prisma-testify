
const config = useRuntimeConfig();

export const createDeans = async (deans: DeansModel) => {
  return await $fetch<DeansModel>(`${config.public.baseURL}/deans`, {
    method: "POST",
    body: deans,
  });
};

export const updateDeans = async (deans: DeansModel, id: number) => {
  return await $fetch<DeansModel>(`${config.public.baseURL}/deans/${id}`, {
    method: "PUT",
    body: deans,
  });
};

export const deleteAssignCourse = async (deansId: number, courseId: number) => {
  return await $fetch<DeansModel>(`${config.public.baseURL}/deans/assign/${deansId}/${courseId}`, {
    method: "DELETE",
  });
};