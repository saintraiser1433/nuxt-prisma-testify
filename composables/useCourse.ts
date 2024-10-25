export const useCourse = () => {
  const createCourse = async (Course: CourseModel): Promise<ApiResponse> => {
    return await $fetch(`/api/course`, {
      method: "POST",
      body: Course,
    });
  };

  const updateCourse = async (
    Course: CourseModel,
    id: number
  ): Promise<ApiResponse> => {
    return await $fetch(`/api/course/${id}`, {
      method: "PUT",
      body: Course,
    });
  };

  const deleteCourse = async (id: number): Promise<ApiResponse> => {
    return await $fetch(`/api/course/${id}`, {
      method: "DELETE",
    });
  };

  return {
    createCourse,
    updateCourse,
    deleteCourse,
  };
};
