export default defineEventHandler(async (event) => {
  const data = await prisma.examinee.findMany({
    select: {
      examinee_id: true,
      first_name: true,
      last_name: true,
      middle_name: true,
      username: true,
    },
    orderBy: {
      examinee_id: "asc",
    },
  });
  return data;
});
