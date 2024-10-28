export default defineEventHandler(async (event) => {
  const response = await prisma.course.findMany({
    where: {
      AND: [
        {
          AssignDeans: {
            none: {},
          },
        },
      ],
    },
  });

  return response;
});
