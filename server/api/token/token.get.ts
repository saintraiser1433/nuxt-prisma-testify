import { getToken } from "#auth";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });
  return token || "No token presented";
});
