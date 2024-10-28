export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await prisma.assignDeans.create({
    data: body,
  });

  return {
    statusCode: 201,
    message: "Successfully assigned course",
    data: response,
  };
});
