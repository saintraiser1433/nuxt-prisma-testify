<template>
  <div class="flex justify-center items-center max-w-sm lg:max-w-3xl mx-auto min-h-screen">
    <div class="w-full rounded-lg shadow-lg bg-white dark:bg-cardColor">
      <!-- <form @submit.prevent="handleSignIn"> -->
      <div class="grid grid-cols-2">
        <div class="col-span-2 lg:col-span-1 py-6 px-8">
          <div class="py-5">
            <h1 class="text-2xl font-semibold uppercase text-gray-600 dark:text-gray-300">
              Welcome Back
            </h1>
            <span class="text-xs">Please enter login details below</span>
          </div>
          
          <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
            <UFormGroup label="Username" name="username">
              <UInput v-model="state.username" color="gray" :ui="{
                rounded: 'rounded-md'
              }" />
            </UFormGroup>
            <UFormGroup label="Password" name="password">
              <UInput type="password" v-model="state.password" color="gray" :ui="{
                rounded: 'rounded-md'
              }" />
            </UFormGroup>
            <UButton type="submit" block color="gray" size="md" :ui="{
              color: {
                gray: {
                  solid: 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 text-white hover:dark:bg-primary-600'
                }
              }
            }">Submit</UButton>
          </UForm>
        </div>
        <div
          class="lg:col-span-1 bg-[url('~/assets/images/background.jpg')] w-full h-auto bg-repeat bg-[center_bottom_-6rem]">
        </div>
      </div>
      <!-- </form> -->
      <!-- <button type="button" @click="handleGitHub">Sign In as github</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
definePageMeta({
  layout: "empty",
  requiredRole: 'guest',
});

const { setToast } = useToasts();
const { $joi } = useNuxtApp()
const { signIn, info } = useAuthentication();




const state = ref<User>({
  username: '',
  password: '',
});

const schema = $joi.object({
  username: $joi.string().min(3).required().messages({
    "string.min": 'Minimumn of 3 letters to be input',
    "any.required": `Username is Required`,
  }),
  password: $joi.string().min(3).required().messages({
    "string.min": 'Minimumn of 5 letters to be input',
    "any.required": `Password is Required`,
  }),
})

const onSubmit = async (event: FormSubmitEvent<User>) => {
  try {
    await signIn({
      username: event.data.username,
      password: event.data.password,
    });
    const parse = JSON.parse(info.value);
    if (parse.role) {
      const userRole = parse.role
      if (userRole === "admin") {
        return navigateTo({ name: "admin-home" });
      } else if (userRole === "examinee") {
        return navigateTo({ name: "user" });
      } else if (userRole === "deans") {
        return navigateTo({ name: "deans-home" });
      }
    }

    return navigateTo({ name: "auth" });
  } catch (err: any) {
    setToast("error", err.data?.error || "An error occurred");
  }
}


</script>

<style scoped></style>