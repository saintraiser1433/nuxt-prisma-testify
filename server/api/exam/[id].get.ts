export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const response = await prisma.exam.findFirstOrThrow({
    where: {
      exam_id: Number(id),
    },
  });

  return response;
});
