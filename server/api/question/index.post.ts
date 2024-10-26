import { ChoicesModel, QuestionModel } from "~/types/types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { question, exam_id, choices } = body;

    const questBody: QuestionModel = {
      question: question,
      exam_id: exam_id,
    };

    const { error: err, value } = questionValidation.insert(questBody);
    if (err) {
      throw createError({
        statusCode: 400,
        statusMessage: err.details[0].message,
      });
    }

    const checkExamIsExist = await tx.exam.findFirst({
      where: {
        exam_id: Number(value.exam_id),
      },
    });

    if (!checkExamIsExist) {
      throw createError({
        statusCode: 404,
        statusMessage: "Exam not found",
      });
    }

    const response = await tx.question.create({
      data: value,
    });

    const choiceBody = choices.map((choice: ChoicesModel) => ({
      description: choice.description,
      question_id: response.question_id,
      status: choice.status,
    }));

    const { error: errorChoice, value: choicesValue } =
      choicesValidation.insert(choiceBody);

    if (errorChoice) {
      throw createError({
        statusCode: 400,
        statusMessage: errorChoice.details[0].message,
      });
    }

    await tx.choices.createMany({
      data: choicesValue,
    });

    return {
      statusCode: 201,
      message: "Created successfully",
    };
  });
});
