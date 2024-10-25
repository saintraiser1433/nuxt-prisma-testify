export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return prisma.$transaction(async (tx) => {
    const question = await tx.question.findFirst({
      where: {
        question_id: Number(id),
      },
    });

    if (!question) {
      throw createError({
        statusCode: 404,
        statusMessage: "Question not found",
      });
    }

    await prisma.question.delete({
      where: {
        question_id: Number(id),
      },
    });
    return {
      statusCode: 200,
      message: "Question deleted successfully",
    };
  });
});
