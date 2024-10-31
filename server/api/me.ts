import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);

  if (!session) {
    return { status: "unauthenticated" };
  }
  // const account = await prisma.account.findFirst({
  //   where: {
  //     user: {
  //       email: body.email,
  //     },
  //   },
  // });

  return { session };
});
