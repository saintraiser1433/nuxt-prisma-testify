export default defineEventHandler(async (event) => {
  const data = await prisma.deans.findMany({
    select: {
      deans_id: true,
      first_name: true,
      last_name: true,
      middle_name: true,
      username: true,
      status: true,
      department: {
        select: {
          department_id: true,
          department_name: true,
        },
      },
    },
    orderBy: [
      {
        deans_id: "asc",
      },
      {
        status: "desc",
      },
    ],
  });
  return data;
});
