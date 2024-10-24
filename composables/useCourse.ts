import type { Course } from "~/types/types";

export const useCourse = () => {
  const createCourse = async (Course: Course) => {
    return await $fetch(`/api/course`, {
      method: "POST",
      body: Course,
    });
  };

  const updateCourse = async (Course: Course, id: Number) => {
    return await $fetch(`/api/course/${id}`, {
      method: "PUT",
      body: Course,
    });
  };

  const deleteCourse = async (id: number) => {
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
