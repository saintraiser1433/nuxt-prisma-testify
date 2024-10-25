export const useDepartment = () => {
  const createDepartment = async (
    department: DepartmentModel
  ): Promise<ApiResponse> => {
    return await $fetch(`/api/department`, {
      method: "POST",
      body: department,
    });
  };

  const updateDepartment = async (
    department: DepartmentModel,
    id: number
  ): Promise<ApiResponse> => {
    return await $fetch(`/api/department/${id}`, {
      method: "PUT",
      body: department,
    });
  };

  const deleteDepartment = async (id: number): Promise<ApiResponse> => {
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
