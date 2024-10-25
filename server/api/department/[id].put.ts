export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
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
        department_id: Number(id),
      },
    });

    if (!department) {
      throw createError({
        statusCode: 404,
        statusMessage: "Department not found",
      });
    }

    const response = await tx.department.update({
      where: {
        department_id: Number(id),
      },
      data: value,
    });
    return {
      statusCode: 200,
      message: "Department updated successfully",
      data: response,
    };
  });
});
