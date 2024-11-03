const config = useRuntimeConfig();
export const createCourse = async (Course: CourseModel) => {
  return await $fetch<CourseModel>(`${config.public.baseURL}/course`, {
    method: "POST",
    body: Course,
  });
};

export const updateCourse = async (Course: CourseModel, id: number) => {
  return await $fetch<CourseModel>(`${config.public.baseURL}/course/${id}`, {
    method: "PUT",
    body: Course,
  });
};

export const deleteCourse = async (id: number) => {
  return await $fetch<CourseModel>(`${config.public.baseURL}/course/${id}`, {
    method: "DELETE",
  });
};