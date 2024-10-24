import { type Course } from "~/types/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody<Course>(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = courseValidation.update(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const response = await tx.course.update({
      where: {
        course_id: Number(id),
      },
      data: value,
    });
    return {
      statusCode: 201,
      message: "Course updated successfully",
      data: response,
    };
  });
});
