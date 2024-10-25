export const useDepartment = () => {
  const createDepartment = async (department: DepartmentModel) => {
    return await $fetch(`/api/department`, {
      method: "POST",
      body: department,
    });
  };

  const updateDepartment = async (department: DepartmentModel, id: number) => {
    return await $fetch(`/api/department/${id}`, {
      method: "PUT",
      body: department,
    });
  };

  const deleteDepartment = async (id: number) => {
    return await $fetch(`/api/department/${id}`, {
      method: "DELETE",
    });
  };

  return {
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
};
