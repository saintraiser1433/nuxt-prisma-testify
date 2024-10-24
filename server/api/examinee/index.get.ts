export default defineEventHandler(async (event) => {
  const data = await prisma.examinee.findMany();
  return data;
});
