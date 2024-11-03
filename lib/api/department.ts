const config = useRuntimeConfig();
export const createDepartment = async (department: DepartmentModel) => {
  return await $fetch(`${config.public.baseURL}/department`, {
    method: "POST",
    body: department,
  });
};

export const updateDepartment = async (department: DepartmentModel, id: number) => {
  return await $fetch(`${config.public.baseURL}/department/${id}`, {
    method: "PUT",
    body: department,
  });
};

export const deleteDepartment = async (id: number) => {
  return await $fetch(`${config.public.baseURL}/department/${id}`, {
    method: "DELETE",
  });
};