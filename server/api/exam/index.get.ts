export default defineEventHandler(async (event) => {
  const data = await prisma.exam.findMany({
    select: {
      exam_id: true,
      description: true,
      exam_title: true,
      question_limit: true,
      status: true,
      time_limit: true,
    },
    orderBy: {
      exam_id: "asc",
    },
  });
  return data;
});
