export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = deansValidation.insert(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const deans = await tx.deans.findFirst({
      where: {
        AND: [{ first_name: value.first_name }, { last_name: value.last_name }],
      },
    });

    if (deans) {
      throw createError({
        statusCode: 409,
        statusMessage: "This deans already existing",
      });
    }

    const response = await tx.deans.create({
      data: value,
    });
    return {
      statusCode: 201,
      message: "Dean created successfully",
      data: response,
    };
  });
});
