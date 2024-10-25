export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return prisma.$transaction(async (tx) => {
    const exam = await tx.exam.findFirst({
      where: {
        exam_id: Number(id),
      },
    });

    if (!exam) {
      throw createError({
        statusCode: 404,
        statusMessage: "Exam not found",
      });
    }

    await prisma.exam.delete({
      where: {
        exam_id: Number(id),
      },
    });
    return {
      statusCode: 200,
      message: "Exam deleted successfully",
    };
  });
});
