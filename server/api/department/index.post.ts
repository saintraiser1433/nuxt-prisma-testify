export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = departmentValidation.validate(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const department = await tx.department.findFirst({
      where: {
        department_name: value.department_name,
      },
    });

    if (department) {
      throw createError({
        statusCode: 409,
        statusMessage: "Department already exist",
      });
    }

    const response = await tx.department.create({
      data: value,
    });
    return {
      statusCode: 201,
      message: "Department created successfully",
      data: response,
    };
  });
});
