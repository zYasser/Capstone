export default async function getMe() {
  try {
    const result = await fetch("http://localhost:8000/api/user/me", {
      credentials: "include",
      method: "get",
    });
    return result.ok ? await result.json() : null;
  } catch (error) {
    return null;
  }
}
