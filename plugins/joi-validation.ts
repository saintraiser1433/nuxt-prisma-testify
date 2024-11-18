import Joi from 'joi'
export default defineNuxtPlugin((event) => {
    return {
        provide: {
            joi:Joi,

        }
    }
})