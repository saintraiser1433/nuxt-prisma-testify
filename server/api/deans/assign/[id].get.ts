export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const data = await prisma.assignDeans.findMany({
    select: {
      deans: {
        select: {
          deans_id: true,
        },
      },
      course: {
        select: {
          course_id: true,
          description: true,
        },
      },
    },
    where: {
      deans_id: Number(id),
    },
  });
  return data;
});
