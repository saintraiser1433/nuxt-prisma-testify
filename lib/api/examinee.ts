
const config = useRuntimeConfig();

export const createExaminee = async (examinee: ExamineeModel) => {
    return await $fetch<ExamineeModel>(`${config.public.baseURL}/examinee`, {
        method: "POST",
        body: examinee,
    });
};

export const updateExaminee = async (examinee: ExamineeModel, id: number) => {
    return await $fetch<ExamineeModel>(`${config.public.baseURL}/examinee/${id}`, {
        method: "PUT",
        body: examinee,
    });
};

export const deleteExaminee = async (id: number) => {
    return await $fetch<ExamineeModel>(`${config.public.baseURL}/examinee/${id}`, {
        method: "DELETE",
    });
};