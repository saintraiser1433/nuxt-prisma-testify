import { type Examinee } from "~/types/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody<Examinee>(event);
  return prisma.$transaction(async (tx) => {
    const { error, value } = examineeValidation.update(body);

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message,
      });
    }

    const response = await tx.examinee.update({
      where: {
        examinee_id: Number(id),
      },
      data: value,
    });
    return {
      statusCode: 201,
      message: "Student updated successfully",
      data: response,
    };
  });
});
