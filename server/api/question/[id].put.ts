export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = examineeValidation.update(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const examinee = await tx.examinee.findFirst({
      where: {
        examinee_id: Number(id),
      },
    });

    if (!examinee) {
      throw createError({
        statusCode: 404,
        statusMessage: "Examinee not found",
      });
    }

    const response = await tx.examinee.update({
      where: {
        examinee_id: Number(id),
      },
      data: value,
    });
    return {
      statusCode: 200,
      message: "Examinee updated successfully",
      data: response,
    };
  });
});
