export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const checkIfExist = await prisma.exam.findFirst({
    where: {
      exam_id: Number(id),
    },
  });

  if (!checkIfExist) {
    throw createError({
      statusCode: 404,
      statusMessage: "Exam not found",
    });
  }

  const data = await prisma.question.findMany({
    select: {
      question_id: true,
      question: true,
      Choices: {
        select: {
          choices_id: true,
          description: true,
          status: true,
        },
      },
    },
    where: {
      exam_id: Number(id),
    },
    orderBy: {
      question_id: "asc",
    },
  });
  return data;
});
