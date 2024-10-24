export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return prisma.$transaction(async (tx) => {
    const examinee = await tx.examinee.findFirst({
      where: {
        examinee_id: Number(id),
      },
    });

    if (!examinee) {
      throw createError({
        statusCode: 400,
        statusMessage: "Student not found",
      });
    }

    const response = await prisma.examinee.delete({
      where: {
        examinee_id: parseInt(id as string),
      },
    });
    return {
      statusCode: 201,
      message: "Student updated successfully",
      data: response,
    };
  });
});
