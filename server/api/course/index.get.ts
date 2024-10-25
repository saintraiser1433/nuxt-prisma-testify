export default defineEventHandler(async (event) => {
  const data = await prisma.course.findMany({
    select: {
      course_id: true,
      description: true,
      score: true,
    },
    orderBy: {
      course_id: "asc",
    },
  });
  return data;
});
