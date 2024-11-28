import { customAlphabet } from "nanoid";
export default defineNuxtPlugin(() => {
  const nanoid = customAlphabet("1234567890abcdef", 10);

  const username = () => {
    return nanoid();
  }
  const password = () => {
    return nanoid();
  }

  return {
    provide: { username: username, password: password },
  };
});
