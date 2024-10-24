import { type Course } from "~/types/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<Course>(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = courseValidation.insert(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const course = await tx.course.findFirst({
      where: {
        description: value.description,
      },
    });

    if (course) {
      throw createError({
        statusCode: 409,
        statusMessage: "Course already exist",
      });
    }

    const response = await tx.course.create({
      data: value,
    });
    return {
      statusCode: 201,
      message: "Course created successfully",
      data: response,
    };
  });
});
