import type { ApiResponse, Method } from "~/types";
const { token } = useAuthentication();



const config = useRuntimeConfig();
export const createCourse = async (Course: CourseModel) => {
  return await $fetch<ApiResponse<CourseModel>>(`${config.public.baseURL}/course`, {
    method: "POST",
    body: Course,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
};

export const updateCourse = async (Course: CourseModel, id: number | undefined) => {
  return await $fetch<ApiResponse<CourseModel>>(`${config.public.baseURL}/course/${id}`, {
    method: "PUT",
    body: Course,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
};

export const deleteCourse = async (id: number) => {
  return await $fetch<ApiResponse<CourseModel>>(`${config.public.baseURL}/course/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
};




