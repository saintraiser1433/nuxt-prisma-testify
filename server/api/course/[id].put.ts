export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = courseValidation.update(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const course = await tx.course.findFirst({
      where: {
        course_id: Number(id),
      },
    });

    if (!course) {
      throw createError({
        statusCode: 400,
        statusMessage: "Course not found",
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
