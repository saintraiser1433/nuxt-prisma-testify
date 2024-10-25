export default defineEventHandler(async (event) => {
  const data = await prisma.department.findMany({
    select: {
      department_id: true,
      department_name: true,
      status: true,
    },
    orderBy: {
      department_id: "asc",
    },
  });
  return data;
});
