export default defineEventHandler(async (event) => {
  const deansId = getRouterParam(event, "deansId");
  const courseId = getRouterParam(event, "courseId");
  const response = await prisma.assignDeans.delete({
    where: {
      deans_id_course_id: {
        deans_id: Number(deansId),
        course_id: Number(courseId),
      },
    },
  });

  return {
    statusCode: 200,
    message: "Deleted successfully",
    data: response,
  };
});
