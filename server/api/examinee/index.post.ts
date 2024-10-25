export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = examineeValidation.insert(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const user = await tx.examinee.findFirst({
      where: {
        AND: [
          { first_name: value.first_name },
          { last_name: value.last_name },
          { middle_name: value.middle_name },
        ],
      },
    });

    if (user) {
      throw createError({
        statusCode: 409,
        statusMessage: "Student already exist",
      });
    }

    const response = await tx.examinee.create({
      data: value,
    });
    return {
      statusCode: 201,
      message: "Student created successfully",
      data: response,
    };
  });
});
