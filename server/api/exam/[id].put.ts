export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = examValidation.update(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const department = await tx.exam.findFirst({
      where: {
        exam_id: Number(id),
      },
    });

    if (!department) {
      throw createError({
        statusCode: 404,
        statusMessage: "Exam not found",
      });
    }

    const response = await tx.exam.update({
      where: {
        exam_id: Number(id),
      },
      data: value,
    });
    return {
      statusCode: 200,
      message: "Exam updated successfully",
      data: response,
    };
  });
});
