export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return prisma.$transaction(async (tx) => {
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

    await prisma.department.delete({
      where: {
        department_id: Number(id),
      },
    });
    return {
      statusCode: 200,
      message: "Department deleted successfully",
    };
  });
});
