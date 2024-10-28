export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = deansValidation.update(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const deans = await tx.deans.findFirst({
      where: {
        deans_id: Number(id),
      },
    });

    if (!deans) {
      throw createError({
        statusCode: 400,
        statusMessage: "Deans not found",
      });
    }

    const response = await tx.deans.update({
      where: {
        deans_id: Number(id),
      },
      data: value,
    });
    return {
      statusCode: 201,
      message: "Deans updated successfully",
      data: response,
    };
  });
});
