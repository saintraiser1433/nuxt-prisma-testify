import { ChoicesModel } from "~/types/types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return prisma.$transaction(async (tx) => {
    const { question, question_id, choices } = body;
    const questBody = {
      question: question,
      question_id: question_id,
    };
    // validate question
    const { error: err, value } = questionValidation.update(questBody);
    if (err) {
      throw createError({
        statusCode: 400,
        statusMessage: err.details[0].message,
      });
    }

    //end
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
    //end

    //choices validate
    const { error: errorChoice, value: choicesValue } =
      choicesValidation.update(choices);

    // Check for validation errors
    if (errorChoice) {
      throw createError({
        statusCode: 400,
        statusMessage: errorChoice.details[0].message,
      });
    }

    const existingChoices = await tx.choices.findMany({
      where: {
        question_id: value.question_id,
      },
    });

    //end
    const newChoiceId = choices.map(
      (choice: ChoicesModel) => choice.choices_id
    );

    const choicesToDelete = existingChoices
      .filter(
        (existingChoice) => !newChoiceId.includes(existingChoice.choices_id)
      )
      .map((item) => item.choices_id);

    //deleted
    await tx.choices.deleteMany({
      where: {
        choices_id: {
          in: choicesToDelete,
        },
      },
    });

    const createManyChoices = choicesValue.map((choice) => ({
      description: choice.description,
      status: choice.status,
      choices_id: choice.choices_id,
    }));

    for (const ch of createManyChoices) {
      await prisma.choices.upsert({
        where: {
          choices_id: ch.choices_id || -1,
        },
        update: {
          description: ch.description,
          status: ch.status,
        },
        create: {
          description: ch.description,
          status: ch.status,
          question_id: question_id,
        },
      });
    }

    return {
      statusCode: 201,
      message: "Updated successfully",
    };
  });

  //end
});
