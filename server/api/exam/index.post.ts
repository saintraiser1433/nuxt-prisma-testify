export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = examValidation.update(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const exam = await tx.exam.findFirst({
      where: {
        exam_title: value.exam_title,
      },
    });

    if (exam) {
      throw createError({
        statusCode: 409,
        statusMessage: "Exam Title already exist",
      });
    }

    const response = await tx.exam.create({
      data: value,
    });
    return {
      statusCode: 200,
      message: "Exam created successfully",
      data: response,
    };
  });
});
