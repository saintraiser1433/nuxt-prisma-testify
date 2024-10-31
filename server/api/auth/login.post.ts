import bcrypt from 'bcrypt';
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });


    if (!user || !user.hashedPassword) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials",
        });
    }

    const validatePassword = await bcrypt.compare(
        password,
        user?.hashedPassword
    );

    if (!validatePassword) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials",
        });
    }
    return user;


})