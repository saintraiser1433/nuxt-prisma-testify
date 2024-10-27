export default defineEventHandler(async (event) => {
  const deansDepIds = await prisma.deans.findMany({
    select: {
      department_id: true,
    },
  });

  const depIdsWithDeans = deansDepIds.map((dean) => dean.department_id);

  const data = await prisma.department.findMany({
    select: {
      department_id: true,
      department_name: true,
    },
    where: {
      department_id: {
        notIn: depIdsWithDeans,
      },
    },
    orderBy: {
      department_id: "asc",
    },
  });
  return data;
});
