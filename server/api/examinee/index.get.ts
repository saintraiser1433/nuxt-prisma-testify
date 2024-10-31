import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if(!session) {
    throw createError({
      status: 500,
      statusMessage: 'Not authorized'
    })
  }

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
