import { customAlphabet } from "nanoid";
export default defineNuxtPlugin(() => {
  const nanoid = customAlphabet("1234567890abcdef", 10);
  return {
    provide: { id: nanoid() },
  };
});
