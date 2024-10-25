import { ChoicesModel, QuestionModel } from "~/types/types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { question, question_id, choices } = body;

    const questBody: QuestionModel = {
      question: question,
      question_id: question_id,
    };
    //validate request
    const { error: err, value } = questionValidation.update(questBody);
    if (err) {
      throw createError({
        statusCode: 400,
        statusMessage: err.details[0].message,
      });
    }

    //validate if question is existing
    const checkQuestionIsExist = await tx.question.findFirst({
      where: {
        question_id: Number(value.question_id),
      },
    });

    if (!checkQuestionIsExist) {
      throw createError({
        statusCode: 404,
        statusMessage: "Question not found",
      });
    }

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

    //then update
    const response = await tx.question.update({
      where: {
        question_id: value.question_id,
      },
      data: value,
    });

    await tx.choices.createMany({
      data: choicesValue,
    });

    return {
      statusCode: 201,
      message: "Updated successfully",
    };
  });
});
