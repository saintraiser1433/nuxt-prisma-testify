import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);
  const hashpassword = await bcrypt.hash(password, 10);
  if (!email || !name || !password) {
    throw createError({
      statusCode: 500,
      statusMessage: "Missing Info",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashpassword,
      },
    });

    return user;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something Went Wrong",
    });
  }
});
