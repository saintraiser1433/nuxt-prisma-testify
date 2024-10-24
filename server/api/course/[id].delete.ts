export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return prisma.$transaction(async (tx) => {
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

    const response = await prisma.course.delete({
      where: {
        course_id: Number(id),
      },
    });
    return {
      statusCode: 201,
      message: "Course deleted successfully",
      data: response,
    };
  });
});
