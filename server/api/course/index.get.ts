export default defineEventHandler(async (event) => {
  const data = await prisma.course.findMany();
  return data;
});
